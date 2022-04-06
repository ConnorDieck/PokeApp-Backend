const bcrypt = require("bcrypt");

const db = require("../db.js");
const User = require("../models/user");
const Card = require("../models/card");
const Team = require("../models/team");
const Ability = require("../models/ability");
const Move = require("../models/move.js");
const Nature = require("../models/nature.js");
const { createToken } = require("../helpers/tokens");
const { processSQLFile, sqlForPartialUpdate } = require("../helpers/sql");
const Item = require("../models/item.js");

const testTeamIds = [];
const testMoves = [];
const testAbilities = [];
let testItems = [];
let testNatures = [];
const testCardIds = [];

async function commonBeforeAll() {
	//Do nothing
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
	await db.query("DELETE FROM abilities");
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

	itemRes = await Item.getAll();
	testItems.splice(0, 0, ...itemRes.map(r => r.name));

	natureRes = await Nature.getAll();
	testNatures.splice(0, 0, ...natureRes.map(r => r.name));

	testAbilities[0] = (await Ability.addToDb({
		name : "ability",
		url  : "www.test.org"
	})).name;

	testMoves[0] = (await Move.addToDb({
		name : "move1",
		url  : "www.move1test.org"
	})).name;
	testMoves[1] = (await Move.addToDb({
		name : "move2",
		url  : "www.move2test.org"
	})).name;
	testMoves[2] = (await Move.addToDb({
		name : "move3",
		url  : "www.move3test.org"
	})).name;
	testMoves[3] = (await Move.addToDb({
		name : "move4",
		url  : "www.move4test.org"
	})).name;

	testCardIds[0] = (await Card.create(
		{
			name      : "c1",
			gender    : true,
			art       : "www.test.org",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 1,
			item      : testItems[0],
			moves     : testMoves
		},
		"u1"
	)).id;
	testCardIds[1] = (await Card.create(
		{
			name      : "c2",
			gender    : false,
			art       : "www.test.org",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 2,
			item      : testItems[0],
			moves     : testMoves
		},
		"u2"
	)).id;
	testCardIds[2] = (await Card.create(
		{
			name      : "c3",
			gender    : false,
			art       : "www.test.org",
			nature    : testNatures[0],
			ability   : testAbilities[0],
			speciesId : 3,
			item      : testItems[0],
			moves     : testMoves
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
	testAbilities,
	testItems,
	testMoves,
	testTeamIds,
	testNatures,
	testCardIds,
	u1Token,
	u2Token,
	u3Token
};
