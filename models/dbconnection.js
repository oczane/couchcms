var couchbase   = require("couchbase");
var config      = require("../config");

var Connection = function() {
	return {
		database: function() {
			return (new couchbase.Cluster(config.couchbase.server)).openBucket(config.couchbase.bucket);
		}
	};
}();


exports.Connect = function() {
	return Connection.database();
}