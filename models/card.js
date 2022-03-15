"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { setPokemonBase } = require("../helpers/transform");

/** Related functions for pokemon */

class Card {
	constructor(id, nickname, gender, nature, ability, art, species, item) {
		(this.id = id),
			(this.nickname = nickname),
			(this.gender = gender),
			(this.nature = nature),
			(this.ability = ability),
			(this.art = art),
			(this.species = species),
			(this.item = item);
	}

	// Gets all cards built by given user
	async getAll(userId) {
		const cardsRes = await db.query(
			`SELECT id,
						nickname,
						gender,
						nature,
						ability,
						art,
						species,
						item
				FROM cards c
					LEFT JOIN users_cards AS uc ON c.id = uc.card_id
					LEFT JOIN users AS u ON uc.user_id = u.id
				WHERE uc.id = $1`,
			[ userId ]
		);
	}
}
