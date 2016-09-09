'use strict';

let mongoose = require('mongoose');
let mongoUri = 'mongodb://heroku_470vllxz:bgn7u3n14n2qhetcu27djj5d6h@ds027896.mlab.com:27896/heroku_470vllxz';
// let mongoUri = 'mongodb://localhost/jobmapper';

let db = mongoose.connect(mongoUri);

module.exports = db;
