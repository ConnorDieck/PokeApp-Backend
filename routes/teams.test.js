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
			name : "testTeam"
		};

		const resp = await request(app).post(`/teams`).send(testTeam).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testTeam,
			username : "u1",
			id       : expect.any(Number)
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

/************************************** GET /teams */

describe("GET /teams", function() {
	test("works if logged in", async function() {
		const resp = await request(app).get(`/teams`).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		expect(resp.body.teams).toEqual([
			{
				name     : "team1",
				username : "u1",
				id       : testTeamIds[0]
			},
			{
				name     : "team4",
				username : "u1",
				id       : testTeamIds[3]
			}
		]);
	});
});

/************************************** GET /teams/:teamId */

describe("GET /teams/:teamId", function() {
	test("works", async function() {
		const resp = await request(app).get(`/teams/${testTeamIds[3]}`).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		expect(resp.body).toEqual({
			name     : "team4",
			username : "u1",
			id       : testTeamIds[3],
			cards    : [
				{
					name      : "c1",
					id        : testCardIds[0],
					url       : "www.test.org",
					speciesId : 1
				},
				{
					name      : "c2",
					id        : testCardIds[1],
					url       : "www.test.org",
					speciesId : 2
				},
				{
					name      : "c3",
					id        : testCardIds[2],
					url       : "www.test.org",
					speciesId : 3
				}
			]
		});
	});

	test("not found if bad id", async function() {
		const resp = await request(app).get(`/teams/9999999`);

		expect(resp.statusCode).toEqual(404);
	});
});

/************************************** PATCH /teams/:teamId */

describe("PATCH /teams/:teamId", function() {
	test("works if logged in", async function() {
		const testTeam = {
			name : "testTeam"
		};
		const resp = await request(app)
			.patch(`/teams/${testTeamIds[0]}`)
			.send(testTeam)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		expect(resp.body).toEqual({
			name     : "testTeam",
			username : "u1",
			id       : testTeamIds[0]
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const testTeam = {
			name : "testTeam"
		};
		const resp = await request(app).patch(`/teams/${testTeamIds[0]}`).send(testTeam);

		expect(resp.statusCode).toEqual(401);
	});
});

/************************************** POST /teams/:teamId/:cardId */

describe("POST /teams/:teamId/:cardId", function() {
	test("works", async function() {
		const resp = await request(app)
			.post(`/teams/${testTeamIds[0]}/${testCardIds[1]}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			cardId : testCardIds[1],
			teamId : testTeamIds[0]
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

/************************************** DELETE /teams/:teamId/:cardId */

describe("DELETE /teams/:teamId/:cardId", function() {
	test("works", async function() {
		const resp = await request(app)
			.delete(`/teams/${testTeamIds[0]}/${testCardIds[0]}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.body).toEqual({
			deleted : testCardIds[0],
			from    : testTeamIds[0]
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const resp = await request(app).delete(`/teams/${testTeamIds[0]}/${testCardIds[0]}`);

		expect(resp.statusCode).toEqual(401);
	});

	test("not found if card isn't on team", async function() {
		const resp = await request(app)
			.delete(`/teams/${testTeamIds[0]}/${testCardIds[1]}`)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(404);
	});
});

/************************************** DELETE /teams/:teamId */

describe("DELETE /teams/:teamId", function() {
	test("works", async function() {
		const resp = await request(app).delete(`/teams/${testTeamIds[0]}`).set("authorization", `Bearer ${u1Token}`);

		expect(resp.body).toEqual({
			deleted : testTeamIds[0]
		});
	});

	test("unauthorized if user isn't logged in", async function() {
		const resp = await request(app).delete(`/teams/${testTeamIds[0]}/${testCardIds[0]}`);

		expect(resp.statusCode).toEqual(401);
	});

	test("not found if user doesn't own team", async function() {
		const resp = await request(app).delete(`/teams/${testTeamIds[1]}`).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(404);
	});
});
