'use strict';

let request = require('request-promise-native');
const GITHUBSEARCHAPI = `https://api.github.com/search/repositories`;
let util = require('util');

module.exports = {
  bookmarkedAll: getAllBookmarked,
  bookmark: addBookmark,
  delete: deleteBookmark
};

function getAllBookmarked(req, res) {
  res.json([]);
}

function addBookmark(req, res) {
  res.send();
}

function deleteBookmark(req, res) {
  res.send();
}
