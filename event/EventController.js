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
  var newEvent = req.body;

  // The if/else statement is commented out for now to make debugging easier
  // TODO: Figure out whether to do validations here or somewhere else
  // if (!(req.body.eventName)) {
  //   error(res, "Must provide an event name.", 400);
  // }
  // else {
    db.collection('events').insertOne(newEvent, function(err, doc) {
      if (err) {
        error(res, "Failed to create new event.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  // }
});

// GET
app.get('/dashboard', function(req, res){
  db.collection(events).find({}).toArray(function(err, docs) {
    if (err) {
      error(res, "Failed to get events.");
    }
    else {
      res.status(200).jason(docs);
    }
  });
});

// Function for erroring
function error(res, message, code) {
  console.log("ERROR: " + message);
  res.status(code || 500).json({"error": message});
}


module.exports = app; // Goes at the end to export the router to be used in app.js
