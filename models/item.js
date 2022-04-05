"use strict";

const db = require("../db");

/** Related functions for pokemon items */

class Item {
	/** Gets all items from db (optional filter on searchFilters).
	 * 
	 * searchFilters (all optional)
	 *  – name (will find case-insensitive, partial matches)
	 * 
	 *  Returns { [{ name, url }, ...]
	 */
	static async getAll(searchFilters = {}) {
		let query = `SELECT 
						name,
						url
				FROM items`;
		let whereExpressions = [];
		let queryValues = [];

		const { name, category } = searchFilters;

		// For each possible search term, add to whereExpressions and queryValues so
		// we can generate the right SQL

		if (name) {
			queryValues.push(`%${name}%`);
			whereExpressions.push(`name ILIKE $${queryValues.length}`);
		}

		if (category !== undefined) {
			queryValues.push(category);
			whereExpressions.push(`(category = $${queryValues.length})`);
		}

		if (whereExpressions.length > 0) {
			query += " WHERE " + whereExpressions.join(" AND ");
		}

		// Finalize query and return results

		query += " ORDER BY name";

		const result = await db.query(query, queryValues);
		return result.rows;
	}
}

module.exports = Item;
