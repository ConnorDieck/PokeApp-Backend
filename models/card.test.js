"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
const Card = require("./card.js");
const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testAbilities,
	testItems,
	testMoves,
	testNatures,
	testUsernames
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getAll */

describe("getAll", function() {
	test("works", async function() {
		const testCard1 = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const testCard2 = {
			name      : "Zap",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 25,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		await Card.create(testCard1, testUsernames[0]);
		await Card.create(testCard2, testUsernames[0]);

		// Card.getAll() does not return move ids
		delete testCard1.moves;
		delete testCard2.moves;

		const cards = await Card.getAll(testUsernames[0]);

		expect(cards).toEqual([
			{
				...testCard1,
				id : expect.any(Number)
			},
			{
				...testCard2,
				id : expect.any(Number)
			}
		]);
	});

	test("Not found error with non-existent username", async function() {
		try {
			await Card.getAll("notAUser");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** create */

describe("create", function() {
	test("works", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		let card = await Card.create(testCard, testUsernames[0]);
		expect(card).toEqual({
			...testCard,
			id       : expect.any(Number),
			username : testUsernames[0]
		});

		const result = await db.query(
			`SELECT name, art, username, gender, nature, ability, art, species_id AS "speciesId", item
             FROM cards
             WHERE name = 'Spicy'`
		);

		expect(result.rows).toEqual([
			{
				name      : "Spicy",
				gender    : true,
				username  : "user1",
				art       :
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
				nature    : testNatures[0],
				ability   : testAbilities[0],
				speciesId : 257,
				item      : testItems[0]
			}
		]);

		const moveResult = await db.query(
			`SELECT move
             FROM cards_moves
             WHERE card_id = $1`,
			[ card.id ]
		);

		expect(moveResult.rows.map(r => r.move)).toEqual(testMoves.slice(0, 4));
	});

	test("bad request with dupe for same user", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};
		try {
			await Card.create(testCard, testUsernames[0]);
			await Card.create(testCard, testUsernames[0]);
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** get */

describe("get", function() {
	test("works", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const newCard = await Card.create(testCard, testUsernames[0]);

		const card = await Card.get(newCard.id);

		expect(card).toEqual({
			...testCard,
			id       : expect.any(Number),
			username : testUsernames[0]
		});
	});

	test("Not found error with non-existent id", async function() {
		try {
			await Card.get(9999);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** edit */

describe("edit", function() {
	test("works", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const newCard = await Card.create(testCard, testUsernames[0]);

		const newData = {
			name      : "New hotness",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			nature    : testNatures[1],
			ability   : testAbilities[1],
			speciesId : 257,
			item      : testItems[1],
			moves     : testMoves.slice(1, 5)
		};

		const card = await Card.edit(newCard.id, testUsernames[0], newData);

		expect(card).not.toEqual({
			...testCard,
			id       : expect.any(Number),
			username : testUsernames[0]
		});

		const result = await db.query(
			`SELECT name, art, username, gender, nature, ability, art, species_id AS "speciesId", item
             FROM cards
             WHERE name = 'New hotness'`
		);

		expect(result.rows[0]).toEqual({
			name      : "New hotness",
			gender    : false,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			nature    : testNatures[1],
			ability   : testAbilities[1],
			speciesId : 257,
			item      : testItems[1],
			username  : testUsernames[0]
		});

		const moveResults = await db.query(
			`SELECT move
             FROM cards_moves
             WHERE card_id = $1`,
			[ card.id ]
		);

		const newmoves = moveResults.rows.map(r => r.move);

		expect(newmoves).toEqual(newData.moves);
	});

	test("Bad request error with no data", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const newCard = await Card.create(testCard, testUsernames[0]);
		try {
			await Card.edit(newCard.id, testUsernames[0], {});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** delete */

describe("delete", function() {
	test("works", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const card = await Card.create(testCard, testUsernames[0]);

		await Card.delete(card.id, testUsernames[0]);

		const results = await db.query(
			`SELECT name, gender, art
                FROM cards
                WHERE id = $1`,
			[ card.id ]
		);

		expect(results.rows.length).toEqual(0);
	});

	test("deletes associated moves", async function() {
		const testCard = {
			name      : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 257,
			item      : testItems[0],
			moves     : testMoves.slice(0, 4)
		};

		const card = await Card.create(testCard, testUsernames[0]);

		await Card.delete(card.id, testUsernames[0]);

		const results = await db.query(
			`SELECT move
                FROM cards_moves
                WHERE card_id = $1`,
			[ card.id ]
		);

		expect(results.rows.length).toEqual(0);
	});

	test("returns unauthorized if user doesn't own card with given id", async function() {
		try {
			await Card.delete(9999, testUsernames[0]);
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});
