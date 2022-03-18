"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
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

/************************************** create */

describe("create", function() {
	test("works", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			move1Id   : testMoveIds[0],
			move2Id   : testMoveIds[1],
			move3Id   : testMoveIds[2],
			move4Id   : testMoveIds[3]
		};

		let card = await Card.create(testCard, testUsernames[0]);
		expect(card).toEqual({
			...testCard,
			id       : expect.any(Number),
			username : testUsernames[0]
		});

		const result = await db.query(
			`SELECT nickname, art, username, gender, nature_id AS "natureId", ability_id AS "abilityId", art, species_id AS "speciesId", item_id AS "itemId"
             FROM cards
             WHERE nickname = 'Spicy'`
		);

		expect(result.rows).toEqual([
			{
				nickname  : "Spicy",
				gender    : true,
				username  : "user1",
				art       :
					"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
				natureId  : testNatureIds[0],
				abilityId : testAbilityIds[0],
				speciesId : 257,
				itemId    : testItemIds[0]
			}
		]);
	});

	test("bad request with dupe for same user", async function() {
		const testCard = {
			nickname  : "Spicy",
			gender    : true,
			art       :
				"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 257,
			itemId    : testItemIds[0],
			move1Id   : testMoveIds[0],
			move2Id   : testMoveIds[1],
			move3Id   : testMoveIds[2],
			move4Id   : testMoveIds[3]
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
