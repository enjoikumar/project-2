// REQUIREMENTS
var express = require('express');
var router = express.Router();
// var Test = require('../models/test.js');
var request = require('request');
var flickr = require("flickrapi");
var flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET_key
};

// Test route
router.get('/', function(req, res) {
   // var b = "anything";
   // res.send (b);
  // console.log("hello");
  // flickr.tokenOnly(flickrOptions, function(error, flickr) {
  //   flickr.photos.search({
  //     tags: "blue",
  //     page: 1,
  //     per_page: 1
  //     }, function(err, result) {
  //     console.log(typeof result);
  //     console.log(result);
  //   });
  })

  flickr.tokenOnly(flickrOptions, function(error, flickr) {
    console.log("made it here");
   flickr.test.echo({"test": "test"}, function(err,result) {
    console.log("made it into flickr.test.echo");
     if(err) { return console.log("note: error connecting to the flickr API"); }
      var firstResult;
       flickr.photos.search({ 
        tags: "red+panda",
        per_page: 1,
        page: 1 }, function(err,result) {
        // console.log("this is the result: ");
        // console.log(result);
        // console.log("made it to search");
         if(err) { return console.log("error:", err); }
         console.log(result.photos.photo.length + " results found. First result:");
         console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
          firstResult = JSON.stringify(result.photos.photo[0],false,2);
          console.log("my version" + firstResult);
          console.log(typeof firstResult);
          console.log(result.photos.photo[0]);
          console.log(typeof result.photos.photo[0]);
          res.send(firstResult);
          // res.json(result.photos.photo[0]);
          // res.json(firstResult);
          // return firstResult;
         //process.exit(0);
         // res.send(JSON.stringify(result.photos.photo.length));
     });
          // console.log("anything");
          // console.log("first result: " + firstResult);
   });
 });
  console.log("anything");


module.exports = router;