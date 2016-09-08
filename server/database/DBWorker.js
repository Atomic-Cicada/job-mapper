'use strict';

var controller = require('../controller.js');
var Marker = require('./schema.js');
var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/jobmapper';
let indeed = require('../indeedApi.js');
let whilst = require('async/whilst');

// Connect Mongoose to our local MongoDB via URI specified above and export it below
var db = mongoose.connect(mongoUri);

let startNumber = 0;
let cont = true;
let limit = 25;
let job = '';
let city = 'san%20francisco';


whilst(() => cont, (callback) => {
  let query = indeed.queryBuilder(job, city, limit.toString(), startNumber.toString());
  console.log(query);
  controller.indeedApiCall(query).then((result) => {
    if (startNumber > 1000) {
      cont = false;
    } else {
      result.forEach((item) => {
        Marker.findOne({jobkey: item.jobkey}).then((job) => {
          if (!job) {
            var newJob = new Marker({
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
      console.log(startNumber);
      setTimeout(() => callback(), 3000);
    }
  });
}, () => {
  console.log('done with while loop');
});