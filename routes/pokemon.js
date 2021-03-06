const express = require('express');
const router = express.Router();
const db = require('../models')
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(favorites=>{
    //console.log(favorites)
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
    //res.send(created)
    res.redirect('/pokemon')
    //res.render(created)
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

router.get('/delete/:idx' , (req, res)=>{
  console.log(req.params.idx, '<-------')
  db.pokemon.destroy({
    where: {id: req.params.idx}
  }).then(()=>{
    res.redirect('/pokemon')
  })
})









module.exports = router;

// router.delete('/:idx', (req, res)=>{
//   db.pokemon.findAll()
//   .then(favorites =>{
//     res.render('faves', {favorites: favorites})
//   })
//   //console.log('DELETE it', req.params.idx)
//  // res.send('Deleting pokemon', req.params.idx)
//  db.pokemon.destroy({
//    where: {
//      name: pokemon.name
//    }
//  }).then(numRowsDeleted=>{
//    console.log('deleted')
//  })
// })