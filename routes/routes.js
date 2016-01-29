var express          = require('express');
var app              = express.Router();
var contentModel     = require("../models/ContentModel");
var logger           = require("../logconfig");

app.get("/get", function(req, res) {
        logger.info("Inside /api/get");
      
        var document_id = '';

        if (req.query.document_id)
            document_id = req.query.document_id;
        else{
            if(!req.query.culture) {
                return res.status(400).send({"status": "error", "message": "Culture id is required"});
            }
            if(!req.query.page_name) {
                return res.status(400).send({"status": "error", "message": "Page name is required"});
            }
            //Create a key to find couchbase document
            document_id = req.query.culture + '|' + req.query.page_name;
        }

        contentModel.getByDocumentId(document_id, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });

    
        
    });

	
app.post("/delete", function(req, res) {
        if(!req.body.document_id) {
            return res.status(400).send({"status": "error", "message": "A document id is required"});
        }
        RecordModel.delete(req.body.document_id, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
    });


app.post("/save", function(req, res) {

        if(!req.body.maincontent) {
            return res.status(400).send({"status": "error", "message": "maincontent is required"});
        } else if(!req.body.author) {
            return res.status(400).send({"status": "error", "message": "author is required"});
        } else if(!req.body.culture) {
            return res.status(400).send({"status": "error", "message": "culture is required"});
        } else if(!req.body.page_name) {
            return res.status(400).send({"status": "error", "message": "page_name is required"});
        }

        contentModel.save(req.body, function(error, result) {
            if(error) {
                return res.status(400).send(error);
            }
            res.send(result);
        });
        
    });

module.exports = app;