var mongoose = require('mongoose');

var markerSchema = mongoose.Schema({
  query: {type: String, unique: true},
  results: {type: Object}
});
 
var Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;