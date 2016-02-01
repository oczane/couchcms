
var express          = require('express');
var session          = require('express-session');
var app              = express.Router();
var contentModel     = require("../models/ContentModel");

app.get('/edit', function(req, res, next) {
    res.render('index', { title: 'Express'});
});

app.get('/edit/:culture/:page', function(req, res, next) {
    res.render('edit', { title: 'Express'});
});

app.get('/list', function(req, res, next) {
    contentModel.getAllPages(function(error, result) {
    	if (error) {
    		res.render('list', { title: 'Express', contectList: []});	
    	}
    	res.render('list', { title: 'Express', contectList: result});
    });
});

app.post("/save", function(req, res) {
    var author = "Rakesh Gupta";
    if(!req.body.maincontent) {
        return res.status(400).send({"status": "error", "message": "maincontent is required"});
    } else if(!req.body.culture) {
        return res.status(400).send({"status": "error", "message": "culture is required"});
    } else if(!req.body.page_name) {
        return res.status(400).send({"status": "error", "message": "page_name is required"});
    }

    contentModel.save(req.body, author, function(error, result) {
        if(error) {
            return res.status(400).send(error);
        }
        res.redirect('list');
    });
 });

module.exports = app;