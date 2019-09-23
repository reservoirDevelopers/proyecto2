const express = require('express');
const router  = express.Router();
const authRoutes = require('./auth');
const moviesRoutes = require('./movies');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/auth', authRoutes);
router.use('/movies', moviesRoutes);
module.exports = router;
