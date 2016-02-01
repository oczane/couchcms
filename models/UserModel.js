var uuid        = require("uuid");
var db          = require("./dbconnection").Connect();

function UserModel() { };

UserModel.Login = function(email, password, callback) {
	var documentId = "user:" + email;
    
    db.get(documentId, function(err, result) {
        if (err){
            callback('No such email found.', null);
        }
        else{
        	if (result.value.password == password) {
            	callback(null, result);   	
        	}
        	else {
        		callback('Invalid login', null);
        	}
        }
    });
};

module.exports = UserModel;