'use strict';

let express = require('express');
let request = require('request');
let path = require('path');

let app = express();

require('./routes.js')(app, express);

app.listen(3000, function() {
  console.log('Connected on port 3000');
});

app.use(express.static(path.join(__dirname + '/../client/public')));

app.get('/', function(req, res) {
  res.render('index');
});

module.exports = app;
