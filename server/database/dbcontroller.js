'use strict';

let Job = require('./schema.js');
let controller = require('../controller.js');

module.exports = {
  retrieveAll: (req, res) => {
    Job.find().then((results) => {
      res.status(200).send(JSON.stringify(results));
    });
  }
};