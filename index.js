const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const tron = require('./tron');



require('dotenv').config();


// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

server.listen(port,function(){
console.log("App Listening TRON Wallet on port ",process.env.PORT)});

module.exports = app;