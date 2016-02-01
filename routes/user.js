var express         = require('express');
var app             = express.Router();
var userModel       = require("../models/UserModel");

app.get('/login', function(req, res, next) {
	res.render('login', { title: 'Express', msg: null});
});

app.post('/login', function(req, res, next) { 
    userModel.Login(req.body.email, req.body.pwd, function(err, result){
        if (err == null) {
            req.session.email=req.body.email;
            req.session.authenticated = true;
            res.redirect('/cms/edit');
        }
        else {
            res.render('login', { title: 'Express', msg: err});
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