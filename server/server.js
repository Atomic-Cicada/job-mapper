'use strict';

let express = require('express');
let request = require('request');
let path = require('path');
let parser = require('body-parser');
let db = require('./database/index.js');

let app = express();

app.use(parser.json());

app.use(express.static(path.join(__dirname + '/../client/public')));

require('./routes.js')(app, express);
console.log(process.env.PORT);
console.log(process.env.GOOGLE_MAPS_API_KEY);
console.log(process.env.GOOGLE_PLACES_API_KEY);
console.log(process.env.INDEED_PUBLISHER_ID);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Connected on port 3000');
});

module.exports = app;
