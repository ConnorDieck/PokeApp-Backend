"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { setPokemonBase } = require("../helpers/transform");

/** Related functions for pokemon */

class Pokemon {
	constructor(id, pokemonId, name, gender, type1, type2) {
		(this.id = id),
			(this.pokemonId = pokemonId),
			(this.name = name),
			(this.gender = gender),
			(this.type1 = type1),
			(this.type2 = type2);
	}
}
