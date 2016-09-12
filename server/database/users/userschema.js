'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  savedJobs: {type: Array},
  salt: { type: String }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
