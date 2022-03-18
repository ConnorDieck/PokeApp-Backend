const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testTeamIds = [];
const testMoveIds = [];
const testAbilityIds = [];
const testItemIds = [];
const testNatureIds = [];
const testUsernames = [];

async function commonBeforeAll() {
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM users");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM teams");
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
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM teams_cards");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM cards_moves");

	const resultsUsers = await db.query(
		`
    INSERT INTO users (username, password, favorite_id)
    VALUES ('user1', $1, 257),
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
    INSERT INTO moves (name, type, url)
    VALUES  ('swords-dance', 'Normal', 'https://pokeapi.co/api/v2/move/14/'),
            ('mega-punch', 'Normal', 'https://pokeapi.co/api/v2/move/5/'),
            ('thunder-punch', 'Electric', 'https://pokeapi.co/api/v2/move/9/'),
            ('counter', 'Fighting', 'https://pokeapi.co/api/v2/move/68/'),
            ('seismic-toss', 'Fighting', 'https://pokeapi.co/api/v2/move/69/'),
            ('body-slam', 'Normal', 'https://pokeapi.co/api/v2/move/34/')
    RETURNING id`);
	testMoveIds.splice(0, 0, ...resultsMoves.rows.map(r => r.id));

	const resultsItems = await db.query(`
    INSERT INTO items (name, url)
    VALUES  ('soda-pop', 'https://pokeapi.co/api/v2/item/31/'),
            ('moomoo-milk', 'https://pokeapi.co/api/v2/item/33/'),
            ('escape-rope', 'https://pokeapi.co/api/v2/item/78/')
	RETURNING id`);
	testItemIds.splice(0, 0, ...resultsItems.rows.map(r => r.id));

	const resultsAbilities = await db.query(`
    INSERT INTO abilities (name, url)
    VALUES  ('speed-boost', 'https://pokeapi.co/api/v2/ability/3/'),
            ('justified', 'https://pokeapi.co/api/v2/ability/154/'),
            ('guts', 'https://pokeapi.co/api/v2/ability/62/')
	RETURNING id`);
	testAbilityIds.splice(0, 0, ...resultsAbilities.rows.map(r => r.id));

	const resultsNatures = await db.query(`
    INSERT INTO natures (name, url)
    VALUES  ('adamant', 'https://pokeapi.co/api/v2/nature/11/'),
            ('jolly', 'https://pokeapi.co/api/v2/nature/16/')
	RETURNING id`);
	testNatureIds.splice(0, 0, ...resultsNatures.rows.map(r => r.id));
}

async function commonBeforeEach() {
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");
}

async function commonAfterAll() {
	await db.end();
}

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
	testUsernames
};
