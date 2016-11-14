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

  describe('POST request to /users route', () => {
    it('should return a 200 status code when user is successfully added to db', () => {
      rp.post('http://localhost:3000/users').then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  describe('POST request to /login route', () => {
    it('should return a 200 status code when a user signs in', () => {
      rp.post('http://localhost:3000/login').then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  describe('POST request to /getJobs route', () => {
    it('should return a 200 status code when a signed in users favorites list renders', () => {
      rp.post('http://localhost:3000/getJobs').then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  describe('POST request to /removeJob route', () => {
    it('should return a 200 status code when a user removes a job from favorites list', () => {
      rp.post('http://localhost:3000/removeJob').then((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });
});
