const bcrypt = require("bcrypt");

const db = require("../db.js");
const User = require("../models/user");
const Card = require("../models/card");
const Team = require("../models/team");
const Item = require("../models/item");
const Ability = require("../models/ability");
const Nature = require("../models/nature");
const Move = require("../models/move.js");
const { createToken } = require("../helpers/tokens");
const { processSQLFile, sqlForPartialUpdate } = require("../helpers/sql");

const testTeamIds = [];
const testMoveIds = [];
const testAbilityIds = [];
const testItemIds = [];
const testNatureIds = [];
const testCardIds = [];

async function commonBeforeAll() {
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM teams_cards");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM cards_moves");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM teams");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM users");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM moves");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM items");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM abilities");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM natures");
	// // noinspection SqlWithoutWhere
	// await db.query("DELETE FROM cards");
	// await User.register({
	// 	username   : "u1",
	// 	password   : "password1",
	// 	favoriteId : 1
	// });
	// await User.register({
	// 	username   : "u2",
	// 	password   : "password2",
	// 	favoriteId : 2
	// });
	// await User.register({
	// 	username   : "u3",
	// 	password   : "password3",
	// 	favoriteId : 3
	// });
	// testTeamIds[0] = (await Team.create("team1", "u1")).id;
	// testTeamIds[1] = (await Team.create("team2", "u2")).id;
	// testTeamIds[2] = (await Team.create("team3", "u3")).id;
	// testTeamIds[3] = (await Team.create("team4", "u1")).id;
	// testItemIds[0] = (await Item.addToDb({
	// 	name : "item",
	// 	url  : "www.test.org"
	// })).id;
	// testAbilityIds[0] = (await Ability.addToDb({
	// 	name : "ability",
	// 	url  : "www.test.org"
	// })).id;
	// testNatureIds[0] = (await Nature.addToDb({
	// 	name : "nature",
	// 	url  : "www.test.org"
	// })).id;
	// testMoveIds[0] = (await Move.addToDb({
	// 	name : "move1",
	// 	type : "testtype",
	// 	url  : "www.move1test.org"
	// })).id;
	// testMoveIds[1] = (await Move.addToDb({
	// 	name : "move2",
	// 	type : "testtype",
	// 	url  : "www.move2test.org"
	// })).id;
	// testMoveIds[2] = (await Move.addToDb({
	// 	name : "move3",
	// 	type : "testtype",
	// 	url  : "www.move3test.org"
	// })).id;
	// testMoveIds[3] = (await Move.addToDb({
	// 	name : "move4",
	// 	type : "testtype",
	// 	url  : "www.move4test.org"
	// })).id;
	// testCardIds[0] = (await Card.create(
	// 	{
	// 		nickname  : "c1",
	// 		gender    : true,
	// 		art       : "www.test.org",
	// 		natureId  : testNatureIds[0],
	// 		abilityId : testAbilityIds[0],
	// 		speciesId : 1,
	// 		itemId    : testItemIds[0],
	// 		moveIds   : testMoveIds
	// 	},
	// 	"u1"
	// )).id;
	// testCardIds[1] = (await Card.create(
	// 	{
	// 		nickname  : "c2",
	// 		gender    : false,
	// 		art       : "www.test.org",
	// 		natureId  : testNatureIds[0],
	// 		abilityId : testAbilityIds[0],
	// 		speciesId : 2,
	// 		itemId    : testItemIds[0],
	// 		moveIds   : testMoveIds
	// 	},
	// 	"u2"
	// )).id;
	// testCardIds[2] = (await Card.create(
	// 	{
	// 		nickname  : "c3",
	// 		gender    : false,
	// 		art       : "www.test.org",
	// 		natureId  : testNatureIds[0],
	// 		abilityId : testAbilityIds[0],
	// 		speciesId : 3,
	// 		itemId    : testItemIds[0],
	// 		moveIds   : testMoveIds
	// 	},
	// 	"u3"
	// )).id;
	// await Team.addCard(testTeamIds[0], testCardIds[0], "u1");
	// await Team.addCard(testTeamIds[1], testCardIds[1], "u2");
	// await Team.addCard(testTeamIds[2], testCardIds[2], "u3");
	// await Team.addCard(testTeamIds[3], testCardIds[0], "u1");
	// await Team.addCard(testTeamIds[3], testCardIds[1], "u1");
	// await Team.addCard(testTeamIds[3], testCardIds[2], "u1");
}

