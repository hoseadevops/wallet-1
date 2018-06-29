const State = require('../models').State;
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);


function fetchFromState(){
	console.log("fetching...........");
	return State.findOne({
  		attributes: ['json'],
  		raw: true,
  		order: [
  		["createdAt", "DESC"]]
	})
	.then(function (json) {
		return new Promise((resolve, reject) =>{
			resolve(json);
		});
	})
}

function createState() {
	let oldBlockNumber;
	return fetchFromState()
  		.then((json) => {
  			oldBlockNumber = json.json.lastProcessedBlock;
    		console.log(oldBlockNumber);
    		return State.create({
				json:{ lastProcessedBlock: 1 + oldBlockNumber, },
			});
  		});	
}



module.exports = {
	fetchFromState,
	createState,
}