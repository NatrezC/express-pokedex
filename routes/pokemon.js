const express = require('express');
const router = express.Router();
const db = require('../models')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.render('pokemon/index.ejs')
  //res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({ //Now it doesn't duplicate
    where: {name: req.body.name},
    defaults: {name: req.body.name}
  })
  .then(([created, wasCreated])=>{
    res.send(created)
  })
  .catch(err =>{
    console.log('You got an error dummy: ', err)
  })
  // res.send(req.body);
});

module.exports = router;
