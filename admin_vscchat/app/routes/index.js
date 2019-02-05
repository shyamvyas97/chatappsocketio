
var express	 	= require('express');
var router 		= express.Router();
var passport 	= require('passport');

var User = require('../models/user');
var Room = require('../models/room');

router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		res.redirect('/index');
	}
	else{
		res.render('login', {
			success: req.flash('success')[0],
			errors: req.flash('error'), 
			showRegisterForm: req.flash('showRegisterForm')[0]
		});
	}
});

router.post('/login', passport.authenticate('local', { 
	successRedirect: '/index', 
	failureRedirect: '/',
	failureFlash: true
}));

router.post('/register', function(req, res, next) {

	var credentials = {'username': req.body.username, 'password': req.body.password };

	if(credentials.username === '' || credentials.password === ''){
		req.flash('error', 'Missing credentials');
		req.flash('showRegisterForm', true);
		res.redirect('/');
	}else{

		// Check if the username already exists for non-social account
		User.findOne({'username': new RegExp('^' + req.body.username + '$', 'i'), 'socialId': null}, function(err, user){
			if(err) throw err;
			if(user){
				req.flash('error', 'Username already exists.');
				req.flash('showRegisterForm', true);
				res.redirect('/');
			}else{
				User.create(credentials, function(err, newUser){
					if(err) throw err;
					req.flash('success', 'Your account has been created. Please log in.');
					res.redirect('/');
				});
			}
		});
	}
});


router.get('/index',[User.isAuthenticated, function(req, res, next) {
		res.render('index', {  user: req.user });
}]);
router.get('/about',[User.isAuthenticated, function(req, res, next) {
		res.render('about', {  user: req.user });
}]);


router.get('/rooms', [User.isAuthenticated, function(req, res, next) {
	Room.find(function(err, rooms){
		if(err) throw err;
		res.render('rooms', { rooms,user: req.user });
	});
}]);

router.get('/delete/:id', [User.isAuthenticated, function(req, res, next) {
	var roomId = req.params.id;
	Room.removeById(roomId, function(err, room){
		if(err) throw err;
		if(!room){
			return next(); 
		}
		res.redirect('/rooms');
	});
	
}]);



router.get('/logout', function(req, res, next) {
	req.logout();

	req.session = null;

	res.redirect('/');
});

module.exports = router;