const express = require("express");
const passport = require('passport');

const router = express.Router();

const User = require("../models/User");

const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

let transporter = require("../configs/nodemailer.config");
const ensureLogin = require("connect-ensure-login");
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const uploadCloud = require('../configs/cloudinary.config');



const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", upload.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email; 

  const gender = (req.body.gender)?req.body.gender: "";
  const city = (req.body.city)?req.body.city: "";
  const country = (req.body.country)?req.body.country: "";
  // const secure_url = (req.file && req.file.secure_url)?req.file.secure_url: ".images/userProfile/default.jpg";

  if (username === "" || password === "" || email === "") {
    res.render("auth/signup", { message: "Please, enter email, username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }
  
    User.findOne({ email }, "email", (err, user) => {
      if (user) {
        res.render("auth/signup", { message: "The email already exists" });
        return;
      }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let token = "";
    for (let i = 0; i < 25; i++) {
     token += characters[Math.floor(Math.random() * characters.length)];
    }

    const newUser = new User({
      email,
      username,
      password: hashPass,
      gender,
      city,
      country,
      // image: secure_url,
      status: "Pending confirmation",
      confirmationCode: token,
      friends: []
    });

    newUser.save()
    .then(() => {
      transporter
      .sendMail({
        from: "Reservoir Developers",
        to: email,
        subject: "Confirmation email",
        text: "Confirmation email",
        html: `<a href="/auth/confirm/${token}">Haz click para confirmar tu cuenta</a>`
      }).then(() => res.redirect("/ratemovie"))
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    });
  });
});
});

router.get("/confirm/:token", (req, res, next) => {
  const token = req.params.token;
  User.findOne({ confirmationCode: token })
  .then(
    User.update({ confirmationCode: token }, {
      $set: {
        status: 'Active'
        }
    })
    .then(res.render("auth/confirmation"))
  ).catch( (err) => console.log(err));
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/user/me",
    failureRedirect: "/auth/login" 
  })
);

module.exports = router;
