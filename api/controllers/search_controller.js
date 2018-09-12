'use strict';

const request = require('request-promise-native');
const GITHUBSEARCHAPI = 'https://api.github.com/search/repositories';
const AUTHENTICATION = process.env.AUTHENTICATION;

module.exports = {
  search: search,
};

function search(req, res, next) {
  const text = req.swagger.params.text.value || '';
  const options = {
    url: GITHUBSEARCHAPI,
    qs: {
      q: text,
    },
    headers: {
      Authorization: `token ${AUTHENTICATION}`,
      'User-Agent': 'maomaoaichiyu',
    },
    json: true,
  };
  request.get(options)
    .then(results => results.items.map(result => ({
      id: result.id,
      name: result.name,
      url: result.html_url,
    })))
    .then(response => res.json(response))
    .catch(next);
}
