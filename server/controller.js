let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
var Promise = require('bluebird');

module.exports = {
  makeArray: function(item) {
    var results = [];
  },

  indeedApiCall: function() {
    var query = indeed.queryBuilder('java', 'austin', '0');
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
      // var complete = [];
      // for (var i = 0; i < results.length; i++) {
      //   complete.push(places.googlePlacesApiCall(results[i]));
      // }
      // console.log(complete, 'complete');
      var updatedResults = [];
      return Promise.map(results, function(item) {
        places.googlePlacesApiCall(item, function(item) {
          updatedResults.push(item);
        });
      }).then(function() {
        console.log('done');
      });
    });
  }
};