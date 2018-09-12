'use strict';

const store = require('../../store/bookmark_store');

module.exports = {
  bookmarkedAll: getAllBookmarked,
  bookmark: addBookmark,
  delete: deleteBookmark,
};

function getAllBookmarked(req, res) {
  store.getAllBookemarkedRepos()
    .then(repos => { res.json(repos); });
}

function addBookmark(req, res) {
  const id = req.swagger.params.id.value;
  const repo = req.swagger.params.repo.value;
  store.addRepoToStore(id, repo)
    .then(() => { res.sendStatus(204); });
}

function deleteBookmark(req, res) {
  const id = req.swagger.params.id.value;
  store.deleteRepoById(id)
    .then(() => { res.sendStatus(204); });
}
