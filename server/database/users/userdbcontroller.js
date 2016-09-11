'use strict';

let User = require('./userschema.js');
let bcrypt = require('bcryptjs');

module.exports = {

  addOne: (req, res) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.currentPassword, salt, function(err, hash) {
        // Creates a new hash and saves it in the user object in the db
        var user = new User({
          username: req.body.currentUsername,
          password: hash,
          salt: salt
        });
        console.log(req.body);
        User.count({ username: req.body.currentUsername }, function(err, count) {
          // First we check to see if the username is already taken
          // Count is faster than the find() function- there is no need to return the existing user from the db
          if (count > 0) {
            res.status(300)
              .send('Sorry username already taken!!');
          } else {
            user.save(function(err) {
              if (err) {
                return console.error('here is the error', err);
              }
            })
            .then((results) => {
              res.status(200)
                .send(JSON.stringify(results));
            });
          }
        });
      });
    });
  },

  signIn: (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.findOne({ username: username }, function(err, foundUser) {
      if (err) { return handleError(err); }
      if (foundUser) {
        // here we are comparing the password the user entered to what we have hashed in our db
        // 'test' will either return true or false depending on whether the entered password is matching up
        bcrypt.compare(password, foundUser.password, function(err, test) {
          console.log('looks like we found Mr. Kwan', test);
          if (test) {
            // Here we are creating a session.
            req.session.regenerate(function() {
              req.session.user = foundUser.username;
              res.redirect('/');
            });
          } else {
            res.status(305)
              .send('Sorry seems that is an incorrect password');
          }
        });
      } else {
        res.status(300)
          .send('Sorry that username does not exist');
      }
    });
  }

};
