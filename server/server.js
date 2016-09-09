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
// - signup component

var session = require('express-session');

var restrict = function(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    //route user to homepage if they are not logged in
    console.log('you are being redirected to homepage to login');
    res.redirect(301, 'index');
  }
};


// Signup
app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

