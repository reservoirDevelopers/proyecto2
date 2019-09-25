const express = require("express");
const router = express.Router();
const User = require("../models/User");
const secure = require("../middlewares/secure.mid");
const recommendations = require("../controllers/recommendation.controller")

router.get("/user/me", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  const similarUsers = recommendations.findNearestNeighbours(res, next, user);
})

router.get("/user/:id", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  res.render("users/user", { user } );
})  

module.exports = router;