const env = 'dev';

const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const path            = require('path');
const fs 			  = require('fs');
const mongoose        = require('mongoose');
const _overides       = require(path.join(__dirname,'lib','cupcake.js'))();

const routes          = require(path.join(__dirname,'routes'));
const config          = require(path.join(__dirname,'config'))[env];
const dbInit          = require(path.join(__dirname,'dbConnection'))(config);

const cors = require('cors');

// const devClientPath = 'http://localhost:8080';
// const prodClientPath = 'http://34.216.198.135';

// const devServerPath = 'http://localhost:8008';
// const prodServerPath = 'http://34.216.198.135:8082';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const port 			= config.port;                     // set our por
const router 			= express.Router();
// get an instance of the express Router

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

routes(router);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
// app.use('/vendorcontracts', express.static(path.join(__dirname, 'vendorcontracts')))
// app.use('/purchaseorders', express.static(path.join(__dirname, 'purchaseorders')))
app.use('/', router);

// IF ALL FAILS TURN TO THY LORD AND WISH FOR A MIRACLE, MEANWHILE OPEN THE APP BY DEFAULT \m/
// const __staticPath = path.join(__dirname,'app','dist'); // dev path; use ng build --output-path=[folderName]/
// console.log(path.join(__dirname));
// const __staticPath = path.join(__dirname, 'app');
// app.use('/' , express.static(__staticPath));
// app.use('/*', express.static(__staticPath));

app.listen(port);



console.log('\n===================================');
// console.log('Angular 2 Application hosted on:  ' + port);
console.log('       RESTful API Endpoints on:  ' + port + ' /api');
console.log('===================================\n');
