"use strict";

/** Routes for cards. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Species = require("../models/species");

const router = new express.Router();

/** GET / =>
 *      { [
      {
        id: 1,
        pokedex_no: 1,
        name: 'Bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        type1: 'Grass',
        type2: 'Poison'
      },
      {
        id: 2,
        pokedex_no: 2,
        name: 'Ivysaur',
        url: 'https://pokeapi.co/api/v2/pokemon/2',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        type1: 'Grass',
        type2: 'Poison'
      },
      {
        id: 3,
        pokedex_no: 3,
        name: 'Venusaur',
        url: 'https://pokeapi.co/api/v2/pokemon/3',
        sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
        type1: 'Grass',
        type2: 'Poison'
      }, ... ]}
 * 
 * Authorization required: none
 */

router.get("/", async function(req, res, next) {
	try {
		const result = await Species.getAll();
		return res.json(result);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
