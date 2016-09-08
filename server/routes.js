'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let path = require('path');

let controller = require('./controller');
let dbController = require('./database/dbcontroller');


module.exports = function(app, express) {

  app.post('/indeed', function(req, res) {
    dbController.retrieveAll(req, res);
  });

  app.get('/', function(req, res) {
    res.render('index');
  });
};
