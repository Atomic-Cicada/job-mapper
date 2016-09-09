'use strict';

let User = require('./userschema.js');

module.exports = {
  // retrieveAll: (req, res) => {
  //   User.find().then((results) => {
  //     res.status(200).send(JSON.stringify(results));
  //   });
  // }
  findOne: (req, res) => {
    User.find({ username: req.body.username })
    .then ((results) => {
      res.status(200).send(JSON.stringify(results));
    });
  },

  // addOne: (req, res) => {
  //   User.save({});
  // }

};