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

var app = express();
swagger_setup(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var port = process.env.PORT || 10010;
app.listen(port);
