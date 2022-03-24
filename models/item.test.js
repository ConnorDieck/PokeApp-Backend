"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Item = require("./item.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testItemIds } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** addtoDb */

describe("addToDb", function() {
	test("works", async function() {
		const testItem = {
			name : "Rare Candy",
			url  : "testurl"
		};

		const item = await Item.addToDb(testItem);

		expect(item).toEqual({
			...testItem,
			id : expect.any(Number)
		});

		const result = await db.query(
			`SELECT id
             FROM items
             WHERE id = $1`,
			[ item.id ]
		);

		expect(result.rows[0].length).not.toEqual(0);
	});

	test("returns bad request error upon duplicate input", async function() {
		const testItem = {
			name : "Rare Candy",
			url  : "testurl"
		};

		try {
			await Item.addToDb(testItem);
			await Item.addToDb(testItem);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function() {
	test("works", async function() {
		await Item.remove(testItemIds[0]);

		const result = await db.query(
			`SELECT id
			 FROM items
			 WHERE id = $1`,
			[ testItemIds[0] ]
		);

		expect(result.rows.length).toEqual(0);
	});

	test("throws not found error if move does not exist", async function() {
		try {
			await Item.remove(9999);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
