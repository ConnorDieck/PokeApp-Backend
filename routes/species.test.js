"use strict";

const request = require("supertest");

const app = require("../app");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /species */

describe("GET /species", function() {
	test("works", async function() {
		const resp = await request(app).get("/species");

		expect(resp.statusCode).toEqual(200);
		expect(resp.body.length).toEqual(950);
	});
});
