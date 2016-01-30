var express     	= require("express");
var bodyParser  	= require("body-parser");
var path        	= require("path");
var cookieParser 	= require('cookie-parser');
var favicon 		= require('serve-favicon');
var config      	= require("./config");
var logger      	= require("./logconfig");
var app         	= express();
var routes 			= require('./routes/routes'); 	//api route
var cmsroutes 		= require('./routes/cms'); 		//cms route

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api', routes);
app.use('/cms', cmsroutes);

var server = app.listen(config.server.port, function () {
    console.log("Listening on port %s...", server.address().port);
    logger.info("app is live. start hitting the api.");
});

module.exports = app;