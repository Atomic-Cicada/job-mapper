'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');

var controller = require('./controller');

module.exports = function(app, express) {
  app.get('/indeed', controller.indeedApiCall);

  app.get('/places', function(req, res) {
    res.send('places');
  });
};
