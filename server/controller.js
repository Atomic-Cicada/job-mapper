'use strict';

let places = require('./placesApi.js');
let Promise = require('bluebird');
let rp = require('request-promise');

module.exports = {
  indeedApiCall: (query, cb) => {
    return rp.get(query).then((item) => {
      item = JSON.parse(item);
      // Build partial array of results from Indeed API Call
      let results = item.results.map((item) => {
        let obj = {
          jobtitle: item.jobtitle,
          company: item.company,
          city: item.city,
          state: item.state,
          date: item.date,
          snippet: item.snippet,
          url: item.url,
          jobkey: item.jobkey,
          latitude: item.latitude,
          longitude: item.longitude,
        };
        return obj;
      });
      // Using the results from Indeed, make calls to Google Places API and update results array
      return Promise.map(results, (item) => { return places.googlePlacesApiCall(item); })
      .then((result) => { return result; }); 
    })
    .catch((err) => { console.log(err); });
  }
};
