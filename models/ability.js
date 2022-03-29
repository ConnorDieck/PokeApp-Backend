"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for pokemon abilities */

class Ability {
	/** Saves new ability to db */
	static async addToDb({ name, url }) {
		const duplicateCheck = await db.query(
			`SELECT name
             FROM abilities
             WHERE name = $1`,
			[ name ]
		);

		console.log("duplicate check length", duplicateCheck.rows.length);

		if (duplicateCheck.rows.length > 0) throw new BadRequestError(`Duplicate ability: ${name}`);

		const result = await db.query(
			`INSERT INTO abilities
            (name, url)
            VALUES ($1, $2)
            RETURNING id, name, url`,
			[ name, url ]
		);

		const ability = result.rows[0];
		return ability;
	}

	/** Removes an ability from the db */
	static async remove(id) {
		const result = await db.query(
			`DELETE
             FROM abilities
             WHERE id = $1
             RETURNING name`,
			[ id ]
		);

		const ability = result.rows[0];
		if (!ability) throw new NotFoundError(`No such ability: ${ability}`);
		return ability;
	}
}

module.exports = Ability;
