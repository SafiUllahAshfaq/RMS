'use strict';

const mongoose = require('mongoose');
const environment = require('../environment');

const mongo = mongoose.connect(
  environment.mongodburl,
  environment.mongodbConfig
);

module.exports = mongo;
