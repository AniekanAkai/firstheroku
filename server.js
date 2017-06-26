var express = require("express"),
	app = express(),
	port = process.env.PORT || 8080,
	bodyParser = require('body-parser'), 
	multer = require('multer'),
	logger = require('morgan'),
	basicAuth = require('basic-auth'), 
	session = require('express-session'), 
	bcrypt = require('bcrypt');
	
var sessionStore = [];

app.use(session({secret:"ami"}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('common'));
app.use(express.static(__dirname+'/public'));

//To get prompt for  authorisation on all routes
var auth = function(username, password) {
  return function(req, res, next) {
    var user = basicAuth(req);
	console.log(req.body);
    if (!user || user.name !== username || user.pass !== password) {
		console.log("this user tried to sign in: "+user)
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }
    next();
  };
};

app.set('view engine', 'ejs');

app.get("/q3", function(req, res){
	bcrypt.genSalt(10, function(err, salt){
		if(err) return next(err);
		bcrypt.hash("passw0rd", salt, function(err, hash){
			if(err) return next(err);
			
			res.send("Hash string for passw0rd: "+ hash);
		});
	});
});

app.listen(port, function(err){
	console.log("listening on %s", port);
});