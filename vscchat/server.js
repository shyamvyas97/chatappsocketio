var express 	= require('express');
var app  		= express();
var path 		= require('path');
var bodyParser 	= require('body-parser');
var flash 		= require('connect-flash');
var morgan 		= require('morgan');
var routes 		= require('./app/routes');
var session 	= require('./app/session');
var passport    = require('./app/auth');
var ioServer 	= require('./app/socket')(app);

var port = process.env.PORT || 8090;

app.use(morgan('combined'));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.use('*',function(req, res){
	res.render('404');
});
// app.use(function(req, res, next) {
//   res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
// });

ioServer.listen(port);