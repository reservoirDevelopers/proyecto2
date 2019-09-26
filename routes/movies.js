require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const Movie = require("../models/Movie");
const APIHandler = require("../service/APIhandler.js");
const moviesDB = new APIHandler('https://api.themoviedb.org/3/movie/');
const User = require("../models/User");
const Review = require("../models/Review");
const secure = require("../middlewares/secure.mid");

router.get('/search', (req, res, next) => {
  moviesDB.getPopular()
    .then((response) => {
      const movie = response.data.results
      res.render('movies/search', { movie })
    })
})

router.post('/result', (req, res, next) => {
  const query = req.body.search;
  moviesDB.getBySearch(query)
    .then((response) => {
      const movie = response.data.results
      res.render('movies/result', { movie })
    })
})

router.get("/film", (req, res, next) => {
  moviesDB.getById(550)
    .then((data) => {
      res.render('movies/movie', data)
    })
})

router.get('/info/:id', (req, res, next) => {
  const id = req.params.id;
  moviesDB.getById(id)
    .then((response) => {
      const movie = response.data
      Movie.findOne({ APIid: id })
        .populate('review')
        .then((movieLocal) => {
          if (!!movieLocal) {
            if (movieLocal.review.some(rew => (rew.user).toString() == (req.user._id).toString())) {
              let score;
              movieLocal.review.map((rew) => {
                ((rew.user).toString() === (req.user._id).toString()) ? score = rew : 0
              });
              res.render('movies/info', { movie, score })
            } else res.render('movies/info', { movie })
          }
          else res.render('movies/info', { movie })
        })
        .catch(err => {
          throw err
        })
    })
    .catch(err => next(err))
})

router.post('/info/score/:scoreId', secure.checkIfLogged, (req, res, next) => {
  const rating = req.body.rating;
  Review.findByIdAndUpdate(req.params.scoreId, { score: rating }, { new: true })
    .then(res.redirect('back'))
    .catch((err) => {
      throw err
    })
})

router.post('/info/:id', secure.checkIfLogged, (req, res, next) => {
  const movieId = req.params.id;
  const userId = req.user;
  const rating = req.body.rating;

  //TODO faltan director y casting
  //TODO comprobacion de que la peli
  // no esta ya en nuestra BD
  Movie.findOne({ APIid: movieId })
    .then((movie) => {
      if (!!movie) {
        Review.create({
          user: userId,
          movie: movie._id,
          score: rating
        }).then((newReview) => {
          Movie.updateOne(
            { APIid: movieId },
            { $push: { review: newReview._id } },
            { new: true }
          ).then(() => {
            res.redirect('back');
          })
        })
      } else {
        moviesDB.getById(movieId).
          then((response) => {
            const movie = response.data
            Movie.create({
              APIid: movieId,
              title: movie.title,
              year: movie.release_date,
              poster: movie.poster_path,
              duration: movie.runtime,
              genre: movie.genres,
              sinopsis: movie.overview,
            }).then((movie) => {
              Review.create({
                user: userId,
                movie: movie._id,
                score: rating
              }).then((newReview) => {
                Movie.updateOne(
                  { APIid: movieId },
                  { $push: { review: newReview._id } },
                  { new: true }
                ).then(() => {
                  res.redirect('back');
                })
              })
            })
          }).catch((err) => next(err));
      }
    })

});

module.exports = router;