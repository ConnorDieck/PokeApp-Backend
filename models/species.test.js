"use strict";

const db = require("../db.js");
const { NotFoundError } = require("../expressError");
const Species = require("./species.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getAll */

describe("getAll", function() {
	test("works", async function() {
		const species = await Species.getAll();

		expect(species.length).toEqual(950);
	});

	test("Not found error if db is empty", async function() {
		try {
			await db.query(`DELETE FROM cards`);
			await db.query(`DELETE FROM users`);
			await db.query(`DELETE FROM species`);
			await Species.getAll();
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
