"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Ability = require("./ability.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testAbilityIds } = require("./_testCommon");

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
			...testAbility,
			id : expect.any(Number)
		});

		const result = await db.query(
			`SELECT id
             FROM abilities
             WHERE id = $1`,
			[ ability.id ]
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
		await Ability.remove(testAbilityIds[0]);

		const result = await db.query(
			`SELECT id
			 FROM abilities
			 WHERE id = $1`,
			[ testAbilityIds[0] ]
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
