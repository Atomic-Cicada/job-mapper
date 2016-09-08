'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let path = require('path');

var controller = require('./controller');
var dbController = require('./database/dbcontroller');


module.exports = function(app, express) {

  app.post('/indeed', function(req, res) {
    let query = indeed.queryBuilder(job, city, '0');
    controller.indeedApiCall(query, (results) => {
      res.send(result);
    });
  });

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.post('/api/markers', (req, res) => {
    dbController.add(req, res);
  });
};
