const axios = require("axios");
//const Utils = require("../services/utils");


exports.creditTronToUser = (transactionId, destinationAddress, amountToCredit) => {
   const apiToHit = process.env.COINDCX_URL_CREDIT_BALANCE;
   const dataToSend = {
       add_balance: {
           transaction_id: transactionId,
           address: destinationAddress,
           amount: amountToCredit,
           status: "completed"
       }
   };
   console.log("Trying to credit Tron to user. Object being sent in POST request to " + apiToHit + ":");
   console.log(dataToSend);
   return axios
     .post(apiToHit, dataToSend)
     .then(function(response) {
       console.log("Got response while trying to credit to user on CoinDcx Server:");
       console.log(response);
       return true;
     })
     .catch(function(error) {
       console.log("Error while trying to credit to user on CoinDcx Server:");
       console.log(error);
       throw new Error("Unable to credit to user in CoinDcx server.");
     });
};