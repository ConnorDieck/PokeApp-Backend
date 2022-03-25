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
			`SELECT id, nickname, gender, art,
					nature_id AS "natureId",
					ability_id AS "abilityId",
					species_id AS "speciesId",
					item_id AS "itemId"
				FROM cards 
				WHERE username = $1`,
			[ username ]
		);

		if (!cardsRes.rows[0]) throw new NotFoundError("No Pokemon built yet");

		return cardsRes.rows;
	}

	/** Saves a new card to the database */

	static async create(cardData, username) {
		// console.log(cardData.nickname);
		const duplicateCheck = await db.query(
			`SELECT nickname
			 FROM cards
			 WHERE nickname = $1 AND username = $2`,
			[ cardData.nickname, username ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate nickname: ${cardData.nickname}`);

		/** Updating card updates both card and card_moves tables in database.
		 * 
		 * Therefore, we'll use a transaction to handle all db queries
		 */

		const cardQuery = `
			INSERT INTO cards (nickname, gender, username, art, nature_id, ability_id, species_id, item_id)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id, nickname, art, username, gender, nature_id AS "natureId", ability_id AS "abilityId", art, species_id AS "speciesId", item_id AS "itemId"`;

		const cardValues = [
			cardData.nickname,
			cardData.gender,
			username,
			cardData.art,
			cardData.natureId,
			cardData.abilityId,
			cardData.speciesId,
			cardData.itemId
		];

		const movesQuery = `
			INSERT INTO cards_moves (card_id, move_id)
			VALUES ($1, $2)`;

		try {
			await db.query(`BEGIN`);

			const cardRes = await db.query(cardQuery, cardValues);
			const card = cardRes.rows[0];

			for (let moveId of cardData.moveIds) {
				await db.query(movesQuery, [ card.id, moveId ]);
			}

			// When testing, we don't want to commit our changes to the db so we can rollback with afterEach()
			// if (process.env.NODE_ENV !== "test") await db.query("COMMIT");

			await db.query("COMMIT");

			const newCard = {
				...card,
				moveIds : cardData.moveIds
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

	/** Given update data, card ID and user, updates card in database */
	static async edit(cardId, username, data) {
		const ownerCheck = await db.query(
			`SELECT id
			 FROM cards
			 WHERE id = $1 AND username = $2`,
			[ cardId, username ]
		);

		if (!ownerCheck.rows[0]) throw new UnauthorizedError("No card owned with given id");

		const { nickname, gender, art, natureId, abilityId, speciesId, itemId, moveIds } = data;

		const { setCols, values } = sqlForPartialUpdate(
			{ nickname, gender, art, natureId, abilityId, speciesId, itemId },
			{
				art       : "art",
				natureId  : "nature_id",
				speciesId : "species_id",
				abilityId : "ability_id",
				itemId    : "item_id"
			}
		);
		const cardIdIdx = "$" + (values.length + 1);

		// console.log("setCols:", setCols);
		// console.log("values:", values);

		const cardQuery = `UPDATE cards
			 SET ${setCols}
			 WHERE id = ${cardIdIdx}
			 RETURNING id, nickname, art, username, gender, nature_id AS "natureId", ability_id AS "abilityId", art, species_id AS "speciesId", item_id AS "itemId"`;

		const cardValues = [ ...values, cardId ];

		const movesQuery = `
			INSERT INTO cards_moves (card_id, move_id)
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

			for (let moveId of moveIds) {
				await db.query(movesQuery, [ cardId, moveId ]);
			}

			// When testing, we don't want to commit our changes to the db so we can rollback with afterEach()
			if (process.env.NODE_ENV !== "test") await db.query("COMMIT");

			const newCard = {
				...card,
				moveIds
			};

			return newCard;
		} catch (e) {
			await db.query(`ROLLBACK`);
			throw e;
		}
	}

	static async delete(cardId, username) {
		try {
			await db.query(`BEGIN`);

			const ownerCheck = await db.query(
				`SELECT id
				 FROM cards
				 WHERE id = $1 AND username = $2`,
				[ cardId, username ]
			);

			if (!ownerCheck.rows[0]) throw new UnauthorizedError("No card owned with given id");

			await db.query(
				`DELETE
				 FROM cards_moves
				 WHERE card_id = $1`,
				[ cardId ]
			);

			const result = await db.query(
				`DELETE
				FROM cards
				WHERE id = $1
				RETURNING id`,
				[ cardId ]
			);
			const deletedId = result.rows[0];

			if (!deletedId) throw new NotFoundError(`No card: ${cardId}`);

			// When testing, we don't want to commit our changes to the db so we can rollback with afterEach()
			if (process.env.NODE_ENV !== "test") await db.query("COMMIT");
		} catch (e) {
			await db.query(`ROLLBACK`);
			throw e;
		}
	}
}

module.exports = Card;
