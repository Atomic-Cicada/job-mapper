'use strict';

let User = require('./userschema.js');
var bcrypt = require('bcryptjs');



module.exports = {
  // retrieveAll: (req, res) => {
  //   User.find().then((results) => {
  //     res.status(200).send(JSON.stringify(results));
  //   });
  // }
  addOne: (req, res) => {
    //var salt = bcrypt.genSaltSync(10);
    //var hash = bcrypt.hashSync(req.body.currentPassword, salt);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.currentPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        var user = new User({
          username: req.body.currentUsername,
          password: hash,
          salt: salt
        });

        User.count({ username: req.body.currentUsername }, function (err, count) {
        // In other words, if the username is already taken
        // Count is faster than the find() function
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



  //     )
  //   .then ((results) => {
  //     console.log('calling findOne brooooo');
  //     res.status(200).send(JSON.stringify(results));
  //   });
  // },

  // addOne: (req, res) => {
  //   User.save({});
  // }
};