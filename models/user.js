"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */
class User {
	/** authenticate user with username, password.
     * 
     * Returns {username, favorite}
     * 
     * Throws UnauthorizedError if user is not found or incorrect password.
     */

	static async authenticate(username, password) {
		// try to find user
		const result = await db.query(
			`SELECT username,
                    password,
                    favorite_id AS "favoriteId"
            FROM users
            WHERE username = $1`,
			[ username ]
		);

		const user = result.rows[0];

		if (user) {
			// compare hasahed password to new hash from password
			const isValid = await bcrypt.compare(password, user.password);
			if (isValid) {
				delete user.password;
				return user;
			}
		}

		throw new UnauthorizedError("Invalid username/password");
	}

	/** Register user with sign-up data
     * 
     * Returns {username, favorite}
     * Favorite will be empty upon registering. Users can add this later
     * 
     * Throws BadRequestError on duplicates.
     */

	static async register({ username, password, favoriteId }) {
		const duplicateCheck = await db.query(
			`SELECT username
            FROM users
            WHERE username = $1`,
			[ username ]
		);

		if (duplicateCheck.rows[0]) {
			throw new BadRequestError(`Duplicate username: ${username}`);
		}

		const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

		const result = await db.query(
			`INSERT INTO users
            (username, password, favorite_id)
            VALUES ($1, $2, $3)
            RETURNING username, favorite_id AS "favoriteId"`,
			[ username, hashedPassword, favoriteId ]
		);

		const user = result.rows[0];

		return user;
	}

	/** Find all users.
   *
   * Returns [{ username, favoriteId }, ...]
   **/

	static async findAll() {
		const result = await db.query(
			`SELECT username,
					  favorite_id AS "favoriteId"
			   FROM users
			   ORDER BY username`
		);

		return result.rows;
	}

	/** Given a username, return data about user.
   *
   * Returns { username, favoriteId, favorite }
   *   where favorite is { id, pokedexNo, name, url, sprite, type1, type2 }
   *
   * Throws NotFoundError if user not found.
   **/
	static async get(username) {
		const userRes = await db.query(
			`SELECT username,
					favorite_id AS "favoriteId"
			FROM users
			WHERE username = $1`,
			[ username ]
		);
		const user = userRes.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);

		const userFavorite = await db.query(
			`SELECT id, pokedex_no AS "pokedexNo", name, url, sprite, type1, type2
			FROM species
			WHERE pokedex_no = $1`,
			[ user.favoriteId ]
		);
		user.favorite = userFavorite.rows[0];
		return user;
	}

	/** Given a username and favoriteId, update favoriteId in server
	 *
	 * Returns { username, favoriteId, favorite }
	 *   where favorite is { id, pokedexNo, name, url, sprite, type1, type2 }
	 *
	 * Throws NotFoundError if user not found.
	 **/
	static async updateFavorite(username, newfavoriteId) {
		const userRes = await db.query(
			`UPDATE users
				 SET favorite_id = $1 
				 WHERE username = $2
				 RETURNING username, favorite_id AS "favoriteId"`,
			[ newfavoriteId, username ]
		);

		const user = userRes.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);

		const userFavorite = await db.query(
			`SELECT id, pokedex_no AS "pokedexNo", name, url, sprite, type1, type2
				FROM species
				WHERE id = $1`,
			[ user.favoriteId ]
		);
		user.favorite = userFavorite.rows[0];
		return user;
	}

	/** Delete given user from database; returns undefined. */
	static async remove(username) {
		let result = await db.query(
			`DELETE
			   FROM users
			   WHERE username = $1
			   RETURNING username`,
			[ username ]
		);
		const user = result.rows[0];

		if (!user) throw new NotFoundError(`No user: ${username}`);
	}
}

module.exports = User;
