let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');

module.exports = {
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
        places.googlePlacesApiCall(obj);
      });
    });
  }
};