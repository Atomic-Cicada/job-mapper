'use strict';

let places = require('./apis/placesapi.js');
let Promise = require('bluebird');
let rp = require('request-promise');

module.exports = {
  indeedApiCall: (query, cb) => {
    return rp.get(query)
      .then((item) => {
        item = JSON.parse(item);
        // Build partial array of results from Indeed API Call
        let resultObj = {};
        resultObj.start = item.start;
        resultObj.results = item.results.map((job) => {
          let obj = {
            jobtitle: job.jobtitle,
            company: job.company,
            city: job.city,
            state: job.state,
            date: job.date,
            snippet: job.snippet,
            url: job.url,
            jobkey: job.jobkey,
            latitude: job.latitude,
            longitude: job.longitude,
          };
          return obj;
        });
        // Using the results from Indeed, make calls to Google Places API and update results array
        return Promise.map(resultObj.results, (item) => { return places.googlePlacesApiCall(item); })
          .then((result) => { return resultObj; });
      })
      .catch((err) => { console.log(err); });
  }
};
