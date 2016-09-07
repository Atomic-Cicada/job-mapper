'use strict';

let indeed = require('./indeedApi.js');
let places = require('./placesApi.js');

var controller = require('./controller');

module.exports = function(app, express) {
  app.get('/indeed', function() {
    var test = controller.indeedApiCall();
    console.log(test);
  });

  app.get('/places', function(req, res) {
    res.send('places');
  });
};
