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
  const id = req.params.id;
  const user = req.user;
  Movie.findOne({ APIid: id })
    .populate('review')
    .then((movie) => {
      const reviews = movie.review
      let reviewUser;
      reviews.map((rew) => {
        ((rew.user).toString() === (req.user._id).toString()) ? reviewUser = rew : 0
      });
      res.render('reviews/reviews', { reviews, reviewUser, movie, user })
    })
})

router.post('/writeReview/:id', (req, res, next) => {
  const id = req.params.id;
  const { comment, title } = req.body;
  Review.findByIdAndUpdate(id, { comment: comment, title: title, username: req.user.username }, { new: true })
    .then(() => {
      res.redirect('back')
    })
})








module.exports = router;