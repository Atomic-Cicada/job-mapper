'use strict'
let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');

module.exports = function(app, express) {
  app.get('/indeed', function(req, res) {
    var query = indeed.queryBuilder('java', 'austin', '0');
    indeed.indeedApiCall(query, function(item) {
      item.results.forEach(function(item) {
        var obj = {
          title: item.jobtitle,
          company: item.company,
          // snippet contains html elements
          // description: item.snippet,
          city: {
            name: item.city,
            lat: item.latitude,
            long: item.longitude
          },
          state: item.state

        };
        // call google places api from here
        places.googlePlacesApiCall(obj.company, obj.city.lat, obj.city.long);
      });
    });
  });

  app.get('/places', function(req, res) {
    var results = places.googlePlacesApiCall();
    res.send('places');
  });
};
