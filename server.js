var app = require('./app');

// Server setup
var http = require('http');						// Basic HTTP functionality
var port = 8080;
var server = http.Server(app);
server.listen(port); // Start the server
