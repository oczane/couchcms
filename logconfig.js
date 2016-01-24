var winston     = require('winston');

var logger = new (winston.Logger)({
	    transports: [
	      new (winston.transports.File)({ filename: 'logs.log' })
	    ]
});

exports.info = function(msg){
	logger.info(msg);
}
