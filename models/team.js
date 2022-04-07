"use strict";

const db = require("../db");
const Card = require("./card");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for pokemon team builds */

class Team {
	/** Gets all teams built by given user */
	static async getAll(username) {
		const teamsRes = await db.query(
			`SELECT id, name, username
				FROM teams 
				WHERE username = $1`,
			[ username ]
		);

		if (!teamsRes.rows[0]) throw new NotFoundError("No teams built yet");

		return teamsRes.rows;
	}

	/** Returns details of one team given team's id */
	static async get(teamId) {
		const teamRes = await db.query(
			`SELECT id, name, username
			 FROM teams
			 WHERE id = $1`,
			[ teamId ]
		);

		if (!teamRes.rows[0]) throw new NotFoundError(`No team with given id: ${teamId}`);

		const team = teamRes.rows[0];

		/** Get associated card ids, names, and urls to load into return object */
		const result = await db.query(
			`SELECT tc.card_id AS "id", c.name, c.url
             FROM teams_cards tc
                LEFT JOIN cards c ON tc.card_id = c.id
             WHERE tc.team_id = $1`,
			[ teamId ]
		);

		const teamCards = result.rows;

		const build = {
			...team,
			cards : teamCards
		};

		return build;
	}

	/** Creates a new team and adds it to the db */
	static async create(name, username) {
		const duplicateCheck = await db.query(
			`SELECT name
			 FROM teams
			 WHERE name = $1 AND username = $2`,
			[ name, username ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate team: ${name}`);

		const result = await db.query(
			`INSERT INTO teams (name, username)
             VALUES ($1, $2)
             RETURNING id, name, username`,
			[ name, username ]
		);

		const newTeam = result.rows[0];

		return newTeam;
	}

	/** Edits an existing team on the db */
	static async edit(teamId, newName, username) {
		const duplicateCheck = await db.query(
			`SELECT name
				FROM teams
				WHERE name = $1 AND username = $2`,
			[ newName, username ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Team name already exists: ${newName}`);

		const result = await db.query(
			`UPDATE teams
			 SET name = $1
			 WHERE id = $2 AND username = $3
			 RETURNING id, name, username`,
			[ newName, teamId, username ]
		);

		const updated = result.rows[0];

		return updated;
	}

	/** Adds an existing card to an existing team */
	static async addCard(teamId, cardId, username) {
		const ownerCheck = await db.query(
			`SELECT name
			 FROM teams
			 WHERE id = $1 AND username = $2`,
			[ teamId, username ]
		);

		const team = ownerCheck.rows[0];

		if (!team) throw new NotFoundError(`No team owned with given id: ${teamId}`);

		const result = await db.query(
			`INSERT INTO teams_cards (team_id, card_id)
             VALUES ($1, $2)
             RETURNING team_id AS "teamId", card_id AS "cardId"`,
			[ teamId, cardId ]
		);

		const teamCard = result.rows[0];
		return teamCard;
	}

	/** Removes a card from an existing team */
	static async removeCard(teamId, cardId, username) {
		const ownerCheck = await db.query(
			`SELECT name
			 FROM teams
			 WHERE id = $1 AND username = $2`,
			[ teamId, username ]
		);

		const team = ownerCheck.rows[0];

		if (!team) throw new NotFoundError(`No team found with given id: ${teamId}`);

		const result = await db.query(
			`DELETE
             FROM teams_cards
             WHERE team_id = $1 AND card_id = $2
             RETURNING team_id`,
			[ teamId, cardId ]
		);

		const deleted = result.rows[0];
		if (!deleted) throw new NotFoundError(`No card ${cardId} on team ${teamId}`);
	}

	/** Removes team from db */
	static async remove(teamId, username) {
		const result = await db.query(
			`DELETE
             FROM teams
             WHERE id = $1 AND username = $2
             RETURNING id`,
			[ teamId, username ]
		);

		const deleted = result.rows[0];
		if (!deleted) throw new NotFoundError(`No team found with given id: ${teamId}`);
	}
}

module.exports = Team;
