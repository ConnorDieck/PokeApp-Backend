"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Move = require("./move.js");
const Card = require("./card.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testAbilityIds,
	testItemIds,
	testMoveIds,
	testNatureIds,
	testTeamIds,
	testUsernames
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** addtoDb */

describe("addToDb", function() {
	test("works", async function() {
		const testMove = {
			name : "Thunderbolt",
			type : "Electric",
			url  : "https://pokeapi.co/api/v2/move/85/"
		};

		const move = await Move.addToDb(testMove);

		expect(move).toEqual({
			...testMove,
			id : expect.any(Number)
		});

		const result = await db.query(
			`SELECT id
             FROM moves
             WHERE id = $1`,
			[ move.id ]
		);

		expect(result.rows[0].length).not.toEqual(0);
	});

	test("returns bad request error upon duplicate input", async function() {
		const testMove = {
			name : "Thunderbolt",
			type : "Electric",
			url  : "https://pokeapi.co/api/v2/move/85/"
		};

		try {
			await Move.addToDb(testMove);
			await Move.addToDb(testMove);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** getAllFromCard */

describe("getAllFromCard", function() {
	test("works", async function() {
		const testCard = {
			nickname  : "Zap",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 25,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};

		const card = await Card.create(testCard);

		const moves = await Move.getAllFromCard(card.id);

		expect(moves).toEqual(testCard.moveIds);
	});

	test("throws not found error if card has no moves", async function() {
		const testCard = {
			nickname  : "Zap",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 25,
			itemId    : testItemIds[0],
			moveIds   : []
		};

		const card = await Card.create(testCard);

		try {
			await Move.getAllFromCard(card.id);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** removeFromCard */

describe("removeFromCard", function() {
	test("works", async function() {
		const testCard = {
			nickname  : "Zap",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 25,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};

		const card = await Card.create(testCard);
		await Move.removeFromCard(testMoveIds[0], card.id);
		const moves = await Move.getAllFromCard(card.id);

		expect(moves).toEqual(testCard.moveIds.slice(1, 4));
	});

	test("throws not found error if card has no moves", async function() {
		const testCard = {
			nickname  : "Zap",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 25,
			itemId    : testItemIds[0],
			moveIds   : []
		};

		const card = await Card.create(testCard);

		try {
			const moves = await Move.getAllFromCard(card.id);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
