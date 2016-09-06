'use strict'
let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');

module.exports = function(app, express) {
  app.get('/indeed', function(req, res) {
    var query = indeed.queryBuilder('java', 'austin', '0');
    var results = indeed.indeedApiCall(query);
    res.send(results);
  });

  app.get('/places', function(req, res) {
    var results = places.googlePlacesApiCall();
    res.send(results);
  });
};