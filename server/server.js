'use strict';

let express = require('express');
let request = require('request');
let path = require('path');

let app = express();

app.use(express.static(path.join(__dirname + '/../client/public')));

require('./routes.js')(app, express);

app.listen(3000, function() {
  console.log('Connected on port 3000');
});

module.exports = app;
