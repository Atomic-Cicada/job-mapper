var express = require('express');

var app = express();

app.listen(3000, function() {
  console.log('this is working on 3000');
});

app.get('/', function(req, res) {
  res.send('this is a test');
});