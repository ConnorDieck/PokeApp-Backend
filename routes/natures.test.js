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

/************************************** POST /natures */

describe("POST /natures", function() {
	test("works", async function() {
		const testNature = {
			name : "testNature",
			url  : "www.test.com"
		};

		const resp = await request(app).post(`/natures`).send(testNature).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testNature,
			id : expect.any(Number)
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const testNature = {
			name : "testNature",
			url  : "www.test.com"
		};

		const resp = await request(app).post(`/natures`).send(testNature);

		expect(resp.statusCode).toEqual(401);
	});

	test("bad request if duplicate", async function() {
		const testNature = {
			name : "nature",
			url  : "www.test.com"
		};

		const resp = await request(app).post(`/natures`).send(testNature).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});

	test("bad request if invalid data", async function() {
		const testNature = {
			name  : "testNature",
			url   : 41,
			other : "this is not allowed"
		};

		const resp = await request(app).post(`/natures`).send(testNature).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});
});

/************************************** DELETE /natures/:natureId */

describe("DELETE /:natureId", function() {
	test("successfully deletes natures on the server", async function() {
		const resp = await request(app)
			.delete(`/natures/${testNatureIds[0]}`)
			.set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			deleted : testNatureIds[0]
		});
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).delete(`/cards/${testNatureIds[0]}`);
		expect(resp.statusCode).toEqual(401);
	});

	test("unauthorized if wrong user", async function() {
		const resp = await request(app).delete(`/cards/${testNatureIds[0]}`).set("authorization", `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(401);
	});
});
