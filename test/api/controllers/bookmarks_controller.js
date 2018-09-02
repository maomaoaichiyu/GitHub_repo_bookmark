let should = require('should');
let request = require('supertest');
let express = require('express');
let swagger_setup = require('../../../swagger-setup');
let nock = require('nock');
let github_response = require('../helpers/github_response');
let store = require('../../../store/bookmark_store')

describe('controller', function() {

  let app = undefined;

  before(() => {
    app = express();
    return swagger_setup(app);
  })
  
  describe('bookmarks_controller', function() {
    
    describe('GET /repos', function() {

      beforeEach(() => store.reset())
      
      it('should return empty array by default', function() {
        return request(app)
          .get('/repos')
          .query({})
          .set('Accept', 'application/json')
          .expect(200)
          .then(response => {
            let result = response.body;
            result.length.should.eql(0);
          });
      });
      
      it('should return all the bookmarked repos', function() {
        let repo0 = {'id': '0', 'name': 'test0', 'url': 'url0'};
        let repo1 = {'id': '1', 'name': 'test1', 'url': 'url1'};
        let application = request(app);
        return application
          .put(`/repos/${repo0.id}`)
          .send(repo0)
          .then(() => {
            return application
              .put(`/repos/${repo1.id}`)
              .send(repo1)
          })
          .then(() => {
            return application
              .get('/repos')
              .query({})
              .set('Accept', 'application/json')
              .expect(200)
              .then(response => {
                let result = response.body;
                result.length.should.eql(2);
              });
          });
      });
    });

    describe('PUT /repos', function() {

      beforeEach(() => store.reset())
      
      it('should add the repo', function() {
        let repo0 = {'id': '0', 'name': 'test0', 'url': 'url0'};
        return request(app)
          .put(`/repos/${repo0.id}`)
          .send(repo0)
          .then(() => {
            return request(app)
              .get('/repos')
              .query({})
              .set('Accept', 'application/json')
              .expect(200)
              .then(response => {
                let result = response.body;
                result.length.should.eql(1);
                result[0].id.should.eql('0');
              });
          });
      });
    });

    describe('DELETE /repos', function() {

      beforeEach(() => store.reset())

      it('should delete the repo', function() {
        let repo0 = {'id': '0', 'name': 'test0', 'url': 'url0'};
        return request(app)
          .put(`/repos/${repo0.id}`)
          .send(repo0)
          .then(() => {
            return request(app)
              .get('/repos')
              .query({})
              .set('Accept', 'application/json')
              .expect(200)
              .then(response => {
                let result = response.body;
                result.length.should.eql(1);
                result[0].id.should.eql('0');
              });
          })
          .then(() => {
            return request(app)
            .delete('/repos/0')
            .query({})
            .set('Accept', 'application/json')
            .expect(200)
            .then(() => {
              return request(app)
                .get('/repos')
                .query({})
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                  let result = response.body;
                  result.length.should.eql(0);
                });
            })
          });
      });
    });

  });
});