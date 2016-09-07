'use strict';

var request = require('request');
var config = require('./config.js');

let API_KEY = config.GOOGLE_PLACES_API_KEY;

module.exports = {
  googlePlacesApiCall: function(obj) {
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + obj.city.lat + ',' + obj.city.long + '&radius=50000&name=' + obj.company + '&key=' + API_KEY;
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        data.results.forEach(function(item) {
          obj.address = item.vicinity;
          // FINAL OBJECT
          console.log(obj);
        });
      }
    });
  }
};
