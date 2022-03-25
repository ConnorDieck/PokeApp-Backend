"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Team = require("./team.js");
const Card = require("./card.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testAbilityIds,
	testItemIds,
	testMoveIds,
	testNatureIds,
	testTeamIds,
	testUsernames,
	testCardIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getAll */

describe("getAll", function() {
	test("works", async function() {
		const teams = await Team.getAll(testUsernames[0]);

		expect(teams).toEqual([
			{
				id       : expect.any(Number),
				name     : "u1team",
				username : testUsernames[0]
			}
		]);
	});

	test("returns not found error if no teams exist with given username", async function() {
		try {
			await Team.getAll("noteams");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** get */

describe("get", function() {
	test("works", async function() {
		const team = await Team.get(testTeamIds[0], testUsernames[0]);

		expect(team).toEqual({
			id        : expect.any(Number),
			name      : "u1team",
			username  : testUsernames[0],
			teamCards : []
		});
	});

	test("correctly pulls card details if exist", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};

		const card = await Card.create(testCard);

		await db.query(
			`INSERT INTO teams_cards
             (team_id, card_id)
             VALUES ($1, $2)`,
			[ testTeamIds[0], card.id ]
		);

		const team = await Team.get(testTeamIds[0], testUsernames[0]);

		expect(team).toEqual({
			id        : expect.any(Number),
			name      : "u1team",
			username  : testUsernames[0],
			teamCards : [
				{
					cardId   : expect.any(Number),
					nickname : "Spicy",
					art      :
						"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png"
				}
			]
		});
	});

	test("returns not found error if no teams exist with given username", async function() {
		try {
			await Team.get(999, "noteams");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** create */

describe("create", function() {
	test("works", async function() {
		const newTeam = await Team.create("testTeam", testUsernames[0]);

		const result = await db.query(
			`SELECT id, name, username
             FROM teams
             WHERE id = $1`,
			[ newTeam.id ]
		);
		expect(result.rows[0]).toEqual(newTeam);
	});

	test("returns bad request error if duplicate", async function() {
		try {
			await Team.create("testTeam", testUsernames[0]);
			await Team.create("testTeam", testUsernames[0]);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** addCard */

describe("addCard", function() {
	test("works", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};
		const card = await Card.create(testCard, testUsernames[0]);

		const teamCard = await Team.addCard(testTeamIds[0], card.id, testUsernames[0]);

		console.log(teamCard);

		expect(teamCard.teamId).toEqual(testTeamIds[0]);
		expect(teamCard.cardId).toEqual(card.id);

		const result = await db.query(
			`SELECT team_id, card_id
             FROM teams_cards
             WHERE team_id = $1 AND card_id = $2`,
			[ testTeamIds[0], card.id ]
		);

		expect(result.rows.length).not.toEqual(0);
	});

	test("returns not found error if no teams exist with given username", async function() {
		try {
			await Team.addCard(999, 1, testUsernames[0]);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** removeCard */

describe("removeCard", function() {
	test("works", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};
		const card = await Card.create(testCard, testUsernames[0]);

		const result = await db.query(
			`INSERT INTO teams_cards
             (team_id, card_id)
             VALUES ($1, $2)
             RETURNING team_id, card_id`,
			[ testTeamIds[0], card.id ]
		);

		expect(result.rows.length).not.toEqual(0);

		await Team.removeCard(testTeamIds[0], card.id, testUsernames[0]);

		const deleted = await db.query(
			`SELECT team_id
             FROM teams_cards
             WHERE team_id = $1 AND card_id = $2`,
			[ testTeamIds[0], card.id ]
		);

		expect(deleted.rows.length).toEqual(0);
	});

	test("returns not found error if no teams exist with given username", async function() {
		try {
			await Team.removeCard(testTeamIds[0], 99999, testUsernames[0]);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function() {
	test("works", async function() {
		await Team.remove(testTeamIds[0], testUsernames[0]);

		const deleted = await db.query(
			`SELECT id
             FROM teams
             WHERE id = $1`,
			[ testTeamIds[0] ]
		);

		expect(deleted.rows.length).toEqual(0);
	});

	test("deletes associated cards from team", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};
		const card = await Card.create(testCard, testUsernames[0]);

		const result = await db.query(
			`INSERT INTO teams_cards
             (team_id, card_id)
             VALUES ($1, $2)
             RETURNING team_id, card_id`,
			[ testTeamIds[0], card.id ]
		);

		expect(result.rows.length).not.toEqual(0);

		await Team.remove(testTeamIds[0], testUsernames[0]);

		const deleted = await db.query(
			`SELECT team_id
             FROM teams_cards
             WHERE team_id = $1 AND card_id = $2`,
			[ testTeamIds[0], card.id ]
		);

		expect(deleted.rows.length).toEqual(0);
	});

	test("returns not found error if no teams exist with given username", async function() {
		try {
			await Team.remove(testTeamIds[0], "noteams");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
