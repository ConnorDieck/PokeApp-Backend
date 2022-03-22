"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Move = require("./move.js");
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
	testUsernames
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** addtoDb */

describe("addToDb", function() {
	test("works", async function() {
		const testMove = {
			name : "Thunderbolt",
			type : "Electric",
			url  : "https://pokeapi.co/api/v2/move/85/"
		};

		const move = await Move.addToDb(testMove);

		expect(move).toEqual({
			...testMove,
			id : expect.any(Number)
		});

		const result = await db.query(
			`SELECT id
             FROM moves
             WHERE id = $1`,
			[ move.id ]
		);

		expect(result.rows[0].length).not.toEqual(0);
	});
});
