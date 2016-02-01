var csrf 	= require('csurf');

exports.csrfProtection = function() { 
	return csrf({ cookie: true });  
}