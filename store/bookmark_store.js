'use strict';

let bookmarked_repos = {};
module.exports = {
  reset: function() {
    bookmarked_repos = {};
    return Promise.resolve();
  },
  getAllBookemarkedRepos: function() {
    return Promise.resolve(Object.values(bookmarked_repos));
  },
  addRepoToStore: function(id, repo) {
    let repo_id = id;
    bookmarked_repos[repo_id] = repo;
    return Promise.resolve();
  },
  deleteRepoById: function(repoId) {
    delete bookmarked_repos[repoId];
    return Promise.resolve();
  },
};
