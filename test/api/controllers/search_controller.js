'use strict';

// eslint-disable-next-line no-unused-vars
const should = require('should');
const request = require('supertest');
const express = require('express');
const swagger_setup = require('../../../swagger-setup');
const nock = require('nock');
const github_response = require('../helpers/github_response');

describe('controllers', function() {

  let app;

  before(() => {
    app = express();
    return swagger_setup(app);
  });

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
            const result = response.body;
            result.length.should.eql(1);
            result[0].id.should.eql(211666);
          });
      });

    });

  });

});
