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

/************************************** GET /natures */

describe("GET /natures", function() {
	test("works", async function() {
		const resp = await request(app).get("/natures");

		expect(resp.statusCode).toEqual(200);
		expect(resp.body.natures.length).toEqual(25);
	});
});
