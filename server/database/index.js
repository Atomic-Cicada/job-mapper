'use strict';

let mongoose = require('mongoose');
// let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/jobmapper';
let mongoUri = 'mongodb://localhost/jobmapper';

let db = mongoose.connect(mongoUri);

module.exports = db;
