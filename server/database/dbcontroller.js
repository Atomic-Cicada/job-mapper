'use strict';

var Marker = require('./schema.js');
var controller = require('../controller.js');

module.exports = {
  add: function(req, res) {
    var queryString = req.body.query;
    Marker.find({query: queryString}).then(function(markers) {
      if (markers.length > 0) {
        res.status(200).send(JSON.stringify(markers));
      } else {
        controller.indeedApiCall((req, res, APIResults) => {
          var marker = new Marker({query: queryString, results: APIResults});
          marker.save();
          res.sendStatus(200);
        });
      }
    });
  },
  retrieveAll: (req, res) => {
    Marker.find().then((results) => {
      res.status(200).send(JSON.stringify(results));
    });
  }
};