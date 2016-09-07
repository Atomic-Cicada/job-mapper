let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
var Promise = require('bluebird');

module.exports = {
  indeedApiCall: function() {
    var query = indeed.queryBuilder('javascript', 'san francisco', '0');
    indeed.indeedApiCall(query, function(item) {
      var results = item.results.map(function(item) {
        var obj = {
          title: item.jobtitle,
          company: item.company,
          city: {
            name: item.city,
            lat: item.latitude,
            long: item.longitude
          },
          state: item.state,
        };
        return obj;
      });

      Promise.map(results, function(item) {
        return places.googlePlacesApiCall(item);
      }).then(function(result) {
        console.log(result);
        console.log('DONE');
      });
    });
  }
};