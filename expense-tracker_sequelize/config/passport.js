// config/passport.js
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2')
const GitHubStrategy = require('passport-github')
const bcrypt = require('bcryptjs')

// load model
const db = require('../models')
const User = db.User

module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "That email is not registered." })
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
              return done(null, user)
            } else {
              return done(null, false, { message: "Email or Password is incorrect." })
            }
          })
          /*if (user.password != password) {
            return done(null, false, { message: "Email or password is not correct." })
          }
          return done(null, user)*/
        })
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ where: { email: profile._json.email } })
        .then(user => {
          if (!user) {
            var randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                var newUser = new User({
                  userName: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
            })
          } else {
            return done(null, user)
          }
        })
    })
  )

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ where: { email: profile._json.email } })
        .then(user => {
          if (!user) {
            var randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                var newUser = new User({
                  userName: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
            })
          } else {
            return done(null, user)
          }
        })
    })
  )

  passport.use(
    new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK
    }, (accessToken, refreshToken, profile, done) => {
      User.findOne({ where: { email: profile._json.email } })
        .then(user => {
          if (!user) {
            var randomPassword = Math.random().toString(36).slice(-8)
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                var newUser = new User({
                  userName: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
            })
          } else {
            return done(null, user)
          }
        })
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}