"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { setPokemonBase } = require("../helpers/transform");

/** Related functions for pokemon builds */

class Card {
	// Gets all cards built by given user
	static async getAll(username) {
		const cardsRes = await db.query(
			`SELECT c.id,
						c.nickname,
						c.gender,
						c.art,
						c.nature_id AS "natureId",
						c.ability_id AS "ability_Id",
						c.species_id AS "speciesId",
						c.item_id AS "itemId"
				FROM cards c
					LEFT JOIN users_cards AS uc ON c.id = uc.card_id
				WHERE uc.username = $1`,
			[ username ]
		);

		if (!cardsRes.rows[0]) throw new NotFoundError("No Pokemon built yet");

		return cardsRes.rows;
	}

	// Saves a new card to the database
	static async create(cardData, username) {
		const duplicateCheck = await db.query(
			`SELECT nickname
			 FROM cards c
			 	LEFT JOIN users_cards AS uc ON c.id = uc.card_id
			 WHERE nickname = $1 AND uc.username = $2`,
			[ cardData.nickname, username ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate nickname: ${cardData.nickname}`);

		const cardRes = await db.query(
			`INSERT INTO cards
			 (nickname, gender, art, nature_id, ability_id, species_id, item_id)
			 VALUES ($1, $2, $3, $4, $5, $6, $7)
			 RETURNING id, nickname, gender, nature_id AS "natureId", ability_id AS "abilityId", art, species_id AS "speciesId", item_id AS "itemId"`,
			[
				cardData.nickname,
				cardData.gender,
				cardData.art,
				cardData.natureId,
				cardData.abilityId,
				cardData.speciesId,
				cardData.itemId
			]
		);
		const card = cardRes.rows[0];

		const userRes = await db.query(
			`INSERT INTO users_cards
			 (username, card_id)
			VALUES ($1, $2)`,
			[ username, card.id ]
		);

		const move1Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move1Id ]
		);
		const move2Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move2Id ]
		);
		const move3Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move3Id ]
		);
		const move4Res = await db.query(
			`INSERT INTO cards_moves
			 (card_id, move_id)
			 VALUES ($1, $2)`,
			[ card.id, cardData.move4Id ]
		);

		const newCard = {
			...card,
			move1Id : cardData.move1Id,
			move2Id : cardData.move2Id,
			move3Id : cardData.move3Id,
			move4Id : cardData.move4Id
		};

		console.log("new card:", newCard);

		return newCard;
	}

	static async get(cardId) {
		const res = await db.query(
			`SELECT nickname, gender, art, nature_id, ability_id, species_id, item_id
			 FROM cards
			 WHERE id = $1`,
			[ cardId ]
		);

		if (!res.rows[0]) throw new NotFoundError("No card with given id");

		const card = res.rows[0];
		return card;
	}
}

module.exports = Card;
