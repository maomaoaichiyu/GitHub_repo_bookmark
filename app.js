'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let express = require('express');
let swagger_setup = require('./swagger-setup');
let swaggerUi = require('swagger-ui-express');
let yaml = require('yamljs');
let swaggerDocument = yaml.load('./api/swagger/swagger.yaml');
swaggerDocument.host = process.env.SERVER_URL || swaggerDocument.host;

let app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
swagger_setup(app).then(() => {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({errorMessage: err.message || 'Unknown error'});
  });
});

let port = process.env.PORT || 10010;
app.listen(port);
