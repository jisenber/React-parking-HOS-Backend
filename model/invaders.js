'use strict';

var mongoose = require('mongoose');

var invaderSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  img_url: {type: String},
  lic_plate: {type: String},
  lic_state: {type: String},
  make: {type: String, ref: 'cars'},
  model: {type: String, ref: 'cars'},
  shame: {type: Number, default: 0}
});




module.exports = mongoose.model('invaders', invaderSchema);
