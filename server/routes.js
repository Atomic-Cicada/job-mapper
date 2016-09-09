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

  app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = res.body.password;

    // upon a successfull login the user is simply redirected back to homepage. Would be cool if we had some sort of profile page
    if (username === 'test' && password === 'test') {
      req.session.regenerate(function() {
        req.session.user = username;
        res.redirect('index');
      });
    } else {
      res.redirect('index');
    }
  });


  app.get('/', (req, res) => {
    res.render('index');
  });

};
