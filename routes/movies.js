require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const Movie = require("../models/Movie");
const APIHandler = require("../service/APIhandler.js")
const moviesDB = new APIHandler('https://api.themoviedb.org/3/movie/');
// const movieContainer = document.querySelector(".movieContainer");

router.get("/movies", (req, res, next) => {
  moviesDB.getMovieDetails(550)
  .then((data) => {
    // const { data } = res;
    // movieContainer.innerHTML='';
    // movieContainer.innerHTML +=`
    // <div>
    // <div class="title">${data.title}</div>
    // </div>
    // `;

    res.render("movies/index", data)
    // res.json(responseFromAPI)
  })
})

module.exports = router;