'use strict';

// app modules
let Router = require('express').Router;
let Car = require('../model/cars.js');

let router = module.exports = new Router();

//get array of car makes to be called on page load. used for populating "make" drop-down
router.get('/cars', (req, res) => {

  let carMakeArray = [];
  Car.find({})
    .then(cars => {
      cars.forEach(function(car) {
        carMakeArray.push(car);
      });
    })
    .then(() => {
      res.send(carMakeArray);
    })
    .catch(err => {
      console.log(err);
      return false;
    });
});




//returns an array of models for a given make. used for populating "model" drop-down based off a selected make
//start the server, load your DB, then in a separate tab: curl http://localhost:3000/cars/Toyota
router.get('/cars/:make', (req, res, next) => {
  Car.findOne({make: req.params.make})
    .then((car) => {
      res.json(car);
    })
    .catch(next);
});
