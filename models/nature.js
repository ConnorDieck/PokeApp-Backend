"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for pokemon natures */

class Nature {
	/** Saves new nature to db */
	static async addToDb({ name, url }) {
		const duplicateCheck = await db.query(
			`SELECT name
             FROM natures
             WHERE name = $1`,
			[ name ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate nature: ${name}`);

		const result = await db.query(
			`INSERT INTO natures
            (name, url)
            VALUES ($1, $2)
            RETURNING id, name, url`,
			[ name, url ]
		);

		const nature = result.rows[0];
		return nature;
	}

	/** Removes a nature from the db */
	static async remove(id) {
		const result = await db.query(
			`DELETE
             FROM natures
             WHERE id = $1
             RETURNING name`,
			[ id ]
		);

		const nature = result.rows[0];
		if (!nature) throw new NotFoundError(`No such nature: ${nature}`);
		return nature;
	}
}

module.exports = Nature;
