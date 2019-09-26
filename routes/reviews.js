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
      const reviews = movie.review
      let reviewUser;
      reviews.map((rew) => {
        ((rew.user).toString() === (req.user._id).toString()) ? reviewUser = rew : 0
      });
      console.log('=======HEEEEY======', reviewUser)
      console.log('=======Hola=====',reviews)
      res.render('reviews/reviews', { reviews, reviewUser, movie })
    })
})

router.post('/writeReview/:id', (req, res, next) => {
  const id = req.params.id;
  const { comment, title } = req.body;
  console.log('=======Hola=====', id)
  Review.findByIdAndUpdate(id, { comment: comment, title: title, username: req.user.username }, { new: true })
    .then(() => {
      console.log('Review updated')
      res.redirect('back')
    })
})








module.exports = router;