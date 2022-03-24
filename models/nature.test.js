"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Nature = require("./nature.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testNatureIds } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** addtoDb */

describe("addToDb", function() {
	test("works", async function() {
		const testNature = {
			name : "Bold",
			url  : "testurl"
		};

		const nature = await Nature.addToDb(testNature);

		expect(nature).toEqual({
			...testNature,
			id : expect.any(Number)
		});

		const result = await db.query(
			`SELECT id
             FROM natures
             WHERE id = $1`,
			[ nature.id ]
		);

		expect(result.rows[0].length).not.toEqual(0);
	});

	test("returns bad request error upon duplicate input", async function() {
		const testNature = {
			name : "Bold",
			url  : "testurl"
		};

		try {
			await Nature.addToDb(testNature);
			await Nature.addToDb(testNature);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function() {
	test("works", async function() {
		await Nature.remove(testNatureIds[0]);

		const result = await db.query(
			`SELECT id
			 FROM natures
			 WHERE id = $1`,
			[ testNatureIds[0] ]
		);

		expect(result.rows.length).toEqual(0);
	});

	test("throws not found error if move does not exist", async function() {
		try {
			await Nature.remove(9999);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
