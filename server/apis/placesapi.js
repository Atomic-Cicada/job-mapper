'use strict';

let request = require('request');
let rp = require('request-promise');

let API_KEY = process.env.GOOGLE_PLACES_API_KEY;

module.exports = {
  googlePlacesApiCall: (obj) => {
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + obj.city.lat + ',' + obj.city.long + '&radius=5000&name=' + obj.company + '&key=' + API_KEY;

    return rp(url)
      .then((item) => {
        let data = JSON.parse(item);
        if (data.results[0] !== undefined) {
          obj.address = data.results[0].vicinity;
          obj.city.lat = data.results[0].geometry.location.lat;
          obj.city.long = data.results[0].geometry.location.lng;
        }
        return obj;
      });
  }
};
