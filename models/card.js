"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { setPokemonBase } = require("../helpers/transform");

/** Related functions for pokemon builds */

class Card {
	// constructor(id, nickname, gender, nature, ability, art, species, item) {
	// 	(this.id = id),
	// 		(this.nickname = nickname),
	// 		(this.gender = gender),
	// 		(this.nature = nature),
	// 		(this.ability = ability),
	// 		(this.art = art),
	// 		(this.species = species),
	// 		(this.item = item);
	// }

	// Gets all cards built by given user
	static async getAll(userId) {
		const cardsRes = await db.query(
			`SELECT c.id,
						c.nickname,
						c.gender,
						c.nature,
						c.ability,
						c.art,
						c.species_id AS "speciesID",
						c.item
				FROM cards c
					LEFT JOIN users_cards AS uc ON c.id = uc.card_id
					LEFT JOIN users AS u ON uc.user_id = u.id
				WHERE uc.id = $1`,
			[ userId ]
		);

		if (!cardsRes.rows[0]) throw new NotFoundError("No Pokemon built yet");

		return cardsRes.rows;
	}

	// Saves a new card to the database
	static async save(cardData, userId) {
		const duplicateCheck = await db.query(
			`SELECT nickname
			 FROM cards c
			 	LEFT JOIN users_cards AS uc ON c.id = uc.card_id
			 WHERE nickname = $1 AND uc.user_id = $2`,
			[ cardData.nickname, userId ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate nickname: ${cardData.nickname}`);

		const cardRes = await db.query(
			`INSERT INTO cards
			 (nickname, gender, art, nature_id, ability_id, species_id, item_id)
			 VALUES ($1, $2, $3, $4, $5, $6, $7)
			 RETURNING id, nickname, gender, nature_id AS "natureID", ability_id AS "abilityID", art, species_id AS "speciesID", item_id AS "itemID"`,
			[
				cardData.nickname,
				cardData.gender,
				cardData.art,
				cardData.natureID,
				cardData.abilityID,
				cardData.speciesID,
				cardData.itemID
			]
		);
		const card = cardRes.rows[0];

		const userRes = await db.query(
			`INSERT INTO users_cards
			 (user_id, card_id)
			VALUES ($1, $2)`,
			[ userId, card.id ]
		);

		const move1Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move1ID ]
		);
		const move2Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move2ID ]
		);
		const move3Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move3ID ]
		);
		const move4Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move4ID ]
		);

		const newCard = {
			...card,
			move1ID : cardData.move1ID,
			move2ID : cardData.move2ID,
			move3ID : cardData.move3ID,
			move4ID : cardData.move4ID
		};

		console.log("new card:", newCard);

		return newCard;
	}
}

module.exports = Card;
