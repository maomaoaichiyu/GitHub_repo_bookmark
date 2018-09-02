'use strict';

let express = require('express');
let swagger_setup = require('./swagger-setup');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var app = express();
swagger_setup(app);

var port = process.env.PORT || 10010;
app.listen(port);
