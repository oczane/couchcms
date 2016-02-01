var express         = require('express');
var app             = express.Router();
var userModel       = require("../models/UserModel");
var csrfProtection  = require("../csurf").csrfProtection();

app.get('/login', csrfProtection, function(req, res, next) {
	res.render('login', { title: 'Express', msg: null, csrfToken: req.csrfToken()});
});

app.post('/login', csrfProtection, function(req, res, next) { 
    userModel.Login(req.body.email, req.body.pwd, function(err, result){
        if (err == null) {
            req.session.email=req.body.email;
            req.session.authenticated = true;
            res.redirect('/cms/edit');
        }
        else {
            res.render('login', { title: 'Express', msg: err, csrfToken: req.csrfToken()});
        }
    });
});

app.get('/logout', function(req, res, next) {
    req.session.destroy(function(err){
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/user/login');
        }
    });
});

module.exports = app;