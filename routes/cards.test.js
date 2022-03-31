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

/************************************** POST /cards */

describe("POST /cards", function() {
	test("successfully sends a card to the server", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		};

		const resp = await request(app).post("/cards").send(testCard).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			...testCard,
			username : "u1",
			id       : expect.any(Number)
		});
	});

	test("bad request with invalid data", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : [ 0, 1, 2, 3, 4 ]
		};

		const resp = await request(app).post("/cards").send(testCard).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});

	test("unauthorized if not logged in", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		};

		const resp = await request(app).post("/cards").send(testCard);

		expect(resp.statusCode).toEqual(401);
	});
});

/************************************** GET /cards */

describe("GET /cards", function() {
	test("successfully gets cards from the server", async function() {
		const resp = await request(app).get("/cards").set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		expect(resp.body.cards).toEqual([
			{
				id        : testCardIds[0],
				nickname  : "c1",
				gender    : true,
				art       : "www.test.org",
				natureId  : testNatureIds[0],
				abilityId : testAbilityIds[0],
				speciesId : 1,
				itemId    : testItemIds[0]
			}
		]);
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).get("/cards");
		expect(resp.statusCode).toEqual(401);
	});
});

/************************************** GET /cards/:cardId */

describe("GET /cards/:cardId", function() {
	test("successfully gets card from the server", async function() {
		const resp = await request(app).get(`/cards/${testCardIds[0]}`).set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		expect(resp.body).toEqual({
			id        : testCardIds[0],
			username  : "u1",
			nickname  : "c1",
			gender    : true,
			art       : "www.test.org",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 1,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		});
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).get("/cards");
		expect(resp.statusCode).toEqual(401);
	});
});

/************************************** PATCH /cards/:cardId */

describe("PATCH /cards/:cardId", function() {
	test("successfully updates cards on the server", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		};

		const resp = await request(app)
			.patch(`/cards/${testCardIds[0]}`)
			.send(testCard)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(200);
		expect(resp.body).toEqual({
			...testCard,
			username : "u1",
			id       : testCardIds[0]
		});
	});

	test("bad request with invalid data", async function() {
		const testCard = {
			nickname  : 3,
			gender    : true,
			art       : "lol",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : "string",
			itemId    : testItemIds[0],
			moveIds   : [ 0, 1, 2, 3, 4 ]
		};

		const resp = await request(app)
			.patch(`/cards/${testCardIds[0]}`)
			.send(testCard)
			.set("authorization", `Bearer ${u1Token}`);

		expect(resp.statusCode).toEqual(400);
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).patch(`/cards/${testCardIds[0]}`);
		expect(resp.statusCode).toEqual(401);
	});

	test("unauthorized if wrong user", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		};
		const resp = await request(app)
			.patch(`/cards/${testCardIds[0]}`)
			.send(testCard)
			.set("authorization", `Bearer ${u2Token}`);
		console.log(resp.text);
		expect(resp.statusCode).toEqual(401);
	});
});

/************************************** DELETE /cards/:cardId */

describe("DELETE /cards/:cardId", function() {
	test("successfully deletes cards on the server", async function() {
		const resp = await request(app).delete(`/cards/${testCardIds[0]}`).set("authorization", `Bearer ${u1Token}`);
		expect(resp.body).toEqual({
			deleted : testCardIds[0]
		});
	});

	test("unauthorized if not logged in", async function() {
		const resp = await request(app).delete(`/cards/${testCardIds[0]}`);
		expect(resp.statusCode).toEqual(401);
	});

	test("unauthorized if wrong user", async function() {
		const resp = await request(app).delete(`/cards/${testCardIds[0]}`).set("authorization", `Bearer ${u2Token}`);
		expect(resp.statusCode).toEqual(401);
	});
});
