const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  duration: Number,
  year: Number,
  // category: {type: ObjectId, ref: 'Category'},
  genre: [String],
	director: String,
  cast: [String],
	country: [String],
	sinopsis: String,
	poster: String,
	rate: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;