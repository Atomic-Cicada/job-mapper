'use strict';

let Job = require('./schema.js');
let controller = require('../../controller.js');

module.exports = {
  retrieveAll: (req, res) => {
    let searchString = req.body.job;
    var re = new RegExp(searchString, 'i');
    Job.find()
      .or([{ 'jobtitle': { $regex: re } }, { 'snippet': { $regex: re } }])
      .then((results) => {
        res.status(200)
          .send(JSON.stringify(results));
      });
  }
};
