// NOTE: http://passportjs.org/docs/

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ 'userInfo.email': username }, function (err, user) {
      if (err) { return done(err); }

      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }

      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }

      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

//
//
// // --------------------------------------------------------------------------------
// // NOTE: /api/login (POST) – to handle returning users logging in
// router.post('/auth/login', function(req, res) {
//
//   passport.authenticate('local', function(err, user, info){
//     var token;
//     console.log("passport user variable: ", user);
//     // If Passport throws/catches an error
//     if (err) {
//       console.log("err in Hurrrrr");
//       res.status(404).json(err);
//       return;
//     }
//
//     // If a user is found
//     if (user) {
//       token = user.generateJwt();
//       res.status(200);
//       res.json({
//         "token" : token
//       });
//     } else {
//       // If user is not found
//       res.status(401).json(info);
//     }
//   });
//
// });




/*
Passport throw catches
1) An internal error occurred trying to fetch the users' information (say the database connection is gone); this error would be passed on: next(err); this will be handled by Express and generate an HTTP 500 response;
2) The provided credentials are invalid (there is no user with the supplied e-mail address, or the password is a mismatch); in that case, you don't generate an error, but you pass a false as the user object: next(null, false); this will trigger the failureRedirect (if you don't define one, a HTTP 401 Unauthorized response will be generated);
3) Everything checks out, you have a valid user object, so you pass it along: next(null, user); this will trigger the successRedirect;
*/
