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
	testAbilities,
	testItems,
	testMoves,
	testNatures
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
			url  : "https://pokeapi.co/api/v2/move/85/"
		};

		const move = await Move.addToDb(testMove);

		expect(move).toEqual({
			...testMove
		});

		const result = await db.query(
			`SELECT name
             FROM moves
             WHERE name = $1`,
			[ move.name ]
		);

		expect(result.rows[0].length).not.toEqual(0);
	});

	test("returns bad request error upon duplicate input", async function() {
		const testMove = {
			name : "Thunderbolt",
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
			url       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 25,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const card = await Card.create(testCard);

		const moves = await Move.getAllFromCard(card.id);

		expect(moves).toEqual(testCard.moves);
	});

	test("throws not found error if card has no moves", async function() {
		const testCard = {
			nickname  : "Zap",
			gender    : false,
			url       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 25,
			item      : testItems[0],
			moves     : []
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
			url       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 25,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const card = await Card.create(testCard);
		await Move.removeFromCard(testMoves[0], card.id);
		const moves = await Move.getAllFromCard(card.id);

		expect(moves).toEqual(testCard.moves.slice(1, 4));
	});

	test("throws not found error if card has no moves", async function() {
		const testCard = {
			nickname  : "Zap",
			gender    : false,
			url       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 25,
			item      : testItems[0],
			moves     : []
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

/************************************** removeFromDb */

describe("removeFromDb", function() {
	test("works", async function() {
		await Move.removeFromDb(testMoves[0]);

		const result = await db.query(
			`SELECT name
			 FROM moves
			 WHERE name = $1`,
			[ testMoves[0] ]
		);

		expect(result.rows.length).toEqual(0);
	});

	test("throws not found error if move does not exist", async function() {
		try {
			await Move.removeFromDb("nopenopenope");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
