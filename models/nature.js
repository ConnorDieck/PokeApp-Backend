"use strict";

const db = require("../db");

/** Related functions for pokemon natures */

class Nature {
	/** Gets all natures */
	static async getAll() {
		const result = await db.query(
			`SELECT name, url
				FROM natures`
		);

		return result.rows;
	}
}

module.exports = Nature;
