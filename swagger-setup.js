'use strict';

let SwaggerExpress = require('swagger-express-mw');
module.exports = function(app) {
  var config = {
    appRoot: __dirname // required config
  };

  return new Promise(function(resolve, reject) {
    SwaggerExpress.create(config, function(err, swaggerExpress) {
      if (err) { reject(err); }
      // install middleware
      swaggerExpress.register(app);
      resolve(app);
    });
  });
}
