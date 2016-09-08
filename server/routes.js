'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let path = require('path');

var indeedApiCall = require('./controller');
var dbController = require('./database/dbcontroller');


module.exports = function(app, express) {

  app.post('/indeed', function(req, res) {
    controller.indeedApiCall(req, res);
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.post('/api/markers', (req, res) => {
    console.log('found correct route');
    dbController.add(req, res);
  });
};
