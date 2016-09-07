'use strict'
var request = require('request');
var config = require('./config.js');

let API_KEY = config.GOOGLE_PLACES_API_KEY;
let exampleUrl = 'https://maps.googleapis.com/maps/api/place/radarsearch/location=51.503186,-0.126446&radius=5000&type=museum&key=';

module.exports = {
  googlePlacesApiCall: function(name, lat, long) {
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=30.266483,-97.74176&radius=10000&name=General Motors&key=AIzaSyBQfJiSSF-msLtSPHcrmurfDYC4qYiG9Lo';
    request(url, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        console.log(data.results[0].vicinity);
      }
    });
  }
};
