const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/auth', authRoutes);
router.use('/movies', moviesRoutes);
router.use('/users', usersRoutes);
module.exports = router;
