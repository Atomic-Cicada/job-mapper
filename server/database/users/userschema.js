'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  salt: { type: String }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
