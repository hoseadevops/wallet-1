const tron = require('./../../tron.js');
const userController = require('../controllers/user.js');
const transferController = require('../controllers/transfer.js');
const stateController = require('../controllers/state.js');

const MINE = {
  account: process.env.ACCOUNT_ADDRESS,
  privateKey: process.env.PRIVATE_KEY,
}
const tokenName='TRX';



module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.get("/get-blocks",function(req,res){
    tron.getBlocks()
    .then(blocks => {
      res.json(blocks);
    })
    .catch(error => {
      res.status(500).send({
        message: "error occurred in getBlocks()",
      })
    });
  });

  app.get("/get-latest",function(req,res){
    tron.getLatestBlock()
    .then(latesblock => {
      res.json(latesblock);
    })
    .catch(error => {
      res.status(500).send({
        message: "error occurred in getLatestBlock()",
      })
    });
  });

  //trial of account generation
  app.get("/account", function(req,res){
    tron.createAccount()
    .then(latesblock => {
      res.json(latesblock);
    })
    .catch(error => {
      res.status(500).send({
        message: "error occurred in generateAccount()",
      })
    });
  });

  app.get("/get-address-detail/adrress/:address",function(req, res){
    tron.getAddressDetail(req.params.address)
    .then((details) => {
      res.json(details);
    })
    .catch(error => {
      res.status(500).send({
        message: "error occurred in getAddressDetail()",
      })
    })
  });


  app.get("/get-balance/addr/:addr", function(req, res) {
    const balance = tron.getBalanceByAddress(req.params.addr)
    .then(result=>{
      res.send({
        balance:result,
      });
    });
    
  });
/***************************************************************************/
/***************************************************************************/
//userExist is a function of controllers so...require it.
//using middleware

   app.put("/create-account/userid/:userid",
    function(req, res, next){
      console.log(`id fetched: ${req.params.userid}`);
      req.userId = req.params.userid;
      const exist = userController.userExists(req.params.userid)
      .then(function(exist){
        console.log("in PUT: exist =",exist); 
        if(exist === -1)   // -1 indicates that user didn't exist with that id so create User
         next();
       else{
          res.send(`User already exists with:\nUID: ${exist.userId}\nUser Address: ${exist.userAddress}`);
          console.log(exist.userId);
          console.log(exist.userAddress);
          //res.send(`UID: ${exist.userId}\nUser Address: ${exist.userAddress}`);
        }
      });      
    },

    function(req, res, next){
      req.userId = req.params.userid;
      tron.createAccount()
      .then(account => {
        //res.json(latesblock);
        console.log("account generated");
        req.account = account;
        next();
      })
      .catch(error => {
        res.status(500).send({
          message: "error occurred in generateAccount()",
        })
      });
    },

    function(req, res){
      console.log("Last function:");
      console.log("ID",req.userId);
      console.log("ACOUNT:",req.account);
      res.send(`UID: ${req.userId}\nUser Address: ${req.account.address}`);
      userController.createUser(req.userId,req.account);       
    }
  );

/************************************************************************/
/******************************************************************************/

app.get('/send/userid/:userid/da/:da/amt/:amt/trid/:trid',
  function(req,res,next){
    transferController.transferRequestIdExist(req.params.trid)
    .then((res) =>{
      if(res === -1)  { // -1 means amount must be sent so sendAmount()
        tron.sendAmount(tokenName, MINE.account, req.params.da, req.params.amt)
        .then((tx) =>{
          console.log(tx);
          if(tx.success)
            transferController.createTransfer(req.params.trid, tx.transaction.hash);
          else
            console.log("cannot send due to "+ tx.message);
        })
      }
      else
        console.log("Already existed transferHashId: ",res.transferHashId);
    });
  }
);

// app.get('/transfer',function (req, res) {
//   stateController.fetchFromState()
//   .then((json) => {
//     tron.processBlock(json.json.lastProcessedBlock + 1);
//   });
//  })


app.get("/get-nodes", function(req,res){
    tron.getNodes();
  });
app.post("/transfer", function(req, res) {
    const { userId, destinationAddress, amount } = req.params;

  })



  // app.get("/api/get-tx/:txId", function (req, res) {
  // 	tron.getTr..(req.params.x)
  // });

 //  	app.get(“/”, (req, res)
 //  	app.get(“/balance”, (req, res)
	// app.get(“/info”, (req, res)
	// app.get(“/rippled”, (req, res)
	// app.get(“/generate-address”, (req, res)
	
};