'use strict';
// app modules
let Router = require('express').Router;
let Invader = require('../model/invaders.js');
let Driver = require('../model/drivers.js');
let State = require('../model/states.js');
let createError = require('http-errors');
let jsonParser = require('body-parser').json();
//let auth = require('./auth-routes')

// module constants
let router = module.exports = new Router();

//submits an invader to mongoDB
router.post('/submit', jsonParser, (req, res) => {
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
router.post('/shame', (req, res) => {
  console.log('hit shame, here is the id: ', req.query.invader);
  Invader.findOne({_id: req.query.invader})
    .then(invader => {
      invader.shame += 1;
      invader.save(function(err) {
        if (err) {
          console.log('error saving: ', err);
        }
        res.json(invader);
      });
    })
    .catch((err) => {
      console.error(err);
    });
});
