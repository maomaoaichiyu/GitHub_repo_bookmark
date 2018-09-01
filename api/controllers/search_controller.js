'use strict';

let request = require('request-promise-native');
const GITHUBSEARCHAPI = `https://api.github.com/search/repositories`;
const AUTHENTICATION = process.env.AUTHENTICATION;
let util = require('util');

module.exports = {
  search: search
};

function search(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  let text = req.swagger.params.text.value || '';
  let options = {
    url: GITHUBSEARCHAPI,
    qs: {
      q: text
    },
    headers: {
      'Authorization': `token ${AUTHENTICATION}`,
      'User-Agent': 'maomaoaichiyu'
    },
    json: true 
  };
  request.get(options)
    .then(results => results.items.map(result => ({
      id: result.id,
      name: result.name,
      url: result.html_url
    })))
    .then(response => res.json(response));
}
