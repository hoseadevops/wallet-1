const User = require('../models').User;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);


function userExists(userId) {
	console.log("inside userExists() userId = ",userId);
	return User.findOne({
		where: {
			userId: userId,
		} 
	})
	.then(user => {
  		if(user == null){
  			console.log("inside if of userExists");	
  			return new Promise((resolve, reject)=>{
  				resolve(-1);
  			});	
  					//-1 signifies that user does not exist
  		}
  		else{
  			console.log("inside else of userExists");	
  			return new Promise((resolve, reject)=>{
  				resolve({
  					userId: user.userId,
  					userAddress: user.userAddress,
  				});
  			});
  		}
	});
}

function userAddressExists(userAddress) {
  console.log("inside userAddressExists() userAddress = ",userAddress);
  return User.findOne({
    where: {
      userAddress: userAddress,
    } 
  })
  .then(user => {
      if(user == null){
        console.log("userAddress does not Exist"); 
        return new Promise((resolve, reject)=>{
          resolve(-1);            //-1 signifies that user does not exist
        });             
      }
      else{
        console.log("userAddress Exists"); 
        return new Promise((resolve, reject)=>{
          resolve({
            exist : 1,
            userId: user.userId,
          });
        });
      }
  });
}

function createUser(userId,account){
	console.log("inside createUser()");
	return User.create({
   	userId: userId,
    userAddress: account.address,
    password: account.password,
    privateKey: account.privateKey,
  });
}

function fetchUserPvtKey(userAddress){
  return User.findOne({
    where: {
      userAddress: userAddress,
    } 
  })
  .then(user =>{
    return new Promise((resolve, reject) =>{
      resolve(user.privateKey);
    })
  })
  .catch(error =>{
    console.log("fetchUserPvtKey:",error);
  })
}

module.exports = {
	userExists,
	createUser,
  userAddressExists,
  fetchUserPvtKey,
}