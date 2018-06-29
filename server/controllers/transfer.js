const Transfer = require('../models').Transfer;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);

function createTransfer(transferRequestId,transactionHashId){
	console.log("inside transfer() hashId: ",transactionHashId);
	return Transfer.create({
	   	transferRequestId: transferRequestId,
	   	transactionHashId: transactionHashId,
  	})
	.then((record) => {
		console.log("Transfer record created");
	})
	.catch((error) => {
		console.log(error);
	});
}

function transferRequestIdExist(tfId)
{
	return Transfer.findOne({
		where: {
			transferRequestId: tfId,
		} 
	})
	.then(transfer => {
  		if(transfer == null){
  			console.log("transferRequestId does not exist");	
  			return new Promise((resolve, reject)=>{
  				resolve(-1);  					//-1 signifies that it does not exist
  			});	
  		}
  		else{
  			console.log("transferRequestId exists",transfer.transactionHashId);	
  			return new Promise((resolve, reject)=>{
  				resolve({
  					transferHashId: transfer.transactionHashId,
  				});
  			});
  		}
	});
}

module.exports = {
	createTransfer,
	transferRequestIdExist,
}
