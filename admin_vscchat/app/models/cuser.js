var userModel = require('../database').models.cuser;

var create = function (data, callback){
	var newUser = new userModel(data);
	newUser.save(callback);
};

var findOne = function (data, callback){
	userModel.findOne(data, callback);
}

var find = function (data, callback){
	userModel.find(data, callback);
}

var findById = function (id, callback){
	userModel.findById(id, callback);
}

var isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = { 
	create, 
	findOne,
	find,
	findById, 
	isAuthenticated 
};
