'use strict';

var mongoose = require('mongoose');
var createError = require('http-errors');

var carSchema = mongoose.Schema({
  make: {type: String, unique: true},
  models: [{type: String}]
});

module.exports = mongoose.model('cars', carSchema);
