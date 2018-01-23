'use strict';
// app modules
let Router = require('express').Router;
let Invader = require('../model/invaders.js');
let Driver = require('../model/drivers.js');
let State = require('../model/states.js');
let createError = require('http-errors');
let jsonParser = require('body-parser').json();

// module constants
let router = module.exports = new Router();

//submits an invader to mongoDB
router.post('/submit', jsonParser, (req, res) => {
//  if (req.isAuthenticated()) {
  new Invader(req.body).save()
    .then(invader => {
      let pltAndState = invader.lic_plate.concat(invader.lic_state);
      let query = {plateAndState: pltAndState};
      Driver.findOneAndUpdate(query,
        { '$push': { 'parkingInstances': invader._id } },
        {upsert:true}, function(err, doc) {
          if (err) return res.send(500, { error: err });
          res.json(doc);
        });
    })
    .catch(err => {
      console.log(err);
    });
  // } else {
  //   next(createError(401, 'not authorized'));
  // }
});

//renders all the invaders in the database
router.get('/invaders', (req, res) => {
  Invader.find({})
    .then(invaders => {
      res.json(invaders);
    })
    .catch(err => {
      console.log(err);
    });
});

//populates dropdown menu of states on the invader post module
router.get('/states', (req, res) => {
  State.find({})
    .then(states => {
      res.json(states);
    })
    .catch(err => {
      console.log(err);
    });
});

//allows for shaming count on each invader to persist
router.post('/shame/:id', (req, res) => {
  Invader.findOne({_id: req.params.id})
    .then(invader => {
      invader.shame += 1;
      invader.save();
      res.json(invader.shame);
    })
    .catch((err) => {
      console.error(err);
    });
});
