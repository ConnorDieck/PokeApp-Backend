"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for moves. */

class Move {
	// Saves a move to the database
	static async addToDb({ name, type, url }) {
		const duplicateCheck = db.query(
			`SELECT name
             FROM moves
             WHERE name = $1`,
			[ name ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate move: ${name}`);

		const result = await db.query(
			`INSERT INTO moves
             (name, type, url)
             VALUES ($1, $2, $3)
             RETURNING id, name, type, url`,
			[ name, type, url ]
		);

		const move = result.rows[0];
		return move;
	}

	// Saves a move to a card
	static async addToCard({ id, cardId }) {
		const duplicateCheck = db.query(
			`SELECT id
             FROM cards_moves
             WHERE move_id = $1 AND card_id = $2`,
			[ id, cardId ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Move is already saved to card`);

		const result = await db.query(
			`INSERT INTO cards_moves
             (move_id, card_id)
             VALUES ($1, $2)
             RETURNING move_id AS "moveId", card_id AS "cardId"`,
			[ id, cardId ]
		);

		const cardMove = result.rows[0];
		return cardMove;
	}

	// Removes a move from a card
	static async removeFromCard({ id, cardId }) {
		const result = await db.query(
			`DELETE
             FROM cards_moves
             WHERE move_id = $1 AND card_id = $2
             RETURNING move_id AS "moveId", card_id AS "cardId"`,
			[ id, cardId ]
		);

		const cardMove = result.rows[0];
		if (!cardMove) throw new NotFoundError(`No such move found on card`);
		return cardMove;
	}
}
