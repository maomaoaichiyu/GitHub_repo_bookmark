'use strict';

let bookmarked_repos = [];
module.exports = {
  reset: function() {
    bookmarked_repos = [];
    return Promise.resolve();
  },
  getAllBookemarkedRepos: function() {
    let repos_array = [];
    Object.keys(bookmarked_repos).forEach(repoId => {
      repos_array.push({
        id: repoId,
        repo: bookmarked_repos[repoId],
      });
    });
    return Promise.resolve(repos_array);
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
