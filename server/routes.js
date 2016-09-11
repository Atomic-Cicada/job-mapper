'use strict';

let path = require('path');
let dbController = require('./database/jobs/dbcontroller');
let userdbController = require('./database/users/userdbcontroller');

module.exports = (app, express) => {
  app.post('/indeed', (req, res) => {
    dbController.retrieveAll(req, res); // Requests for data go to database
  });

  app.post('/users', (req, res) => {
    userdbController.addOne(req, res);
  });

  app.post('/login', function(req, res) {
    userdbController.signIn(req, res);
  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('index');
    });
  });

  app.get('/', (req, res) => {
    res.render('index');
  });
};
