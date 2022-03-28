"use strict";

/** Routes for cards. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Team = require("../models/team");
const jsonschema = require("jsonschema");
const teamSchema = require("../schema/teamSchema.json");

const router = new express.Router();

/** GET / =>
 *      { cards: [ id, nickname, gender, nature, ability, art, species, item]...}
 * 
 * Authorization required: logged in
 */

router.get("/", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = res.locals.user;
		const result = await Team.getAll(user.username);
		return res.json(result);
	} catch (e) {
		return next(e);
	}
});

/** POST / =>
 *      { cards: [ id, nickname, gender, nature, ability, art, species, item]...}
 * 
 * Route to save a card.
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

module.exports = router;
