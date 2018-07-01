const {Client} = require("@tronscan/client");
const userController = require('./server/controllers/user.js');
const transactionController = require('./server/controllers/transaction.js');
const stateController = require('./server/controllers/state.js');

const coinDCX = require('./coindcx.js');


const { generateAccount } = require("@tronscan/client/src/utils/account");

require('dotenv').config();


const client = new Client()	;
setDefaultPK();

const TRX_TO_SUN = 1000000;

function waitForSeconds(seconds) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000)
	})
}


async function getBlocks() {
	console.log("inside getBlocks()");
	try {
		let blocks = await client.getBlocks({
		  sort: '-number',
		  limit: 10,
		});
		return blocks;
	} 
	catch(error) {
		console.error("Error in getBlocks(): ",error);
	}
}

async function getLatestBlock(){
	try{
		let latestBlocks = await client.getLatestBlock();
		return latestBlocks;
	}
	catch(error){
		console.error("Error in getLatetstBlock(): ",error);
	}
}

async function getNodes()
{
	try{
		let nodes = await client.getNodes();
		console.log(nodes);
	}
	catch(error){
		console.error(error);
	}
}

function createAccount()  
{
	console.log("inside generatingAccount()");
	let acnt = generateAccount();
	//console.log(acnt);
	return new Promise(function(resolve, reject){
		resolve(acnt);
	});
}


async function getAddressDetail(address) 
{
	try{
		let data = await client.getAddress(address);
		return data;
	}
	catch(error){
		console.error(error);
	}
}
function setDefaultPK(){
	client.setSigner(null);
	const signer = client.getSigner(process.env.PRIVATE_KEY);
	client.setSigner(signer);
}
function setClientPK(clientsPvtKey){
	client.setSigner(null);
	const signer = client.getSigner(clientsPvtKey);
	client.setSigner(signer);
}
function sendAmount(token, from, to, amount){
	console.log("sending.........");	
	const amountToSendInSun = Number(amount) * TRX_TO_SUN;
	let f = client.send(token, from, to, amount);
	return f().then(function (response) {
					console.log(response);
					return new Promise((resolve, reject) =>{
					 	resolve(response);
				 	});
				})
}


function initiate(){
	transactionController.fetchOneUnmoved()
	.then(unmoved =>{
		console.log("Unmoved Data====>",unmoved.dataValues);
		let dataValue = unmoved.dataValues;
		transferInternally(dataValue.transactionData.transferToAddress,dataValue.transactionData.amount,dataValue.transactionData.tokenName)
		.then((res) => {
			console.log(res);
			if(res.success){
				transactionController.updateMoved(dataValue.transactionId)
				.then(() => {
					setDefaultPK();
					initiate();
				});	
			}		
			setTimeout(() =>{
				console.log("Since it has success: false, we'll call initiate after 5 seconds");
				initiate()
			},10*1000);	
		})
		.catch(er => console.log(er));		
	})
	.catch((er) => {
		setDefaultPK();
		console.log("Now we'll call initiate after 15 seconds",er);
		setTimeout(() =>{
			initiate()
		},20*1000);
	});
}

function transferInternally(userAddress,amountInSun,token){
	console.log(amountInSun);
	return userController.fetchUserPvtKey(userAddress)
	.then((userPvtKey) =>{
		console.log("user's Private Key: ",userPvtKey);
		setClientPK(userPvtKey);
		// const amountInTrx = Number(amount) / TRX_TO_SUN;
		let f = client.send(token, userAddress, process.env.ACCOUNT_ADDRESS, amountInSun);
		return f();//.then(res => console.log(res));
	});

	
}

function processBlock(block){
	console.log("inside processBlock()");
	return client.getTransfers({
		block: block,
	})
	.then(function(response) {
		console.log("block info: ",response.transfers);
		const allTransactions = response.transfers;
		console.log("Length:-", allTransactions.length);
		
   		allTransactions.forEach(tx =>  {
       		const toAddressOfThisTx = tx.transferToAddress;
       		//console.log("to Address of TX",toAddressOfThisTx);
	       // check if this address exists in our users table
	       // if it exists: then
	       return userController.userAddressExists(toAddressOfThisTx)
	       .then((res) => {
	       	let userIdOfThisTx;
		       	if (res.exist === 1){
		           // Add transaction in table, with processed=false
		           userIdOfThisTx = res.userId;
		           return transactionController.createTransaction(tx)
		            .then((res) => {
		            	if(res === 1){
		            		console.log("res:- ",res);
		            		coinDCX.creditTronToUser(tx.id, tx.transferToAddress, tx.amount)
		            		.then(function() {
		            			return transactionController.updateProcessed(tx.id);
		            			// return new Promise((res,rej) =>{
		            			// 	res();
		            			// })
		            		})
		            	}
		            	else{
		            		console.log(res);
		            	}			           	
			           console.log(userIdOfThisTx);
		           })		           
		       }
	       })       		
		})//end of forEach loop		
		stateController.createState();
	});
}



 async function getBalanceByAddress(address){
	// return client.getAccountBalances(address)
	// .then((res) =>{
	// 	console.log(res);
	// })
	// .catch(error) =>{
	// 	console.log(error);
	// }
	try{
		let result = await client.getAccountBalances(address);
		console.log(result.balances[0].balance);
		return result.balances[0].balance;
	}
	catch(error){
		console.log(error);
	}

}
function processBlocksContinously() {
	let lastProcessedBlock;
	stateController.fetchFromState()
	.then(json =>{
		lastProcessedBlock = json.json.lastProcessedBlock;
		processBlock(1 + lastProcessedBlock)
		.then(function () {
			console.log("Processed block: ",lastProcessedBlock);
			processBlocksContinously();
		})
	})
	.catch(error => {
		setTimeout(function () {
			console.log("Inside Catch Block");
			processBlock(lastProcessedBlock)
			.then(function () {
				console.log("Processed block: ",lastProcessedBlock);
				processBlocksContinously();
			})
		}, 5000);
		return;
	})
	// processBlock(1 + lastProcessedBlock).then(function () {
	// 	console.log("Procedd block/ ");
	// 	processBlocksContinously();
	// })
}

//transactionController.trial();
//processBlocksContinously();
//processBlock(497663);

//initiate();

// RUN
module.exports = {

	getBlocks,
	getLatestBlock,
	createAccount,
	getNodes,
	getAddressDetail,
	getBalanceByAddress,
	sendAmount,
	transferInternally,
	
};