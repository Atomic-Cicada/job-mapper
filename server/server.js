var express = require('express');
var request = require('request');
var indeed = require('./indeedApi');

var app = express();

require('./routes.js')(app, express);

app.listen(3000, function() {
  console.log('Connected on port 3000');
});

app.get('/', function(req, res) {
  res.send('INDEX PAGE');
});

module.exports = app;