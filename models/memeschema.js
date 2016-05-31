// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMAS
var memeSchema = new mongoose.Schema({
	memeName: String,
	img: String,
	about: String
});

// MODEL METHODS
memeSchema.methods.introduce = function() {
    // console.log("This is the " + this.name + " located in " + this.country);
};


// Map it through Mongoose
var Meme = mongoose.model('Meme', memeSchema);


module.exports = Meme;