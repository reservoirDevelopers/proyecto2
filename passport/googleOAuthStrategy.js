const passport      = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User          = require('../models/User');
require('dotenv').config();

passport.use(
  new GoogleStrategy({
    clientID: `${process.env.GOOGLE_ID}`,
    clientSecret: `${process.env.GOOGLE_SECRET}`,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id})
    .then(user => {
      if(user) {
        done(nulle, user);
        return
      }
      User.create({googleID: profile.id, username: profile.email})
      .then(newUser => {
        done(null, newUser)
      })
      .catch(err => done(err))
    })
    .catch(err => done(err))
  }
  )
  
)