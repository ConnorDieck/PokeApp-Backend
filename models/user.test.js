"use strict";

const db = require("../db.js");
const User = require("./user");
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

//   describe("updateFavorite", function () {
//     test("works", async function () {

//     });

//     test("not found if no such job", async function () {
//       try {

//       } catch (err) {
//         expect(err instanceof NotFoundError).toBeTruthy();
//       }
//     });

//     test("not found if no such user", async function () {
//       try {

//         fail();
//       } catch (err) {
//         expect(err instanceof NotFoundError).toBeTruthy();
//       }
//     });
//   });
