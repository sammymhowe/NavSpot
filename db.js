// Database setup (db.js)
var mongoose = require('mongoose');
var mongoDB = 'mongodb://NavSpotUser:Password123!@ds159180.mlab.com:59180/navspot-database';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
