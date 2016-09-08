'use strict';

var Marker = require('./schema.js');
var indeedApiCall = require('../controller.js');

exports.add = function(req, res) {
  console.log('in add function');
  var queryString = req.body;
  Marker.find({query: queryString}).then(function(err, markers) {
    console.log('find then');
    console.log(markers);
    if (markers) {
      console.log('found something');
      res.status(200).send(JSON.stringify(markers));
    } else {
      console.log('no marker length');
      indeedApiCall((APIResults) => {
        console.log('in calback');
        var marker = new Marker({query: queryString, results: APIResults});
        marker.save();
        res.sendStatus(200);
      });
    }
  });
};