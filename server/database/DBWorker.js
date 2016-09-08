'use strict';

let controller = require('../controller.js');
let Job = require('./schema.js');
let mongoose = require('mongoose');
let indeed = require('../indeedApi.js');
let whilst = require('async/whilst');

let mongoUri = 'mongodb://localhost/jobmapper';
let db = mongoose.connect(mongoUri);

let startNumber = 0;
let cont = true;
let limit = 25;
let job = '';
let city = 'san%20francisco';

whilst(
  () => startNumber <= 1000,
  (callback) => {
    let query = indeed.queryBuilder(job, city, limit.toString(), startNumber.toString());
    console.log('Indeed API Query: ', query);
    controller.indeedApiCall(query).then((result) => {
      console.log(result);
      result.forEach((item) => {
        Job.findOne({jobkey: item.jobkey}).then((job) => {
          if (!job) {
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
      startNumber += limit;
      console.log('Current startNumber for pagination: ', startNumber);
      setTimeout(() => callback(), 3000);
    });
  }, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('done with while loop');
  }
);