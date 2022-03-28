"use strict";

const request = require("supertest");

const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testAbilityIds,
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

/************************************** POST /teams */

describe("POST /teams", function() {
	test("works", async function() {
		const testTeam = {
			name     : "testTeam",
			username : "u1"
		};

		const resp = await request(app).post(`/teams`).send(testTeam).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testTeam,
			id : expect.any(Number)
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const testTeam = {
			name     : "testTeam",
			username : "u1"
		};

		const resp = await request(app).post(`/teams`).send(testTeam);

		expect(resp.statusCode).toEqual(401);
	});
});
