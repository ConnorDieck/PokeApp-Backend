"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Item = require("./item.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testItems } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getAll */

describe("getAll", function() {
	test("works without filters", async function() {
		const items = await Item.getAll();

		expect(items.length).toEqual(203);
	});

	test("works with category filter", async function() {
		const items = await Item.getAll({ category: "held-items" });

		expect(items.length).toEqual(61);
	});
});
