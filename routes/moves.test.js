"use strict";

const request = require("supertest");

const app = require("../app");
const { BadRequestError } = require("../expressError");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testMoves,
	u1Token,
	u2Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /moves */

describe("POST /moves", function() {
	test("works", async function() {
		const testMove = {
			name : "testMove",
			url  : "www.test1.com"
		};

		const resp = await request(app).post(`/moves`).send(testMove).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testMove
		});
	});

	// test("unauthorized if user isn't logged in", async function() {
	// 	const testMove = {
	// 		name : "testMove",
	// 		url  : "www.test2.com"
	// 	};

	// 	const resp = await request(app).post(`/moves`).send(testMove);

	// 	expect(resp.statusCode).toEqual(401);
	// });

	test("bad request if duplicate", async function() {
		const testMove = {
			name : "move3",
			url  : "www.move3test.org"
		};

		const resp = await request(app).post(`/moves`).send(testMove).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});

	test("bad request if invalid data", async function() {
		const testMove = {
			name  : 699,
			url   : 41,
			other : "this is not allowed"
		};

		const resp = await request(app).post(`/moves`).send(testMove).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});
});

/************************************** DELETE /moves/:name */

describe("DELETE /:name", function() {
	test("successfully deletes moves on the server", async function() {
		const resp = await request(app).delete(`/moves/${testMoves[0]}`).set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			deleted : testMoves[0]
		});
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).delete(`/moves/${testMoves[0]}`);
		expect(resp.statusCode).toEqual(401);
	});
});
