let should = require('should');
let request = require('supertest');
let express = require('express');
let swagger_setup = require('../../../swagger-setup');
let nock = require('nock');
let github_response = require('../helpers/github_response')

describe('controllers', function() {

  let app = undefined;

  before(() => {
    app = express();
    return swagger_setup(app);
  })

  describe('search_controller', function() {

    describe('GET /search', function() {

      it('should return a list of projects', function() {
        nock('https://api.github.com')
          .get('/search/repositories')
          .query(true)
          .reply(200, github_response);

        return request(app)
          .get('/search')
          .query({text: 'somethingmeaningful'})
          .set('Accept', 'application/json')
          .expect(200)
          .then(response => {
              let result = response.body;
              result.length.should.eql(1);
              result[0].id.should.eql(211666);
          });
      });

    });

  });

});
