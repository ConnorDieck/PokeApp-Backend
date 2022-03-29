"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for pokemon builds */

class Species {
	/** Gets all species from db */
	static async getAll() {
		const result = await db.query(
			`SELECT *
			 FROM species`
		);

		if (result.rows.length < 1) throw new NotFoundError("No species loaded");

		return result.rows;
	}
}

module.exports = Species;
