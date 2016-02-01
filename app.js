var express     	= require("express");
var bodyParser  	= require("body-parser");
var path        	= require("path");
var cookieParser 	= require('cookie-parser');
var favicon 		= require('serve-favicon');
var session         = require('express-session');
var config      	= require("./config");
var logger      	= require("./logconfig");
var app         	= express();
var routes 			= require('./routes/routes'); 	//api route
var user	 		= require('./routes/user'); 	//user route
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

app.use(session({
    secret: '###COUCH-CMS###',
    name: 'session',
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

var requireLogin = function (req, res, next) {
  if (req.session.authenticated == null) {
    res.redirect('/user/login');
  } else {
    next();
  }
};

app.use('/api', routes);
app.use('/user', user);
app.use('/cms', requireLogin, cmsroutes);

var server = app.listen(config.server.port, function () {
    console.log("Listening on port %s...", server.address().port);
    logger.info("app is live. start hitting the api.");
});

module.exports = app;
