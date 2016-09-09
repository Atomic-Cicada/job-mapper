// Background worker to pull down API results into DB

'use strict';

let controller = require('../controller.js');
let Job = require('./schema.js');
let mongoose = require('mongoose');
let indeed = require('../indeedApi.js');
let whilst = require('async/whilst');

let mongoUri = 'mongodb://localhost/jobmapper';
let db = mongoose.connect(mongoUri);


// Query variables
let startNumber = 0;
let cont = true;
let limit = 25;
let job = '';
let city = 'san%20francisco';

// Async while loop
whilst(
  // Indeed limits number of results to 1000
  () => startNumber <= 1000, // This is the test it does to see if it ends the while loop
  (callback) => {
    // Build Indeed API query
    let query = indeed.queryBuilder(job, city, limit.toString(), startNumber.toString());
    console.log('Indeed API Query: ', query);
    controller.indeedApiCall(query).then((result) => { // Make call to Indeed API
      result.forEach((item) => {
        Job.findOne({jobkey: item.jobkey}).then((job) => {
          if (!job) { // Check to see if jobkey doesn't already exist in DB
            let newJob = new Job({
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
              results: item.results
            });
            newJob.save();
          }
        });
      });
      startNumber += limit; // Increment startNumber to get next page of results
      console.log('Current startNumber for pagination: ', startNumber);
      setTimeout(() => callback(), 3000);
    });
  }, (err) => {
    // Executes this function when whilst loop is done
    if (err) {
      console.log(err);
    }
    console.log('done with while loop');
  }
);