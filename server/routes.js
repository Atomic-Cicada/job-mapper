'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let path = require('path');

let controller = require('./controller');
let dbController = require('./database/jobs/dbcontroller');


module.exports = (app, express) => {

  app.post('/indeed', (req, res) => {
    dbController.retrieveAll(req, res); // Requests for data go to database
  });

  app.get('/', (req, res) => {
    res.render('index');
  });
};
