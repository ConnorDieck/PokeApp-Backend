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
                    favorite
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

	static async register({ username, password }) {
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
            (username, password, favorite)
            VALUES ($1, $2, $3)
            RETURNING username, favorite`,
			[ username, password, favorite ]
		);

		const user = result.rows[0];

		return user;
	}
}
