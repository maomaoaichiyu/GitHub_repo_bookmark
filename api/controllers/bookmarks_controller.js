'use strict';

let request = require('request-promise-native');
let store = require('../../store/bookmark_store');
const GITHUBSEARCHAPI = `https://api.github.com/search/repositories`;

module.exports = {
  bookmarkedAll: getAllBookmarked,
  bookmark: addBookmark,
  delete: deleteBookmark
};

function getAllBookmarked(req, res) {
  store.getAllBookemarkedRepos()
    .then(repos => {res.json(repos);});
}

function addBookmark(req, res) {
  let id = req.swagger.params.id.value;
  let repo = req.swagger.params.repo.value;
  store.addRepoToStore(id, repo)
    .then(() => {res.send();});
}

function deleteBookmark(req, res) {
  let id = req.swagger.params.id.value;
  store.deleteRepoById(id)
    .then(() => {res.send();});
}
