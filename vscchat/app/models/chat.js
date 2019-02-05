var chatModel   = require('../database').models.chat;
var create = function (data, callback){
	var newchat = new chatModel(data);
	newchat.save(callback);
};
module.exports = { 
	create
};