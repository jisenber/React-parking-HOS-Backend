var mongoose = require('mongoose');

var invaderSchema = mongoose.Schema({
  date: {type: Date, default: new Date().toTimeString()},
  img_url: {type: String},
  lic_plate: {type: String},
  lic_state: {type: String},
  make: {type: String, ref: 'cars'},
  model: {type: String, ref: 'cars'},
  shame: {type: Number, default: 0},
  posted_by: {type: String, ref: 'users'}
});




module.exports = mongoose.model('invaders', invaderSchema);
