'use strict';

const expect = require('chai').expect;
const rp = require('request-promise');

describe('API calls', () => {
  describe('POST request to /indeed route', () => {
    it('should return a 200 status code', () => {
      rp.post('http://localhost:3000/indeed').then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });
});
