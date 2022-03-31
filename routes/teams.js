"use strict";

/** Routes for cards. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Team = require("../models/team");
const jsonschema = require("jsonschema");
const teamSchema = require("../schema/teamSchema.json");
const cardSchema = require("../schema/cardSchema.json");

const router = new express.Router();

/** GET / =>
 *      { teams: [ {name, username, id }, ...] }
 * 
 * Authorization required: none
 */

router.get("/", async function(req, res, next) {
	try {
		const user = res.locals.user;
		const teams = await Team.getAll(user.username);
		return res.json({ teams });
	} catch (e) {
		return next(e);
	}
});

/** GET /:teamId =>
 *      { [ {name, username, id, cards }, ...] }
 * 
 * Authorization required: none
 */

router.get("/:teamId", async function(req, res, next) {
	try {
		const teamId = req.params.teamId;
		const result = await Team.get(teamId);
		return res.json(result);
	} catch (e) {
		return next(e);
	}
});

/** POST / =>
 *      { name, username }
 * 
 * Route to save a team.
 * 
 * Authorization required: logged in
 */

router.post("/", ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, teamSchema);

		if (!validator.valid) {
			let listOfErrors = validator.errors.map(e => e.stack);
			let error = new BadRequestError(listOfErrors, 400);
			return next(error);
		}
		const user = res.locals.user;
		const newTeam = await Team.create(req.body.name, user.username);
		return res.status(201).json(newTeam);
	} catch (e) {
		return next(e);
	}
});

/** POST /:teamId/:cardId =>
 *     { cardId, teamId }
 * 
 * Route to save a card to a team.
 * 
 * Authorization required: logged in
 */

router.post("/:teamId/:cardId", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = res.locals.user;
		const newTeam = await Team.addCard(req.params.teamId, req.params.cardId, user.username);
		return res.status(201).json(newTeam);
	} catch (e) {
		return next(e);
	}
});

/** DELETE /:teamId/:cardId =>
 *     { deleted: cardId, from: teamId }
 * 
 * Route to delete a card from a team.
 * 
 * Authorization required: logged in
 */

router.delete("/:teamId/:cardId", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = res.locals.user;
		const teamId = req.params.teamId;
		const cardId = req.params.cardId;
		await Team.removeCard(teamId, cardId, user.username);
		return res.json({ deleted: +cardId, from: +teamId });
	} catch (e) {
		return next(e);
	}
});

/** EDIT /:teamId =>
 *     { id, name, username }
 * 
 * Route to update a team.
 * 
 * Authorization required: logged in
 */

router.patch("/:teamId", ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, teamSchema);

		if (!validator.valid) {
			let listOfErrors = validator.errors.map(e => e.stack);
			let error = new BadRequestError(listOfErrors, 400);
			return next(error);
		}
		const user = res.locals.user;
		const teamId = req.params.teamId;
		const updatedTeam = await Team.edit(teamId, req.body.name, user.username);
		return res.json(updatedTeam);
	} catch (e) {
		return next(e);
	}
});

/** DELETE /:teamId =>
 *     { deleted: teamId }
 * 
 * Route to delete a team.
 * 
 * Authorization required: logged in
 */

router.delete("/:teamId", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = res.locals.user;
		const teamId = req.params.teamId;
		await Team.remove(teamId, user.username);
		return res.json({ deleted: +teamId });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
