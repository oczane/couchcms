var express          = require('express');
var app              = express.Router();

app.get('/login', function(req, res, next) {
	res.render('index', { title: 'Express'});
});


module.exports = app;