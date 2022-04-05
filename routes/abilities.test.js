"use strict";

const request = require("supertest");

const app = require("../app");
const { BadRequestError } = require("../expressError");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testAbilities,
	u1Token,
	u2Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /abilities */

describe("POST /abilities", function() {
	test("works", async function() {
		const testAbility = {
			name : "testAbility",
			url  : "www.test1.com"
		};

		const resp = await request(app).post(`/abilities`).send(testAbility).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testAbility
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const testAbility = {
			name : "testAbility",
			url  : "www.test2.com"
		};

		const resp = await request(app).post(`/abilities`).send(testAbility);

		expect(resp.statusCode).toEqual(401);
	});

	test("bad request if duplicate", async function() {
		const testAbility = {
			name : "ability",
			url  : "www.test3.com"
		};

		const resp = await request(app).post(`/abilities`).send(testAbility).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});

	test("bad request if invalid data", async function() {
		const testAbility = {
			name  : 699,
			url   : 41,
			other : "this is not allowed"
		};

		const resp = await request(app).post(`/abilities`).send(testAbility).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});
});

/************************************** DELETE /abilities/:name */

describe("DELETE /:name", function() {
	test("successfully deletes abilities on the server", async function() {
		const resp = await request(app)
			.delete(`/abilities/${testAbilities[0]}`)
			.set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			deleted : testAbilities[0]
		});
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).delete(`/abilities/${testAbilities[0]}`);
		expect(resp.statusCode).toEqual(401);
	});
});
