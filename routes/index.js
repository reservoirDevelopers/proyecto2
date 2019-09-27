const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');
const reviewsRoutes = require('./reviews');
const APIHandler = require("../service/APIhandler.js");
const moviesDB = new APIHandler('https://api.themoviedb.org/3/movie/');

/* GET home page */
router.get('/', (req, res, next) => {
  moviesDB.getPopular()
    .then((response) => {
      const movie = response.data.results
      const user = req.user
      moviesDB.getTopRated()
        .then((response) => {
          const topRated = response.data.results
          console.log(user)
          res.render('index', { movie, topRated, user })
        })
    })
})

router.use('/auth', authRoutes);
router.use('/movies', moviesRoutes);
router.use('/users', usersRoutes);
router.use('/reviews', reviewsRoutes);

module.exports = router;
