var uuid        = require("uuid");
var db          = require("./dbconnection").Connect();
var N1qlQuery   = require('couchbase').N1qlQuery;

function ContentModel() { };

ContentModel.delete = function(documentId, callback) {
    
    db.remove(documentId, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

ContentModel.save = function(data, author, callback) {
    var jsonObject = {
        type: 'cms',
        id: uuid.v4(),
        maincontent: data.maincontent,
        author: author,
        createdate: new Date(),
        culture: data.culture,
        pagename: data.page_name,
        active: 1
    }

    var documentId = data.culture + '|' + data.page_name;

    db.upsert(documentId, jsonObject, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
}

ContentModel.getByDocumentId = function(documentId, callback) {
    db.get(documentId, function(err, result) {
        if (err){
            callback('{error: true, errormsg: ' + err + ', result:[]}');
        }
        else{
            callback(null, result);   
        }
    });
};

ContentModel.getAllPages = function(callback) {
    var query = N1qlQuery.fromString("SELECT * FROM couchcms WHERE type='cms';");
    db.query(query,function(err,result){
        if (err){
            logger.info(err);
            callback('{error: true, errormsg: ' + err + ', result:[]}', null);
        }
        callback(null,result);
    });
};

module.exports = ContentModel;