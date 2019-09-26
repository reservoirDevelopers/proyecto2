const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  APIid: String,
  title: String,
  duration: Number,
  year: String,
  genre: [{}],
	director: String,
  cast: [String],
	country: [String],
	sinopsis: String,
	poster: String,
	review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;