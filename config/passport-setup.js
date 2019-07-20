const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");


// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
 // Our user will sign in using an email, rather than a "username"
 {
   usernameField: "email"
  //  passwordField: "password"
 },
 function(email, password, done) {
   // When a user tries to sign in this code runs
   db.User.findOne(
     {
       email: email
   }
   ).then(function(dbUser) {
     console.log("Inside passport-setup " + dbUser.email)
     // If there's no user with the given email
     if (!dbUser) {
       return done(null, false, {
         message: "Incorrect email."
       });
     }
     // If there is a user with the given email, but the password the user gives us is incorrect
     else if (!dbUser.validPassword(password)) {
       return done(null, false, {
         message: "Incorrect password."
       });
     }
     // If none of the above, return the user
     console.log("In Passport-setup " + dbUser.email)
     return done(null, dbUser);
   });
 }
));

// In order to help keep authentication state across HTTP requests,
// Passport needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
 done(null, user.id);
});

passport.deserializeUser(function(id, done) {
 db.User.findById(id, function(err, user) {
   done(err, user)
 })
});

// Exporting our configured passport
module.exports = passport;