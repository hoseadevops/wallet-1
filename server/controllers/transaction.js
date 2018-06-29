const Transaction = require('../models').Transaction;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);


function createTransaction(tx){
	return Transaction.create({
		transactionId: tx.id,
		transactionData: tx,
		transactionProcessed: false,
		moved: false,
	})
	.then((res) =>{
		return new Promise((resolve, reject) =>{
			//res.credit = 1;
			resolve(1);
		})
	})
	.catch(error =>{
		console.log("TransactionId already Exists");
		return new Promise((resolve, reject) =>{
			// let res;
			// res.credit = 0;
			resolve(0);
		})
	});
}

function updateProcessed(txId){
	return Transaction.update(
		{ transactionProcessed: true, },
		{ where: { transactionId: txId} })
}

function updateMoved(txId){
	return Transaction.update(
		{ moved: true, },
		{ where: { transactionId: txId} })
}

function fetchOneUnmoved(){

	return Transaction.findOne({
	  where: {
	    moved: false,
	  }
	});
}


// function trial(){
// 	return Transaction.findAll({
// 		// where: {
// 		// 	transactionData.transferToAddress : 'TAK77VrK34zBfwqBC2j2nBSgmZmrPaciF9',
// 		// }
// 	})
// 	.then((res) => {
// 		res.forEach(tx =>{forEa
// 			tx.transferToAddress
// 		})
// 	})
// }



module.exports ={
	createTransaction,
	updateProcessed,
	updateMoved,
	fetchOneUnmoved,
	//trial,
}

