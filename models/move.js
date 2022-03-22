"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for moves. */

class Move {
	// Saves a move to the database
	static async addToDb({ name, type, url }) {
		const duplicateCheck = await db.query(
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

	/** Since adding a move to a card requires a SQL transaction, it will all be handled in one method */

	/** Gets all moves associated to a card */
	static async getAllFromCard(cardId) {
		const result = await db.query(
			`SELECT move_id
            FROM cards_moves
            WHERE card_id = $1`,
			[ cardId ]
		);

		if (!result.rows[0]) throw new NotFoundError(`No moves associated with given card: ${cardId}`);

		const moveIds = result.rows.map(r => r.move_id);
		return moveIds;
	}

	/** Removes a move from a card */
	static async removeFromCard(id, cardId) {
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

module.exports = Move;
