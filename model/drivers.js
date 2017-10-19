'use strict';

var mongoose = require('mongoose');

var driverSchema = mongoose.Schema({
  plateAndState: {type: String, unique: true},
  parkingInstances: [{type: mongoose.Schema.Types.ObjectId, ref: 'invaders'}]
});




module.exports = mongoose.model('drivers', driverSchema);
