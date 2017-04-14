var path = require('path');	// Parse directory paths
var express = require('express'); // Provide static routing to pages
var app = express();
var app = setupExpress();

// Calls the database setup
var db = require('./db')

// Accesses the Event Controller and its REST routes
var EventController = require('./event/EventController');
app.use(EventController);

function setupExpress()
{
	// Set default path for views and public
	var viewsDir = path.join(__dirname, 'views');
	var publicDir = path.join(__dirname, 'public');

	app.use(express.static(publicDir));

	// Root page is login form
	app.get('/', function(req, res)
	{
		res.sendFile('views/index.html', { root: '.' });
	});

	// Once logged in, home page is dashboard
	app.get('/dashboard', function(req, res)
	{
		res.sendFile('views/dashboard.html', { root: '.' });
	});

	// Redirect to error page if there's an issue
	app.use(function(err, req, res, next)
	{
		console.log(err.stack);
		res.status(err.status || 500);
		res.sendFile('/views/error.html', { root: '.' });
	});
	return app;
}

module.exports = app;