async function commonBeforeEach() {
	// TODO: Optimize tests
	processSQLFile("pokeapp.sql");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM teams_cards");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM cards_moves");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM teams");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM moves");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM items");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM abilities");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM natures");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM cards");

	await User.register({
		username   : "u1",
		password   : "password1",
		favoriteId : 1
	});
	await User.register({
		username   : "u2",
		password   : "password2",
		favoriteId : 2
	});
	await User.register({
		username   : "u3",
		password   : "password3",
		favoriteId : 3
	});

	testTeamIds[0] = (await Team.create("team1", "u1")).id;
	testTeamIds[1] = (await Team.create("team2", "u2")).id;
	testTeamIds[2] = (await Team.create("team3", "u3")).id;
	testTeamIds[3] = (await Team.create("team4", "u1")).id;

	testItemIds[0] = (await db.query(
		`SELECT id
		 FROM items
		 WHERE id=1`
	)).id;

	testAbilityIds[0] = (await Ability.addToDb({
		name : "ability",
		url  : "www.test.org"
	})).id;

	testNatureIds[0] = (await db.query(
		`SELECT id
		 FROM natures
		 WHERE id=1`
	)).id;

	testMoveIds[0] = (await Move.addToDb({
		name : "move1",
		type : "testtype",
		url  : "www.move1test.org"
	})).id;
	testMoveIds[1] = (await Move.addToDb({
		name : "move2",
		type : "testtype",
		url  : "www.move2test.org"
	})).id;
	testMoveIds[2] = (await Move.addToDb({
		name : "move3",
		type : "testtype",
		url  : "www.move3test.org"
	})).id;
	testMoveIds[3] = (await Move.addToDb({
		name : "move4",
		type : "testtype",
		url  : "www.move4test.org"
	})).id;

	testCardIds[0] = (await Card.create(
		{
			nickname  : "c1",
			gender    : true,
			art       : "www.test.org",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 1,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		},
		"u1"
	)).id;
	testCardIds[1] = (await Card.create(
		{
			nickname  : "c2",
			gender    : false,
			art       : "www.test.org",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 2,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		},
		"u2"
	)).id;
	testCardIds[2] = (await Card.create(
		{
			nickname  : "c3",
			gender    : false,
			art       : "www.test.org",
			natureId  : testNatureIds[0],
			abilityId : testAbilityIds[0],
			speciesId : 3,
			itemId    : testItemIds[0],
			moveIds   : testMoveIds
		},
		"u3"
	)).id;

	await Team.addCard(testTeamIds[0], testCardIds[0], "u1");
	await Team.addCard(testTeamIds[1], testCardIds[1], "u2");
	await Team.addCard(testTeamIds[2], testCardIds[2], "u3");
	await Team.addCard(testTeamIds[3], testCardIds[0], "u1");
	await Team.addCard(testTeamIds[3], testCardIds[1], "u1");
	await Team.addCard(testTeamIds[3], testCardIds[2], "u1");
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");

	// Since creating a card requires committing a transaction, we'll need to manually delete those tables after testing
	await db.query("DELETE FROM cards");
	await db.query("DELETE FROM cards_moves");
}

async function commonAfterAll() {
	await db.end();
}

const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });
const u3Token = createToken({ username: "u3" });

module.exports = {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	testAbilityIds,
	testItemIds,
	testMoveIds,
	testTeamIds,
	testNatureIds,
	testCardIds,
	u1Token,
	u2Token,
	u3Token
};
