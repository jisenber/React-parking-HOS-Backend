'use strict';

// npm or node modules
let request = require('superagent');
let path = require('path');
let fs = require('fs');

// app modules
let Router = require('express').Router;
let Car = require('../model/cars.js');
let State = require('../model/states.js');

let router = module.exports = new Router();

//Gets all car data from Edmonds API and saves the makes into MongoDB
router.get('/db/loadmakes', (req, res) => {
  request.get(`https://api.edmunds.com/api/vehicle/v2/makes?view=basic&fmt=json&api_key=${process.env.EDMONDS_API_KEY}`)
  .end((err, response) => {
    if(err) {
      console.error(err);
      return false;
    }
    //create an array of objects with just their makes
    let carsArray = response.body.makes.map(function(ele) {
      return {make: ele.name, models: ele.models.map(function(model) {
        return model.niceName;
      })};
    });

    carsArray.forEach(function(car) {
      let newCar = new Car(car);
      newCar.save();
    });

    res.json({complete: true});
  });
});

router.get('/db/loadstates', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/states.json'), (err, states) => {
    if(err) {
      console.error(err);
    }
    let readableStates = JSON.parse(states);
    readableStates.forEach(function(state) {
      let newState = new State(state);
      newState.save();

    });
    res.json({complete: true});
  });
});
