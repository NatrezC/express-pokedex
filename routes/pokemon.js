const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(favorites=>{
    res.render('pokemon/index', {faves: favorites})
  }).catch(err=>{
    console.log('you got another err', err)
  })
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

router.get('/:idx', (req, res)=>{
  db.pokemon.findOne({
    where: {id: req.params.idx}
  }).then(found =>{
    const pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${found.name}`
    axios.get(pokemonUrl)
    .then(response =>{
      //res.send(response.data)
      res.render('pokemon/show',{pokemon: response.data})
    }).catch(err=>{
      console.log('url err:------>', err)
    })
  }).catch(err=>{
    console.log('Something wrong with your id route dummy', err)
  })
})

module.exports = router;
