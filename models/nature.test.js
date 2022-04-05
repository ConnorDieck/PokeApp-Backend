"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Nature = require("./nature.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testNatures } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getAll */

describe("getAll", function() {
	test("works without filters", async function() {
		const natures = await Nature.getAll();

		expect(natures.length).toEqual(25);
	});
});
