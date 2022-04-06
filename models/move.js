"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for moves. */

class Move {
	// Saves a move to the database
	static async addToDb({ name, url }) {
		const duplicateCheck = await db.query(
			`SELECT name
             FROM moves
             WHERE name = $1`,
			[ name ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate move: ${name}`);

		const result = await db.query(
			`INSERT INTO moves
             (name, url)
             VALUES ($1, $2)
             RETURNING name,  url`,
			[ name, url ]
		);

		const move = result.rows[0];
		return move;
	}

	/** Since adding a move to a card requires a SQL transaction, it will all be handled in one method on the Card model */

	/** Gets all moves associated to a card */
	static async getAllFromCard(cardId) {
		const result = await db.query(
			`SELECT move
            FROM cards_moves
            WHERE card_id = $1`,
			[ cardId ]
		);

		if (!result.rows[0]) throw new NotFoundError(`No moves associated with given card: ${cardId}`);

		const moves = result.rows.map(r => r.move);
		return moves;
	}

	/** Removes a move from a card */
	static async removeFromCard(move, cardId) {
		const result = await db.query(
			`DELETE
             FROM cards_moves
             WHERE move = $1 AND card_id = $2
             RETURNING move, card_id AS "cardId"`,
			[ move, cardId ]
		);

		const cardMove = result.rows[0];
		if (!cardMove) throw new NotFoundError(`No such move found on card`);
		return cardMove;
	}

	/** Removes a move from the db */
	static async removeFromDb(name) {
		const result = await db.query(
			`DELETE
				FROM moves
				WHERE name = $1
				RETURNING name`,
			[ name ]
		);

		const move = result.rows[0];
		if (!move) throw new NotFoundError(`No such move: ${name}`);
		return move;
	}
}

module.exports = Move;
