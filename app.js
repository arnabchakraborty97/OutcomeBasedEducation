const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var methodOverride = require('method-override');

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Method-Override Middleware
app.use(methodOverride('_method'));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global Variables
app.use(function(req, res, next) {
	res.locals.errors = null;
	next();
});

var routes = require('./routes');

app.use('/', routes);

app.listen(8000, function () {
	console.log('Server started on port 8000')
});