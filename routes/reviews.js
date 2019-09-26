const express = require("express");
const passport = require('passport');
const router = express.Router();
const Movie = require("../models/Movie");
const APIHandler = require("../service/APIhandler.js");
const moviesDB = new APIHandler('https://api.themoviedb.org/3/movie/');
const User = require("../models/User");
const Review = require("../models/Review");
const secure = require("../middlewares/secure.mid");


router.get('/reviews/:id', (req, res, next) => {
  const id = req.params.id
  Movie.findOne({ APIid: id })
    .populate('review')
    .then((movie) => {
      const user = req.user
      const reviews = movie.review
      res.render('reviews/reviews', { reviews, movie, user })
    })
})

router.post('/write-review/:id', (req, res, next) => {
  const id = req.params.id;
  const { comment } = req.body;
  Review.findByIdAndUpdate(id, { comment: comment }, { new: true })
    .then(() => {
      console.log('Review created')
      res.redirect('back')
    })
})








module.exports = router;