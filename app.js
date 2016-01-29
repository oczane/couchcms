var express     	= require("express");
var bodyParser  	= require("body-parser");
var path        	= require("path");
var cookieParser 	= require('cookie-parser');
var config      	= require("./config");
var logger      	= require("./logconfig");
var app         	= express();
var routes 			= require('./routes/routes');
var cmsroutes 		= require('./routes/cms');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// All endpoints to be used in this application
//var routes = require("./routes/routes.js")(app);

app.use('/api', routes);
app.use('/cms', cmsroutes);

var server = app.listen(8000, function () {
    console.log("Listening on port %s...", server.address().port);
    logger.info("app is live. start hitting the api.");
});

module.exports = app;