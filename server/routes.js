'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');
let path = require('path');

let controller = require('./controller');
let dbController = require('./database/jobs/dbcontroller');
let userdbController = require('./database/users/userdbcontroller');


module.exports = (app, express) => {

  app.post('/indeed', (req, res) => {
    dbController.retrieveAll(req, res); // Requests for data go to database
  });

  app.post('/users', (req, res) => {
    userdbController.addOne(req, res); // See if this username is already taken or not
  });

  app.get('/', (req, res) => {
    res.render('index');
  });

};
