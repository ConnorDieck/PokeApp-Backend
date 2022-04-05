"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Ability = require("./ability.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testAbilities } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** addtoDb */

describe("addToDb", function() {
	test("works", async function() {
		const testAbility = {
			name : "Blaze",
			url  : "testurl"
		};

		const ability = await Ability.addToDb(testAbility);

		expect(ability).toEqual({
			...testAbility
		});

		const result = await db.query(
			`SELECT name
             FROM abilities
             WHERE name = $1`,
			[ ability.name ]
		);

		expect(result.rows[0].length).not.toEqual(0);
	});

	test("returns bad request error upon duplicate input", async function() {
		const testAbility = {
			name : "Blaze",
			url  : "testurl"
		};

		try {
			await Ability.addToDb(testAbility);
			await Ability.addToDb(testAbility);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function() {
	test("works", async function() {
		await Ability.remove(testAbilities[0]);

		const result = await db.query(
			`SELECT name
			 FROM abilities
			 WHERE name = $1`,
			[ testAbilities[0] ]
		);

		expect(result.rows.length).toEqual(0);
	});

	test("throws not found error if move does not exist", async function() {
		try {
			await Ability.remove(9999);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
