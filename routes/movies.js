require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const Movie = require("../models/Movie");
const APIHandler = require("../service/APIhandler.js")
const moviesDB = new APIHandler('https://api.themoviedb.org/3/movie/');
// const movieContainer = document.querySelector(".movieContainer");

router.get('/popular', (req, res, next) => {
  moviesDB.getPopular()
    .then((response) => {
      const movie = response.data.results
      console.log("estos son los datos", movie)
      res.render('movies/popular', { movie })
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
      console.log(movie)
      res.render('movies/info', movie)
    })
    .catch(err => next(err))
})

module.exports = router;