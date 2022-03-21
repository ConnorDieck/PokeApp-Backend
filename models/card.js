"use strict";

const db = require("../db");
const Move = require("./move");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { setPokemonBase } = require("../helpers/transform");

/** Related functions for pokemon builds */

class Card {
	/** Gets all cards built by given user */
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

	/** Saves a new card to the database */

	static async create(cardData, username) {
		const duplicateCheck = await db.query(
			`SELECT nickname
			 FROM cards
			 WHERE nickname = $1 AND username = $2`,
			[ cardData.nickname, username ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate nickname: ${cardData.nickname}`);

		const cardRes = await db.query(
			`INSERT INTO cards
			 (nickname, gender, username, art, nature_id, ability_id, species_id, item_id)
			 VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			 RETURNING id, nickname, art, username, gender, nature_id AS "natureId", ability_id AS "abilityId", art, species_id AS "speciesId", item_id AS "itemId"`,
			[
				cardData.nickname,
				cardData.gender,
				username,
				cardData.art,
				cardData.natureId,
				cardData.abilityId,
				cardData.speciesId,
				cardData.itemId
			]
		);
		const card = cardRes.rows[0];

		// TO DO: Update with Move.add() method
		// const move1Res = await db.query(
		// 	`INSERT INTO cards_moves
		// 	 (card_id, move_id)
		// 	 VALUES ($1, $2)`,
		// 	[ card.id, cardData.move1Id ]
		// );
		// const move2Res = await db.query(
		// 	`INSERT INTO cards_moves
		// 	 (card_id, move_id)
		// 	 VALUES ($1, $2)`,
		// 	[ card.id, cardData.move2Id ]
		// );
		// const move3Res = await db.query(
		// 	`INSERT INTO cards_moves
		// 	 (card_id, move_id)
		// 	 VALUES ($1, $2)`,
		// 	[ card.id, cardData.move3Id ]
		// );
		// const move4Res = await db.query(
		// 	`INSERT INTO cards_moves
		// 	 (card_id, move_id)
		// 	 VALUES ($1, $2)`,
		// 	[ card.id, cardData.move4Id ]
		// );

		await Move.addToCard(card.id, cardData.move1Id);
		await Move.addToCard(card.id, cardData.move2Id);
		await Move.addToCard(card.id, cardData.move3Id);
		await Move.addToCard(card.id, cardData.move4Id);

		const newCard = {
			...card,
			move1Id : cardData.move1Id,
			move2Id : cardData.move2Id,
			move3Id : cardData.move3Id,
			move4Id : cardData.move4Id
		};

		// console.log("new card:", newCard);

		return newCard;
	}

	/** TO DO */
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
		/** TO DO:
		 *  
		 *  Get associated moves and add to returned card object
		 */

		// const movesRes = await db.query(
		// 	`SELECT move_id
		// 	 FROM cards_moves
		// 	 WHERE card_id = $1`,
		// 	[ cardId ]
		// );

		// const moves = movesRes.rows;

		const moves = await Move.getAllFromCard(cardId);

		const card = {
			...cardRes,
			move1Id : moves[0],
			move2Id : moves[1],
			move3Id : moves[2],
			move4Id : moves[3]
		};

		return card;
	}

	/** TO DO */
	/** Given update data, card ID and user, updates card in database */
	static async edit(cardId, username, data) {
		const ownerCheck = await db.query(
			`SELECT card_id
			 FROM users_cards AS uc
			 WHERE uc.card_id = $1 AND uc.username = $2`,
			[ cardId, username ]
		);

		if (!ownerCheck.rows[0]) throw new NotFoundError("No card owned with given id");

		const { nickname, gender, natureId, abilityId, speciesId, itemId, move1Id, move2Id, move3Id, move4Id } = data;

		const { setCols, values } = sqlForPartialUpdate(data, {
			natureId  : "nature_id",
			abilityId : "ability_id",
			itemId    : "item_id",
			move1Id   : "move1_id",
			move2Id   : "move2_id",
			move3Id   : "move3_id",
			move4Id   : "move4_id"
		});

		return ownerCheck.rows[0];
	}
}

module.exports = Card;
