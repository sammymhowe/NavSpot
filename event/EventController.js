// Event controller logic (EventController.js)
var express = require('express');
var app = express();
var db = require('../db');

// Body-parser is used as middleware to handle data in a more elegant way
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Redirect to the same page with a blank form after Submit
// Packages the data in the form and sends it as a JSON object
app.post('/dashboard', function(req, res) {
  res.send(req.body); // Display the JSON object form data on a new screen
  db.collection('test1').insertOne( {
     "eventName" : {
       eventName : req.body.eventName
     },
     "eventType"  : {
     eventType : req.body.eventType
    },
      "eventLocation" : {
    eventLocation : req.body.eventLocation
  },
    "eventDetails" :  {
      eventDetails : req.body.eventDetails
    }
   });
});

module.exports = app; // Goes at the end to export the router to be used in app.js
