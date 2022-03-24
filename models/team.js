"use strict";

const db = require("../db");
const Card = require("./card");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pokemon team builds */

class Team {
	/** Gets all teams built by given user */
	static async getAll(username) {
		const teamsRes = await db.query(
			`SELECT id, name, username
				FROM teams 
				WHERE username = $1`,
			[ username ]
		);

		if (!teamsRes.rows[0]) throw new NotFoundError("No Pokemon built yet");

		return teamsRes.rows;
	}

	/** Returns details of one card given card's id */
	static async get(cardId) {
		const res = await db.query(
			`SELECT id, nickname, art, username, gender, nature_id AS "natureId", ability_id AS "abilityId", art, species_id AS "speciesId", item_id AS "itemId"
			 FROM cards
			 WHERE id = $1`,
			[ cardId ]
		);

		if (!res.rows[0]) throw new NotFoundError(`No card with given id: ${cardId}`);

		const cardRes = res.rows[0];

		/** Get associated moves and add to returned card object */
		const moveIds = await Move.getAllFromCard(cardId);

		const card = {
			...cardRes,
			moveIds
		};

		return card;
	}
}

module.exports = Team;
