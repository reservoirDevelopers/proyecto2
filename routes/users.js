const express = require("express");
const router = express.Router();
const User = require("../models/User");
const secure = require("../middlewares/secure.mid");
const recommendations = require("../controllers/recommendation.controller")

router.get("/user/me", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  const similarUsers = recommendations.findNearestNeighbours(req, res, next, user);
  res.render("users/index", { user, similarUsers } );
})

router.get("/user/:id", secure.checkIfLogged, (req, res, next) => {
  User.findById(req.params.id).then(user => {res.render("users/user", user )});
})

module.exports = router;