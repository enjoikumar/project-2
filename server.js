//requirements
var express = require('express');
var app = express();
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || "mongodb://localhost/memes_dev";
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var flickrapi = require('flickrapi');
var flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET_key
};

//middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//Database
mongoose.connect(mongoUri);

//controller
var memescontroller = require('./controllers/memes.js');
app.use('/memes', memescontroller);


var seedcontroller = require('./controllers/seed.js');
app.use('/seed', seedcontroller);



//listener
app.listen(port);
console.log('=============================');
console.log('Server running off PORT: ' + port);
console.log('=============================');