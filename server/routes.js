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

  app.post('/login', (req, res) => {
    userdbController.signIn(req, res);
  });

  app.post('/getJobs', (req, res) => {
    userdbController.getJobs(req, res);
  });

  // Add one job to the user's list of saved jobs
  app.post('/addJob', function(req, res) {
    userdbController.addJob(req, res);
  });

  // Removes one job from the user's list of saved jobs
  app.post('/removeJob', function(req, res) {
    userdbController.removeJob(req, res);
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('index');
    });
  });

  app.get('/', (req, res) => {
    res.render('index');
  });
};
