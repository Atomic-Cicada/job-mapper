// Background worker to pull down API results into DB
'use strict';

const controller = require('../../controller.js');
const Job = require('./schema.js');
const mongoose = require('mongoose');
const indeed = require('../../indeedApi.js');
const whilst = require('async/whilst');
const each = require('async/each');

const mongoUri = 'mongodb://localhost/jobmapper';
const db = mongoose.connect(mongoUri);

// Query variables
const limit = 25;
const city = 'san francisco';
const listOfJobsToPull = ['', 'javascript', 'software engineer', 'back end', 'front end'];
const timeToWaitBetweenCalls = 1000;
const startingNumber = 0;


let cont = true;

var pullData = (jobQueryString, cb) => {
  let startNumber = startingNumber;
  whilst( // Async while loop
  // Indeed limits number of results to 1000
  () => startNumber <= 1000, // This is the test it does to see if it ends the while loop
  (callback) => {
    // Build Indeed API query
    let query = indeed.queryBuilder(jobQueryString, city, limit.toString(), startNumber.toString());
    console.log('Indeed API Query: ', query);
    controller.indeedApiCall(query).then((result) => { // Make call to Indeed API
      if (result) {
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
      }
      startNumber += limit; // Increment startNumber to get next page of results
      console.log('Current startNumber for pagination: ', startNumber);
      setTimeout(() => callback(), timeToWaitBetweenCalls); // this callback indicates end of one while loop
    });
  }, (err) => {
    // Executes this function when whilst loop is done
    if (err) {
      console.log(err);
    }
    console.log('done with while loop');
    cb(); // this signals end of iteration in each loop
  }
);
};

// Loop over list of queries
each(listOfJobsToPull, (job, callback)=> {
  pullData(job, callback);
});