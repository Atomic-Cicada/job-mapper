'use strict';

let mongoose = require('mongoose');
let mongoUri = 'mongodb://localhost/jobmapper';

// Connect Mongoose to our local MongoDB via URI specified above and export it below
let db = mongoose.connect(mongoUri);

module.exports = db;
