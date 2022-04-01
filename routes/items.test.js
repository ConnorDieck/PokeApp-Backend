"use strict";

const request = require("supertest");

const app = require("../app");
const { BadRequestError } = require("../expressError");
const { findAll } = require("../models/user");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testCardIds,
	testItemIds,
	testMoveIds,
	testNatureIds,
	testTeamIds,
	u1Token,
	u2Token,
	u3Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /items */

describe("GET /items", function() {
	test("works", async function() {
		const resp = await request(app).get("/items");

		expect(resp.statusCode).toEqual(200);
		expect(resp.body.body.length).toEqual(203);
	});
});
