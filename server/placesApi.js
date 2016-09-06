'use strict'
var request = require('request');
var config = require('./config.js');

let API_KEY = config.GOOGLE_PLACES_API_KEY;
let exampleUrl = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=5000&type=museum&key=';

module.exports = {
  googlePlacesApiCall: function(url) {
    request(exampleUrl + API_KEY, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
      }
    });
  }
};