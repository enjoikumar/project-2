// REQUIREMENTS
var express = require('express');
var router = express.Router();
// var Test = require('../models/test.js');
var request = require('request');
var flickr = require("flickrapi");
var flickrapi = require('flickrapi');
var flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET_key
};

// show page
// router.get("/index/:meme", function(req, res) {
//   // console.log("getting movie works");
//   console.log(req.params.movie);
//   var y = encodeURIComponent(req.params.movie);
//   var x = "http://www.omdbapi.com/?t=" + y;
//   console.log(x);
//   request(x, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       // console.log('-----------------------------');
//       console.log('API data below...');
//       var theMovie = JSON.parse(body);
//       // console.log(body);
//       // console.log(theMovie);
//       res.render("show.ejs", {theMovie});
//       // console.log('-----------------------------');
//     }
//   })
// });

//Show
router.get('/index/:meme', function(req, res){
	console.log(req.params.meme);
	var y = encodeURIComponent(req.params.meme);
	var x = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0daed8ce23060668fa0d55c247019c00&format=rest&auth_token=72157669097635675-bb1b4cbce2b0ed26&api_sig=b3c2c02a2c640f4cf792bcfe397a71f4" + y +"&20meme"
	console.log(x);
	request(x, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('-----------------------------');
      console.log('API data below...');
      var meme = JSON.parse(body);
      console.log(body);
      console.log(meme);
      res.render("show.ejs", {meme});
      console.log('-----------------------------');
    }
  })
})


 // "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos
 // &api_key=0daed8ce23060668fa0d55c247019c00&format=rest&auth_token=
 // 72157669097635675-bb1b4cbce2b0ed26&api_sig=b3c2c02a2c640f4cf792bcfe397a71f4"

// var y = encodeURIComponent("Back To The Future");
// var x = "http://api.flickr.com/services/rest/?&method=flickr.photos.getRecent" + 'meme';
// console.log(x);

// // Test route
// router.get('/', function(req, res) {
//    // var b = "anything";
//    // res.send (b);
//   // console.log("hello");
//   // flickr.tokenOnly(flickrOptions, function(error, flickr) {
//   //   flickr.photos.search({
//   //     tags: "blue",
//   //     page: 1,
//   //     per_page: 1
//   //     }, function(err, result) {
//   //     console.log(typeof result);
//   //     console.log(result);
//   //   });
//   })

//   flickr.tokenOnly(flickrOptions, function(error, flickr) {
//     console.log("made it here");
//    flickr.test.echo({"test": "test"}, function(err,result) {
//     console.log("made it into flickr.test.echo");
//      if(err) { return console.log("note: error connecting to the flickr API"); }
//       var firstResult;
//        flickr.photos.search({ 
//         tags: "red+panda",
//         per_page: 1,
//         page: 1 }, function(err,result) {
//         // console.log("this is the result: ");
//         // console.log(result);
//         // console.log("made it to search");
//          if(err) { return console.log("error:", err); }
//          console.log(result.photos.photo.length + " results found. First result:");
//          console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
//           firstResult = JSON.stringify(result.photos.photo[0],false,2);
//           console.log("my version" + firstResult);
//           console.log(typeof firstResult);
//           console.log(result.photos.photo[0]);
//           console.log(typeof result.photos.photo[0]);
//           res.send(firstResult);
//           // res.json(result.photos.photo[0]);
//           // res.json(firstResult);
//           // return firstResult;
//          //process.exit(0);
//          // res.send(JSON.stringify(result.photos.photo.length));
//      });
//           // console.log("anything");
//           // console.log("first result: " + firstResult);
//    });
//  });
//   console.log("anything");



module.exports = router;