var express = require('express');
var mongoose = require('mongoose');
var config = require('../config');
var request = require('request');

// create express app
var app = express();

// keep reference to config
app.config = config;

// setup mongoose
app.db = mongoose.createConnection(config.mongodb.uri);
app.db.on('error', console.error.bind(console, 'mongoose connection error: '));
app.db.once('open', function () {
});

// config data models
require('../models')(app, mongoose);

// http request
request
  ('http://api.openweathermap.org/data/2.5/weather?q=Taipei&APPID=2ab10d1d7c261f5cb373916cc1cf107f'
  , function(error, response, body) {
    console.log(body);
});
