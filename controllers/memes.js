// REQUIREMENTS
var express = require('express');
var router = express.Router();
// var Test = require('../models/test.js');
var request = require('request');
var Memes = require('../models/memeschema.js');
var Flickr = require("flickrapi");
// var flickrapi = require('flickrapi');
var flickrOptions = {
  api_key: process.env.FLICKR_KEY,
  secret: process.env.FLICKR_SECRET_key
};

//INDEX
router.get('/', function(req, res){
	Memes.find({}, function(err, memes){
		res.render('index.ejs', {memes});
	});
});




//DUMMY
router.get('/dummy', function(req, res){
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object
    flickr.photos.search({
      tags: "meme",
      page: 1,
      per_page: 1
    }, function(err, result) {
      console.log(typeof result)
      console.log(result.photos.photo);
      var image = "https://farm" + result.photos.photo[0].farm + ".staticflickr.com/" + result.photos.photo[0].server + "/" + result.photos.photo[0].id + "_" + result.photos.photo[0].secret + ".jpg"
      // result is Flickr's response
    });
  });


  // console.log('--------------------');
  // console.log(flickr);
  // console.log('--------------------');
  // flickr.photos.search({
  //   user_id: flickr.options.user_id,
  //   page: 1,
  //   per_page: 1
  // }, function(err, result) {
  //   console.log(result);
  //   // result is Flickr's response
  // });
})

//NEW
router.get('/new', function(req, res){
  res.render('new.ejs');
});

var flickrImage = [];
//CREATE
router.post('/', function(req,res){
  var name = req.body.name
  var img = req.body.imgURL;
  var about = req.body.about;
  var brandnewmeme = new Memes(req.body);
  console.log('================')
  console.log(brandnewmeme);
  console.log('=================')
  console.log(req.body.imgURL);
  brandnewmeme.save(function(err){
    if (err){
      console.log(err);
    }else{
      console.log('new meme');
       Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object
    flickr.photos.search({
      tags: img,
      page: 1,
      per_page: 1
    }, function(err, result) {
      console.log(result)
      // console.log(typeof result)
      console.log(result.photos);
      var image = "https://farm" + result.photos.photo[0].farm + ".staticflickr.com/" + result.photos.photo[0].server + "/" + result.photos.photo[0].id + "_" + result.photos.photo[0].secret + ".jpg"
      // result is Flickr's response
      // newMemes.push({name: name, img: image, about: about})
      // console.log(newMemes);
      flickrImage.push(image);
      console.log(flickrImage);
    });
  });
    }
  })
  // res.redirect('/memes');
  // res.render('index.ejs', {flickrImage: flickrImage[0]}, {newmeme});
  res.redirect('/memes')
});

//FLICKRSHOW
// router.get('/', function(req, res){
//   Memes.find({}, function(err, memes){
//     res.render('flickr.ejs');
//   });
// });

//format for displaying image
// var img1 = "https://farm" + firstResult.farm + ".staticflickr.com/" + firstResult.server + "/" + firstResult.id + "_" + firstResult.secret + ".jpg"

//SHOW
router.get('/:id', function(req, res){
  Memes.findById(req.params.id, function(err, memes){
    // console.log(memes.id);
    res.render('show.ejs', {memes});
  })
});

//EDIT
router.get('/:id/edit', function(req, res) {
  console.log(req.params.id);
  Memes.findById(req.params.id, function(err, memes){
    console.log("this is the meme " + memes);
    res.render('edit.ejs', {memes});
  })
});




// UPDATE
router.put('/:id', function(req, res){
  Memes.findById(req.params.id, function(err,memes){
    res.redirect('./memes')
  });
})



//DELETE
router.delete('/:id', function(req, res){
  Memes.findByIdAndRemove({'_id' : req.params.id, function(){
    res.redirect('/memes');
  }})
});

var flickrFunction =function(){
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object
    flickr.photos.search({
      tags: img,
      page: 1,
      per_page: 1
    }, function(err, result) {
      console.log(result)
      // console.log(typeof result)
      console.log(result.photos);
      var image = "https://farm" + result.photos.photo[0].farm + ".staticflickr.com/" + result.photos.photo[0].server + "/" + result.photos.photo[0].id + "_" + result.photos.photo[0].secret + ".jpg"
      // result is Flickr's response
      flickrImage.push(image);
      console.log(flickrImage);
    });
  })
} 

// // Index
// router.get('/', function(req,res){
// 	console.log('hello');
// 	res.render('index.ejs', {memes})
// });

// // New
// router.get('/new', function(req, res) {
// 	res.render('new.ejs');
// });

// //Show
// router.get('/:id', function(req, res) {
// 	var stats = req.params.id;
// 	var data = memes;
// 	for(var i = 0; i < data.length; i++){
// 		if (data[i].id == stats){
// 			match = data[i];
// 		}
// 	}
// 	res.render('show.ejs', match)
// });

// //Edit 
// router.get('/:id/edit', function(req, res) {
// 	var stats = req.params.id;
// 	var data = memes;
// 	for(var i = 0; i < data.length; i++) {
// 		if(data[i].id == stats) {
// 			match = data[i]
// 		}
// 	}
// 	res.render('edit.ejs', match)
// });

