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

app.listen(3000, () => {
  console.log('Connected on port 3000');
});

module.exports = app;


// AUTHENTICATION
// Still needed:
// - login component
// - profile component

var session = require('express-session');

var restrict = function(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    //route user to login view
    console.log('you are being redirected to login');
    res.redirect(301, '/login');
  }
};


// ROUTES
// A user can only access his profile if he is logged in.
app.get('/profile', restrict,
  function(req, res) {
    res.render('index');
  });

// Signup
app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

