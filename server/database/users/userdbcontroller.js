'use strict';

let User = require('./userschema.js');
var bcrypt = require('bcryptjs');



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

        User.count({ username: req.body.currentUsername }, function (err, count) {
          // First we check to see if the username is already taken
          // Count is faster than the find() function- there is no need to return the existing user from the db
          if (count > 0) {
            res.status(300).send('Sorry username already taken!!');
          } else {
            user.save(function(err) {
              if (err) {
                return console.error('here is the error', err);
              }
            }).then((results) => {
              res.status(200).send(JSON.stringify(results));
            });
          }
        });
      });
    });

  }
};