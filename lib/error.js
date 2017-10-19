'use strict';

const createError = require('http-errors');

module.exports = function(err, req, res, next) {

  //write out the error in the console.
  if (err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  //mongo specific error
  if(err.name === 'MongoError') {
    err = createError(409, 'No Duplicates');
    res.status(err.status).send(err.name);
    next();
    return;
  }

  //Internal Server Error
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
