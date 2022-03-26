const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/Employee');
const appError = require('../utils/appError');

// PASSPORT CONFIG 
passport.use(
  new LocalStrategy(function (username, password, done) {
    Employee.findOne({ email: username }, function (err, user) {
      if (err) {
        return done(err, { message: 'some error' });
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user, { message: 'authorized' });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, user) {
    done(err, user);
  });
});
