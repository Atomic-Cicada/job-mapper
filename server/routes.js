'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let path = require('path');

var controller = require('./controller');

module.exports = function(app, express) {

  app.get('/indeed', controller.indeedApiCall);

  app.get('/', function(req, res) {
    res.render('index');
  });
};
