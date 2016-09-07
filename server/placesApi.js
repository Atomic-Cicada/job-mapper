'use strict';

var request = require('request');
var config = require('./config.js');
var Promise = require('bluebird');

let API_KEY = config.GOOGLE_PLACES_API_KEY;

module.exports = {
  googlePlacesApiCall: function(obj, cb) {
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + obj.city.lat + ',' + obj.city.long + '&radius=5000&name=' + obj.company + '&key=' + API_KEY;

    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        if (data.results[0] !== undefined) {
          obj.address = data.results[0].vicinity;
          obj.city.lat = data.results[0].geometry.location.lat;
          obj.city.long = data.results[0].geometry.location.lng;
          // FINAL OBJECT
          // maybe google places take
          cb(obj);
        }
      }
    });
  }
};
