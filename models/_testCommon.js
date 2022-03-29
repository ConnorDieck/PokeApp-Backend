const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testTeamIds = [];
const testMoveIds = [];
const testAbilityIds = [];
const testItemIds = [];
const testNatureIds = [];
const testUsernames = [];
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
	// const resultsUsers = await db.query(
	// 	`
	// INSERT INTO users (username, password, favorite_id)
	// VALUES ('user1', $1, 257),
	//        ('user2', $2, 68),
	//        ('user3', $3, 475)
	// RETURNING username`,
	// 	[
	// 		await bcrypt.hash("upass1", BCRYPT_WORK_FACTOR),
	// 		await bcrypt.hash("upass2", BCRYPT_WORK_FACTOR),
	// 		await bcrypt.hash("upass3", BCRYPT_WORK_FACTOR)
	// 	]
	// );
	// testUsernames.splice(0, 0, ...resultsUsers.rows.map(r => r.username));
	// const resultsTeams = await db.query(`
	// INSERT INTO teams (name, username)
	// VALUES  ('u1team', 'user1'),
	//         ('u2team', 'user2'),
	//         ('u3team', 'user3')
	// RETURNING id`);
	// testTeamIds.splice(0, 0, ...resultsTeams.rows.map(r => r.id));
	// const resultsMoves = await db.query(`
	// INSERT INTO moves (name, type, url)
	// VALUES  ('swords-dance', 'Normal', 'https://pokeapi.co/api/v2/move/14/'),
	//         ('mega-punch', 'Normal', 'https://pokeapi.co/api/v2/move/5/'),
	//         ('thunder-punch', 'Electric', 'https://pokeapi.co/api/v2/move/9/'),
	//         ('counter', 'Fighting', 'https://pokeapi.co/api/v2/move/68/'),
	//         ('seismic-toss', 'Fighting', 'https://pokeapi.co/api/v2/move/69/'),
	//         ('body-slam', 'Normal', 'https://pokeapi.co/api/v2/move/34/')
	// RETURNING id`);
	// testMoveIds.splice(0, 0, ...resultsMoves.rows.map(r => r.id));
	// const resultsItems = await db.query(`
	// INSERT INTO items (name, url)
	// VALUES  ('soda-pop', 'https://pokeapi.co/api/v2/item/31/'),
	//         ('moomoo-milk', 'https://pokeapi.co/api/v2/item/33/'),
	//         ('escape-rope', 'https://pokeapi.co/api/v2/item/78/')
	// RETURNING id`);
	// testItemIds.splice(0, 0, ...resultsItems.rows.map(r => r.id));
	// const resultsAbilities = await db.query(`
	// INSERT INTO abilities (name, url)
	// VALUES  ('speed-boost', 'https://pokeapi.co/api/v2/ability/3/'),
	//         ('justified', 'https://pokeapi.co/api/v2/ability/154/'),
	//         ('guts', 'https://pokeapi.co/api/v2/ability/62/')
	// RETURNING id`);
	// testAbilityIds.splice(0, 0, ...resultsAbilities.rows.map(r => r.id));
	// const resultsNatures = await db.query(`
	// INSERT INTO natures (name, url)
	// VALUES  ('adamant', 'https://pokeapi.co/api/v2/nature/11/'),
	//         ('jolly', 'https://pokeapi.co/api/v2/nature/16/')
	// RETURNING id`);
	// testNatureIds.splice(0, 0, ...resultsNatures.rows.map(r => r.id));
	/** To discuss: this code doesn't work in testing because cards are only added to the table in development (when COMMIT can be run) */
	// const resultsCards = await db.query(
	// 	`
	// INSERT INTO cards (nickname, gender, art, username, nature_id, ability_id, species_id, item_id)
	// VALUES ('c1', true, 'art1', $1, $2, $3, 1, $4),
	// 	   ('c2', false, 'art2', $5, $6, $7, 2, $8),
	// 	   ('c3', false, 'art3', $9, $10, $11, 2, $12)
	// RETURNING id`,
	// 	[
	// 		testUsernames[0],
	// 		testNatureIds[0],
	// 		testAbilityIds[0],
	// 		testItemIds[0],
	// 		testUsernames[1],
	// 		testNatureIds[1],
	// 		testAbilityIds[1],
	// 		testItemIds[1],
	// 		testUsernames[1],
	// 		testNatureIds[1],
	// 		testAbilityIds[1],
	// 		testItemIds[1]
	// 	]
	// );
	// console.log("_testCommon card tables", resultsCards.rows);
	// testCardIds.splice(0, 0, ...resultsCards.rows.map(r => r.id));
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
	await db.query("DELETE FROM items");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM abilities");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM natures");
	// noinspection SqlWithoutWhere
	await db.query("DELETE FROM cards");

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
	testAbilityIds,
	testItemIds,
	testMoveIds,
	testTeamIds,
	testNatureIds,
	testUsernames,
	testCardIds
};
