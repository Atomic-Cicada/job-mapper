var request = require('request');

let API_KEY = '';

request('https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=5000&type=museum&key=' + API_KEY, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body);
  }
});