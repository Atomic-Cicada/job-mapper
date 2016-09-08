'use strict';

let mongoose = require('mongoose');
let mongoUri = 'mongodb://localhost/jobmapper';

let db = mongoose.connect(mongoUri);

module.exports = db;
