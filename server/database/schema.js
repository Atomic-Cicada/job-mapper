var mongoose = require('mongoose');

var markerSchema = mongoose.Schema({
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
 
var Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;