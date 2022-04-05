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

		if (duplicateCheck.rows.length > 0) throw new BadRequestError(`Duplicate ability: ${name}`);

		const result = await db.query(
			`INSERT INTO abilities
            (name, url)
            VALUES ($1, $2)
            RETURNING name, url`,
			[ name, url ]
		);

		const ability = result.rows[0];
		return ability;
	}

	/** Removes an ability from the db */
	static async remove(name) {
		const result = await db.query(
			`DELETE
             FROM abilities
             WHERE name = $1
             RETURNING name`,
			[ name ]
		);

		const ability = result.rows[0];
		if (!ability) throw new NotFoundError(`No such ability: ${name}`);
		return ability;
	}
}

module.exports = Ability;
