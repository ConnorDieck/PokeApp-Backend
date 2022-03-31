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

/************************************** GET /users/:username */

describe("GET /users/:username", function() {
	test("works for same user", async function() {
		const resp = await request(app).get(`/users/u1`).set("authorization", `Bearer ${u1Token}`);
		expect(resp.body.user).toEqual({
			username   : "u1",
			favoriteId : 1,
			favorite   : {
				id        : 1,
				name      : "Bulbasaur",
				pokedexNo : 1,
				sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
				type1     : "Grass",
				type2     : "Poison",
				url       : "https://pokeapi.co/api/v2/pokemon/1"
			}
		});
	});

	test("unauth for anon", async function() {
		const resp = await request(app).get(`/users/u1`);
		expect(resp.statusCode).toEqual(401);
	});

	test("not found if user not found", async function() {
		const resp = await request(app).get(`/users/nope`).set("authorization", `Bearer ${u1Token}`);
		expect(resp.statusCode).toEqual(404);
	});
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function() {
	test("works for same user", async function() {
		const resp = await request(app).delete(`/users/u1`).set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({ deleted: "u1" });
	});

	test("unauth if not same user", async function() {
		const resp = await request(app).delete(`/users/u1`).set("authorization", `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(401);
	});

	test("unauth for anon", async function() {
		const resp = await request(app).delete(`/users/u1`);
		expect(resp.statusCode).toEqual(401);
	});
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", function() {
	test("works to update favorite", async function() {
		const resp = await request(app).patch(`/users/u1`).send({ id: 6 }).set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			username   : "u1",
			favoriteId : 6,
			favorite   : {
				id        : 6,
				pokedexNo : 6,
				name      : "Charizard",
				url       : "https://pokeapi.co/api/v2/pokemon/6",
				sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
				type1     : "Fire",
				type2     : "Flying"
			}
		});
	});

	test("unauth if not same user", async function() {
		const resp = await request(app).patch(`/users/u1`).send({ id: 6 }).set("authorization", `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(401);
	});

	test("unauth for anon", async function() {
		const resp = await request(app).patch(`/users/u1`).send({ id: 6 });
		expect(resp.statusCode).toEqual(401);
	});
});
