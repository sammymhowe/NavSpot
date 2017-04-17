var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoDB = 'mongodb://NavSpotUser:Password123!@ds159180.mlab.com:59180/navspot-database';
mongoose.connect(mongoDB);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// Define the model
var Event = mongoose.model('Event', {
  eventName : String,
	eventType : String,
	eventLocation : String,
	eventDetails : String
});

/* * * * * * * * * * * * API - GET events * * * * * * * * * * * */
app.get('/api/events', function(req, res) {
  // Get all events in the database
  Event.find(function(err, events) {
	  if (err) {
      res.send(err);
		}
	  res.json(events); // Return all events in JSON format
  });
});

/* * * * * * * * * * * * API - POST events * * * * * * * * * * * */
app.post('/api/events', function(req, res) {
  // Create event
	Event.create({
      eventName : req.body.eventName,
			eventType : req.body.eventType,
			eventLocation : req.body.eventLocation,
			eventDetails : req.body.eventDetails,
      done : false
    }, function(err, event) {
		if (err) {
			res.send(err);
		}
		// Display all the events after insertion
		Event.find(function(err, events) {
			if (err) {
				res.send(err);
			}
			res.json(events);
		});
	});
});

app.get('*', function(req, res) {
  res.sendFile('./public/index.html');
});

/* * * * * * * * * * * * Start the server * * * * * * * * * * * */
app.listen(8080);
console.log("App listening on port 8080");
