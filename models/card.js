"use strict";

const db = require("../db");
const Move = require("./move");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pokemon builds */

class Card {
	/** Gets all cards built by given user 
	 * 
	 *  Does not pull associated moves
	 */
	static async getAll(username) {
		const cardsRes = await db.query(
			`SELECT id, name, gender, url,
					nature,
					ability,
					species_id AS "speciesId",
					item
				FROM cards 
				WHERE username = $1`,
			[ username ]
		);

		if (!cardsRes.rows[0]) throw new NotFoundError("No Pokemon built yet");

		return cardsRes.rows;
	}

	/** Saves a new card to the database */

	static async create(cardData, username) {
		// console.log(cardData.name);
		const duplicateCheck = await db.query(
			`SELECT name
			 FROM cards
			 WHERE name = $1 AND username = $2`,
			[ cardData.name, username ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate name: ${cardData.name}`);

		/** Updating card updates both card and card_moves tables in database.
		 * 
		 * Therefore, we'll use a transaction to handle all db queries
		 */

		const cardQuery = `
			INSERT INTO cards (name, gender, username, url, nature, ability, species_id, item)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id, name, url, username, gender, nature, ability, species_id AS "speciesId", item`;

		const cardValues = [
			cardData.name,
			cardData.gender,
			username,
			cardData.url,
			cardData.nature,
			cardData.ability,
			cardData.speciesId,
			cardData.item
		];

		const movesQuery = `
			INSERT INTO cards_moves (card_id, move)
			VALUES ($1, $2)`;

		try {
			await db.query(`BEGIN`);

			const cardRes = await db.query(cardQuery, cardValues);
			const card = cardRes.rows[0];

			for (let move of cardData.moves) {
				await db.query(movesQuery, [ card.id, move ]);
			}

			await db.query("COMMIT");

			const newCard = {
				...card,
				moves : cardData.moves
			};

			// console.log("new card:", newCard);

			return newCard;
		} catch (e) {
			await db.query(`ROLLBACK`);
			throw e;
		}
	}

	/** Returns details of one card given card's id */
	static async get(cardId) {
		const res = await db.query(
			`SELECT id, name, url, username, gender, nature, ability, species_id AS "speciesId", item
			 FROM cards
			 WHERE id = $1`,
			[ cardId ]
		);

		if (!res.rows[0]) throw new NotFoundError(`No card with given id: ${cardId}`);

		const cardRes = res.rows[0];
		let moves = [];

		/** Get associated moves and add to returned card object */
		try {
			moves = await Move.getAllFromCard(cardId);
		} catch (err) {
			moves = [];
		}

		const card = {
			...cardRes,
			moves
		};

		return card;
	}

	/** Given update data, card ID and user, updates card in database */
	static async edit(cardId, username, data) {
		if (Object.values(data).length === 0) throw new BadRequestError(`No update data provided`);

		const ownerCheck = await db.query(
			`SELECT id
			 FROM cards
			 WHERE id = $1 AND username = $2`,
			[ cardId, username ]
		);

		if (!ownerCheck.rows[0]) throw new UnauthorizedError("No card owned with given id");

		const { name, gender, url, nature, ability, speciesId, item, moves } = data;

		const { setCols, values } = sqlForPartialUpdate(
			{ name, gender, url, nature, ability, speciesId, item },
			{
				url       : "url",
				nature    : "nature",
				speciesId : "species_id",
				ability   : "ability",
				item      : "item"
			}
		);
		const cardIdIdx = "$" + (values.length + 1);

		// console.log("setCols:", setCols);
		// console.log("values:", values);

		const cardQuery = `UPDATE cards
			 SET ${setCols}
			 WHERE id = ${cardIdIdx}
			 RETURNING id, name, url, username, gender, nature, ability, species_id AS "speciesId", item`;

		const cardValues = [ ...values, cardId ];

		const movesQuery = `
			INSERT INTO cards_moves (card_id, move)
			VALUES ($1, $2)`;

		// Updating moves won't work – it will always update the same row in cards_moves. Instead, we need to delete all associated moves and add new ones

		await db.query(
			`DELETE
				FROM cards_moves
				WHERE card_id = $1`,
			[ cardId ]
		);

		try {
			await db.query(`BEGIN`);

			const cardRes = await db.query(cardQuery, cardValues);
			const card = cardRes.rows[0];

			for (let move of moves) {
				await db.query(movesQuery, [ cardId, move ]);
			}

			await db.query("COMMIT");

			const newCard = {
				...card,
				moves
			};

			return newCard;
		} catch (e) {
			await db.query(`ROLLBACK`);
			throw e;
		}
	}

	static async delete(cardId, username) {
		const ownerCheck = await db.query(
			`SELECT id
				FROM cards
				WHERE id = $1 AND username = $2`,
			[ cardId, username ]
		);

		if (!ownerCheck.rows[0]) throw new UnauthorizedError("No card owned with given id");

		await db.query(
			`DELETE
			FROM cards
			WHERE id = $1
			RETURNING id`,
			[ cardId ]
		);
	}
}

module.exports = Card;
