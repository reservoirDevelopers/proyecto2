const express = require("express");
const router = express.Router();
const User = require("../models/User");
const secure = require("../middlewares/secure.mid");

router.get("/user/me", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  res.render("users/index", { user } );
})

router.get("/user/:id", secure.checkIfLogged, (req, res, next) => {
  User.findById(req.params.id).then(user => {res.render("users/user", user )});
})

module.exports = router;