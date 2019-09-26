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
  Review.find({ id: id })
    .then((reviews) => {
      res.render('reviews/reviews', { reviews })
    })
})

router.post('/write-review', (req, res, next) => {
  const { comment } = req.body;
  Review.create({ comment })
    .then(() => {
      console.log('Review created')
      res.redirect('index')
    })
})








module.exports = router;