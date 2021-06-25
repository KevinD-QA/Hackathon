const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/cinema").then(() => { console.log('Connection Ready') }, (err) => { console.log(err); throw err; });

const actorSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true}
});

const reviewSchema = new mongoose.Schema({
    review: {type:String, required:true},
    rating: {type:Number,required:true}
});

const movieSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    releaseData: {type:String, required:true},
    reviews: [reviewSchema],
    actors: [actorSchema]
});
 
const product = mongoose.model('Movies', movieSchema);

module.exports = product;