"use strict";

const db = require("../db.js");
const User = require("./user");
const Card = require("./card");
const { BadRequestError, NotFoundError, UnauthorizedError } = require("../expressError");
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

/************************************** authenticate */

describe("authenticate", function() {
	test("works", async function() {
		const user = await User.authenticate("user1", "upass1");
		expect(user).toEqual({
			username   : "user1",
			favoriteId : 257
		});
	});

	test("unauth if no such user", async function() {
		try {
			await User.authenticate("nope", "password");
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});

	test("unauth if wrong password", async function() {
		try {
			await User.authenticate("c1", "wrong");
			fail();
		} catch (err) {
			expect(err instanceof UnauthorizedError).toBeTruthy();
		}
	});
});

/************************************** register */

describe("register", function() {
	const newUser = {
		username   : "new",
		favoriteId : 25
	};

	test("works", async function() {
		let user = await User.register({
			...newUser,
			password : "password"
		});
		expect(user).toEqual(newUser);
		const found = await db.query("SELECT * FROM users WHERE username = 'new'");
		expect(found.rows.length).toEqual(1);
		expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
	});

	test("bad request with dup data", async function() {
		try {
			await User.register({
				...newUser,
				password : "password"
			});
			await User.register({
				...newUser,
				password : "password"
			});
			fail();
		} catch (err) {
			expect(err instanceof BadRequestError).toBeTruthy();
		}
	});
});

/************************************** findAll */

describe("findAll", function() {
	test("works", async function() {
		const users = await User.findAll();
		expect(users).toEqual([
			{
				username   : "user1",
				favoriteId : 257
			},
			{
				username   : "user2",
				favoriteId : 68
			},
			{
				username   : "user3",
				favoriteId : 475
			}
		]);
	});
});

/************************************** get */

describe("get", function() {
	test("works", async function() {
		let user = await User.get("user1");
		expect(user).toEqual({
			username   : "user1",
			favoriteId : 257,
			favorite   : {
				id        : expect.any(Number),
				pokedexNo : 257,
				name      : "Blaziken",
				url       : "https://pokeapi.co/api/v2/pokemon/257",
				sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png",
				type1     : "Fire",
				type2     : "Fighting"
			}
		});
	});

	test("not found if no such user", async function() {
		try {
			await User.get("nope");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** remove */

describe("remove", function() {
	test("works", async function() {
		await User.remove("user1");
		const res = await db.query("SELECT * FROM users WHERE username='user1'");
		expect(res.rows.length).toEqual(0);
	});

	test("also removes associated cards and teams", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds.slice(0, 4)
		};
		const card = await Card.create(testCard, testUsernames[0]);

		const result = await db.query(
			`INSERT INTO teams_cards
             (team_id, card_id)
             VALUES ($1, $2)
             RETURNING team_id, card_id`,
			[ testTeamIds[0], card.id ]
		);

		expect(result.rows.length).not.toEqual(0);

		await User.remove(testUsernames[0]);

		const deletedTeams = await db.query(
			`SELECT id
             FROM teams
             WHERE username = $1`,
			[ testUsernames[0] ]
		);

		const deletedCards = await db.query(
			`SELECT id
             FROM cards
             WHERE username = $1`,
			[ testUsernames[0] ]
		);

		expect(deletedTeams.rows.length).toEqual(0);
		expect(deletedCards.rows.length).toEqual(0);
	});

	test("not found if no such user", async function() {
		try {
			await User.remove("nope");
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});

/************************************** updateFavorite */

describe("updateFavorite", function() {
	test("works", async function() {
		// MQ: Why is the earlier delete test not rolled back? user1 is gone for the remainder of the test suite

		// const check = await db.query(
		// 	`SELECT *
		// 	 FROM users`
		// );

		// console.log(check.rows);
		const result = await User.updateFavorite("user2", 257);

		expect(result).toEqual({
			username   : "user2",
			favoriteId : 257,
			favorite   : {
				id        : expect.any(Number),
				pokedexNo : 257,
				name      : "Blaziken",
				url       : "https://pokeapi.co/api/v2/pokemon/257",
				sprite    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/257.png",
				type1     : "Fire",
				type2     : "Fighting"
			}
		});
	});

	test("not found if no such user", async function() {
		try {
			await User.updateFavorite("nope", 6);
			fail();
		} catch (err) {
			expect(err instanceof NotFoundError).toBeTruthy();
		}
	});
});
