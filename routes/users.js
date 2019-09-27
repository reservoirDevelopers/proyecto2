const express = require("express");
const router = express.Router();
const User = require("../models/User");
const secure = require("../middlewares/secure.mid");
const recommendations = require("../controllers/recommendation.controller");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const uploadCloud = require("../configs/cloudinary.config");
let transporter = require("../configs/nodemailer.config");

router.get("/user/picture", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  res.render("users/picture", { user });
});

router.post(
  "/user/picture",
  secure.checkIfLogged,
  uploadCloud.single("photo"),
  (req, res, next) => {
    const user = req.user;
    const imgPath = req.file.url;
    console.log(req.file);

    User.findOneAndUpdate(
      { _id: user },
      {
        $set: {
          image: imgPath
        }
      }
    )
      .then(picture => {
        res.redirect("/user/me");
      })
      .catch(error => {
        console.log(error);
      });
  }
);

router.get("/user/me", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  res.render("users/index", { user });
});

router.get("/user/similar", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  const similarUsers = recommendations.findNearestNeighbours(res, next, user);
});

router.get("/user/following", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  User.findById(user).populate("friends").then(user => {
    res.render("users/following", { friends: user.friends, user });
  });
});

router.get(
  "/user/update",
  uploadCloud.single("photo"),
  secure.checkIfLogged,
  (req, res, next) => {
    const loggedUser = req.user;
    User.findById(loggedUser)
      .then(user => res.render("users/update", { user }))
      .catch(err => next(err));
  }
);

router.post(
  "/user/update",
  uploadCloud.single("photo"),
  secure.checkIfLogged,
  (req, res, next) => {
    const { username, email, gender, city, country } = req.body;
    // const secure_url = (req.file && req.file.secure_url)?req.file.secure_url: false;

    const loggedUser = req.user._id;

    User.findOneAndUpdate(
      { _id: loggedUser },
      {
        $set: {
          username: username,
          email: email,
          gender: gender,
          city: city,
          country: country
          // image: secure_url
        }
      },
      { new: true }
    )
      .then(user => {
        res.redirect("/user/me");
      })
      .catch(err => {
        console.log(err);
      });
  }
);

router.get("/user/delete", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  User.findById(user)
    .then(user => res.render("users/delete", { user }))
    .catch(err => next(err));
});

router.post("/user/delete", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  User.findByIdAndDelete(user)
    .then(res.redirect("/users/deletion"))
    .catch(err => next(err));
});

router.get("/users/deletion", secure.checkIfLogged, (req, res, next) => {
  res.redirect("/users/deletion");
});

router.get("/user/:id", secure.checkIfLogged, (req, res, next) => {
  const other = req.params.id;
  const user = req.user;

  User.findOne({ _id: other }).then(other => {
    res.render("users/user", { other, user });
  });
});

router.post("/user/:id/follow", secure.checkIfLogged, (req, res, next) => {
  const user = req.user;
  const other = req.params.id;


  User.findByIdAndUpdate(
    user._id,
    {
      $push: {
        friends: other
      }
    }
  )
    .then(res.redirect("/user/following"))
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
