// REQUIREMENTS
var mongoose = require('mongoose');

// SCHEMAS
var MemeSchema = new mongoose.Schema({
	memeName: String,
	img: String,
	about: String
});

// MODEL METHODS
MemeSchema.methods.introduce = function() {
    // console.log("This is the " + this.name + " located in " + this.country);
};


// Map it through Mongoose
var Meme = mongoose.model('Meme', MemeSchema);


module.exports = Meme;