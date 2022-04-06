const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testTeamIds = [];
const testMoves = [];
const testAbilities = [];
const testItems = [ "abomasite", "absolite", "absorb-bulb" ];
const testNatures = [ "bold", "adamant", "jolly" ];
const testUsernames = [];
const testCardIds = [];

async function commonBeforeAll() {
	// Do nothing
}

async function commonBeforeEach() {
	// TODO: Optimize tests
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

	const resultsUsers = await db.query(
		`
    INSERT INTO users (username, password, favorite_id)
    VALUES ('user1', $1, 288),
           ('user2', $2, 68),
           ('user3', $3, 475)
	RETURNING username`,
		[
			await bcrypt.hash("upass1", BCRYPT_WORK_FACTOR),
			await bcrypt.hash("upass2", BCRYPT_WORK_FACTOR),
			await bcrypt.hash("upass3", BCRYPT_WORK_FACTOR)
		]
	);
	testUsernames.splice(0, 0, ...resultsUsers.rows.map(r => r.username));

	const resultsTeams = await db.query(`
    INSERT INTO teams (name, username)
    VALUES  ('u1team', 'user1'),
            ('u2team', 'user2'),
            ('u3team', 'user3')
    RETURNING id`);
	testTeamIds.splice(0, 0, ...resultsTeams.rows.map(r => r.id));

	const resultsMoves = await db.query(`
    INSERT INTO moves (name, url)
    VALUES  ('swords-dance', 'https://pokeapi.co/api/v2/move/14/'),
            ('mega-punch', 'https://pokeapi.co/api/v2/move/5/'),
            ('thunder-punch', 'https://pokeapi.co/api/v2/move/9/'),
            ('counter', , 'https://pokeapi.co/api/v2/move/68/'),
            ('seismic-toss', 'https://pokeapi.co/api/v2/move/69/'),
            ('body-slam', 'https://pokeapi.co/api/v2/move/34/')
    RETURNING name`);
	testMoves.splice(0, 0, ...resultsMoves.rows.map(r => r.name));

	const resultsAbilities = await db.query(`
    INSERT INTO abilities (name, url)
    VALUES  ('speed-boost', 'https://pokeapi.co/api/v2/ability/3/'),
            ('justified', 'https://pokeapi.co/api/v2/ability/154/'),
            ('guts', 'https://pokeapi.co/api/v2/ability/62/')
	RETURNING name`);
	testAbilities.splice(0, 0, ...resultsAbilities.rows.map(r => r.name));

	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");

	// // Since creating a card requires committing a transaction, we'll need to manually delete those tables after testing
	// await db.query("DELETE FROM cards");
	// await db.query("DELETE FROM cards_moves");
}

async function commonAfterAll() {
	await db.end();
}

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
	testUsernames,
	testCardIds
};
