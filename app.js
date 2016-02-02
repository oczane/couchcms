var express     	= require("express");
var bodyParser  	= require("body-parser");
var path        	= require("path");
var cookieParser 	= require('cookie-parser');
var favicon 		  = require('serve-favicon');
var session       = require('express-session');

var config      	= require("./config");
var logger      	= require("./logconfig");

var routes 			  = require('./routes/routes'); 	//api route
var user	 		    = require('./routes/user'); 	//user route
var cmsroutes 		= require('./routes/cms'); 		//cms route

var app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var parseForm = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(parseForm);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: '###COUCH-CMS###',
    name: 'session',
    //store: sessionStore, // TO-DO - connect to redis store to maintain state
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

// error handler 
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
 
  // handle CSRF token errors here 
  res.status(403)
  res.send('form tampered with')
})

app.use('/api', routes);
app.use('/user', user);
app.use('/cms', requireLogin, cmsroutes);

var server = app.listen(config.server.port, function () {
    console.log("Listening on port %s...", server.address().port);
    logger.info("app is live. start hitting the api.");
});

module.exports = app;
