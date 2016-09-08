'use strict'
let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let Promise = require('bluebird');

module.exports = {
  indeedApiCall: function(req, res) {
    console.log('inside the def of indeedAPICall: ', req);
    let query = indeed.queryBuilder(req.body.job, req.body.city, '0');
    indeed.indeedApiCall(query, function(item) {
      let results = item.results.map(function(item) {
        let obj = {
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
        res.send(result);
      });
    });
  }
};