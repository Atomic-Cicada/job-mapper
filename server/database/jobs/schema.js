'use strict';

let mongoose = require('mongoose');

let jobSchema = mongoose.Schema({
  jobtitle: {type: String},
  company: {type: String},
  city: {type: String},
  state: {type: String},
  date: {type: Date},
  snippet: {type: String},
  url: {type: String},
  jobkey: {type: String, unique: true},
  latitude: {type: Number},
  longitude: {type: Number},
  results: {type: Object}
});

let Job = mongoose.model('Job', jobSchema);

module.exports = Job;