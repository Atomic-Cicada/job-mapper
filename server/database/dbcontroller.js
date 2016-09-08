'use strict';

var Job = require('./schema.js');
var controller = require('../controller.js');

module.exports = {
  retrieveAll: (req, res) => {
    Job.find().then((results) => {
      res.status(200).send(JSON.stringify(results));
    });
  }
};