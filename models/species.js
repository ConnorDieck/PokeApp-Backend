"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for pokemon builds */

class Species {
	/** Gets all species from db (optional filter on searchFilters).
	 * 
	 * searchFilters (all optional)
	 *  – name (will find case-insensitive, partial matches)
	 *  – type
	 * 
	 *  Returns { [{ id, pokedex_no, name, url, sprite, type1, type2 }, ...]
	 */
	static async getAll(searchFilters = {}) {
		let query = `SELECT id,
							pokedex_no AS "pokedexNo",
							name,
							url,
							sprite,
							type1,
							type2
					FROM species`;
		let whereExpressions = [];
		let queryValues = [];

		const { name, type } = searchFilters;

		// For each possible search term, add to whereExpressions and queryValues so
		// we can generate the right SQL

		if (type !== undefined) {
			queryValues.push(type);
			whereExpressions.push(`type1 = $${queryValues.length} OR type2 = $${queryValues.length}`);
		}

		if (name) {
			console.log("APPENDING NAME WHETHER YOU LIKE IT OR NOT LOL");
			queryValues.push(`%${name}%`);
			whereExpressions.push(`name ILIKE $${queryValues.length}`);
		}

		if (whereExpressions.length > 0) {
			query += " WHERE " + whereExpressions.join(" AND ");
		}

		// Finalize query and return results

		query += " ORDER BY id";

		const result = await db.query(query, queryValues);
		return result.rows;
	}
}

module.exports = Species;