// //UPDATE
// router.put('/:id', function(req, res) {
// 	req.body.id = parseInt(req.params.id);
// 	var stats = req.params.id;
// 	var data = memes;
// 	for(var i=0; i < data.length; i++){
// 		if (data[i].id == req.params.id) {
// 			data[i] = req.body;
// 		}
// 	}

// 	res.redirect('/memes');
// });

// //Create
// router.post('/', function(req, res) {
// 	console.log('======================');
// 	console.log(req.body);
// 	console.log('======================');
// 	var max = -Infinity;
// 	var stats = req.params.id;
// 	var data = memes;
// 	for(var i=0; i < data.length; i++) {
// 		if(data[i].id > max) {
// 			max =data[i].id
// 		}
// 	}
// 	req.body.id = max + 1;
// 	//   flickr.tokenOnly(flickrOptions, function(error, flickr) {
//  //    console.log("made it here");
//  //   flickr.test.echo({"test": "test"}, function(err,result) {
//  //    console.log("made it into flickr.test.echo");
//  //     if(err) { return console.log("note: error connecting to the flickr API"); }
//  //      var result;
//  //       flickr.photos.search({ 
//  //        tags: "red+panda",
//  //        per_page: 1,
//  //        page: 1 }, function(err,result) {
//  //        // console.log("this is the result: ");
//  //        // console.log(result);
//  //        // console.log("made it to search");
//  //         if(err) { return console.log("error:", err); }
//  //         console.log(result.photos.photo.length + " results found. First result:");
//  //         console.log("this is the result in their code: " + JSON.stringify(result.photos.photo[0],false,2));
//  //          firstResult = JSON.stringify(result.photos.photo[0],false,2);
//  //          console.log("my version" + firstResult);
//  //          console.log(typeof firstResult);
//  //          console.log(result.photos.photo[0]);
//  //          console.log(typeof result.photos.photo[0]);
//  //          res.send(firstResult);
//  //          // res.json(result.photos.photo[0]);
//  //          // res.json(firstResult);
//  //          // return firstResult;
//  //         //process.exit(0);
//  //         // res.send(JSON.stringify(result.photos.photo.length));
//  //     });
//  //          // console.log("anything");
//  //          // console.log("first result: " + firstResult);
//  //   });
//  // });
//  //  console.log("anything");

// 	console.log('new meme coming up...');
// 	// console.log(req.body);
// 	data.push(req.body);
// 	res.redirect('/memes');
// });

// //Delete
// router.delete('/:id', function(req, res) {
//   console.log('deleting');
//   console.log(req.params.id);
//   var stats = req.params.id;
//   var data = memes;
//   for(var i=0;i < data.length; i++) {
//     if(data[i].id == req.params.id) {
//       console.log("Delete: " + data[i]);
//       data.splice(i, 1);
//     }
//   }

//   res.redirect('/memes');
// });



















// newform. 



















// //==============================
// //TO BE USED FOR LATER
// //==============================
// // show page
// // router.get("/index/:meme", function(req, res) {
// //   // console.log("getting movie works");
// //   console.log(req.params.movie);
// //   var y = encodeURIComponent(req.params.movie);
// //   var x = "http://www.omdbapi.com/?t=" + y;
// //   console.log(x);
// //   request(x, function (error, response, body) {
// //     if (!error && response.statusCode == 200) {
// //       // console.log('-----------------------------');
// //       console.log('API data below...');
// //       var theMovie = JSON.parse(body);
// //       // console.log(body);
// //       // console.log(theMovie);
// //       res.render("show.ejs", {theMovie});
// //       // console.log('-----------------------------');
// //     }
// //   })
// // });

// // //Show
// // router.get('/index/:meme', function(req, res){
// // 	console.log(req.params.meme);
// // 	var y = encodeURIComponent(req.params.meme);
// // 	var x = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0daed8ce23060668fa0d55c247019c00&format=rest&auth_token=72157669097635675-bb1b4cbce2b0ed26&api_sig=b3c2c02a2c640f4cf792bcfe397a71f4" + y +"&20meme"
// // 	console.log(x);
// // 	request(x, function (error, response, body) {
// //     if (!error && response.statusCode == 200) {
// //       console.log('-----------------------------');
// //       console.log('API data below...');
// //       var meme = JSON.parse(body);
// //       console.log(body);
// //       console.log(meme);
// //       res.render("show.ejs", {meme});
// //       console.log('-----------------------------');
// //     }
// //   })
// // })


//  // "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos
//  // &api_key=0daed8ce23060668fa0d55c247019c00&format=rest&auth_token=
//  // 72157669097635675-bb1b4cbce2b0ed26&api_sig=b3c2c02a2c640f4cf792bcfe397a71f4"

// // var y = encodeURIComponent("Back To The Future");
// // var x = "http://api.flickr.com/services/rest/?&method=flickr.photos.getRecent" + 'meme';
// // console.log(x);

// // // Test route
// // router.get('/', function(req, res) {
// //    // var b = "anything";
// //    // res.send (b);
// //   // console.log("hello");
// //   // flickr.tokenOnly(flickrOptions, function(error, flickr) {
// //   //   flickr.photos.search({
// //   //     tags: "blue",
// //   //     page: 1,
// //   //     per_page: 1
// //   //     }, function(err, result) {
// //   //     console.log(typeof result);
// //   //     console.log(result);
// //   //   });
// //   })

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