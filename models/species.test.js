"use strict";

const db = require("../db.js");
const { NotFoundError } = require("../expressError");
const Species = require("./species.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");
const fireTypes = require("../helpers/fireTypes");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getAll */

describe("getAll", function() {
	test("works without filters", async function() {
		const species = await Species.getAll();

		expect(species.length).toEqual(950);
	});

	test("works with type filter", async function() {
		const species = await Species.getAll({ type: "Fire" });

		expect(species).toEqual(fireTypes);
	});
});
