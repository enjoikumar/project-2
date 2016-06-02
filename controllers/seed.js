var express = require('express');
var router = express.Router();
var Memes = require('../models/memeschema.js');

router.get('/', function(req,res){
  console.log('seed runs')
    Memes.find({}, function(err, fruits){
      res.send(memes);
    });
});

var newMemes = [];

router.get('/newmemes', function(req,res){
  newMemes.push(
    { 
      memeName: "Doge",
      img: "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
      about: "What this? How do?"
    }, {
      memeName: " Desk Flip Guy Rage ",
      img: "https://cdn.meme.am/instances/500x/68593897.jpg",
      about: "Used to illustrate rage and frustration",
    }, {
      memeName: "Over 900",
      img: "https://cdn.meme.am/instances/500x/68593789.jpg",
      about: "A reference to an episode of Dragon Ball Z, where the antagonist underestimates the protagonist's power level",
    }, {
      memeName: "Drake",
      // img: "https://s3.amazonaws.com/hiphopdx-production/2015/12/Drake-Stormtrooper.jpg",
      img: "http://67.media.tumblr.com/963bbd940f51a3f87c5530dcece397a5/tumblr_o7jiyttomQ1sxck1io1_500.jpg",
      about: "The Toronto will always be the butt of the joke. His memes often refer to his soft side",
    }, {
      memeName:"Spongebob",
      img: "http://memesvault.com/wp-content/uploads/Spongebob-Meme-How-Tough-Am-I-22.jpg",
      about: "The popular children's television has been used as a meme for years, and has no sign of letting down with various screen caps of episodes and use of wide characters.",
    }, {
      memeName: "One Does Not simply",
      img: "https://cdn.meme.am/instances/500x/68593769.jpg",
      about: "Popularized by the phrase 'one does not' "
    }, {
      memeName: "Brace Yourself",
      img: "https://cdn.meme.am/instances/500x/68593809.jpg",
      about: "A reference to Game of Thrones, this meme has been widely used to illustrate fear and awkwardness."
    }, {
      memeName:"Joe the Instructor",
      img:"https://cdn.meme.am/instances/500x/68593942.jpg",
      about:"Joe the instructor is about the antics of..well Joe the instructor."
    },{
      memeName:"Jordan Crying Face",
      img:"https://pics.onsizzle.com/581924093362061313-Twitter.png",
      about:"Now everyone can get the Jordan crying meme. Taken from Michael Jordan's hall of fame induction, the face can be put on anyone or anything to dispense a feeling of loss or taking an L."
    },{
      memeName:"Bad Luck Brian",
      img:"https://cdn.meme.am/instances/500x/68594086.jpg",
      about: "Basically, bad luck. Where nothing goes right."
    }
  );
  console.log(newMemes);
  Memes.create(newMemes, function(err) {
      res.redirect('/seed');
  });
});

module.exports = router;