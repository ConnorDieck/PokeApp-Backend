"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for pokemon items */

class Item {
	/** Saves new item to db */
	static async addToDb({ name, url }) {
		const duplicateCheck = await db.query(
			`SELECT name
             FROM items
             WHERE name = $1`,
			[ name ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate item: ${name}`);

		const result = await db.query(
			`INSERT INTO items
            (name, url)
            VALUES ($1, $2)
            RETURNING id, name, url`,
			[ name, url ]
		);

		const item = result.rows[0];
		return item;
	}

	/** Removes an item from the db */
	static async remove(id) {
		const result = await db.query(
			`DELETE
             FROM items
             WHERE id = $1
             RETURNING name`,
			[ id ]
		);

		const item = result.rows[0];
		if (!item) throw new NotFoundError(`No such item: ${item}`);
		return item;
	}
}

module.exports = Item;
