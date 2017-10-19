'use strict';

var mongoose = require('mongoose');
//var createError = require('http-errors');

var stateSchema = mongoose.Schema({
  name: {type: String},
  abbreviation: {type: String}
});

module.exports = mongoose.model('states', stateSchema);
