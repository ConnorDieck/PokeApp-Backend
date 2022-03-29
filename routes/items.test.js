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

/************************************** POST /items */

describe("POST /items", function() {
	test("works", async function() {
		const testItem = {
			name : "testItem",
			url  : "www.test.com"
		};

		const resp = await request(app).post(`/items`).send(testItem).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testItem,
			id : expect.any(Number)
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const testItem = {
			name : "testItem",
			url  : "www.test.com"
		};

		const resp = await request(app).post(`/items`).send(testItem);

		expect(resp.statusCode).toEqual(401);
	});

	test("bad request if duplicate", async function() {
		const testItem = {
			name : "ability",
			url  : "www.test.com"
		};

		const resp = await request(app).post(`/items`).send(testItem).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});

	test("bad request if invalid data", async function() {
		const testItem = {
			name  : "testItem",
			url   : 41,
			other : "this is not allowed"
		};

		const resp = await request(app).post(`/items`).send(testItem).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});
});

/************************************** DELETE /items/:abilityId */

describe("DELETE /:abilityId", function() {
	test("successfully deletes items on the server", async function() {
		const resp = await request(app).delete(`/items/${testItemIds[0]}`).set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			deleted : testItemIds[0]
		});
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).delete(`/cards/${testItemIds[0]}`);
		expect(resp.statusCode).toEqual(401);
	});

	test("unauthorized if wrong user", async function() {
		const resp = await request(app).delete(`/cards/${testItemIds[0]}`).set("authorization", `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(401);
	});
});
