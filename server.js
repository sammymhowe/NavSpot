var app = require('./app');

// Server setup
var http = require('http');						// Basic HTTP functionality
var port = 8080;
var server = http.Server(app);
server.listen(port, function() {
  console.log("Server now running on port " + port);
});
