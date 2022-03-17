"use strict";

/** Routes for cards. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Card = require("../models/card");

const router = new express.Router();

/** GET / =>
 *      { cards: [ id, nickname, gender, nature, ability, art, species, item]...}
 * 
 * Authorization required: logged in
 */

router.get("/", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = res.locals.user;
		const result = await Card.getAll(user.username);
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
		const user = res.locals.user;
		const newCard = await Card.save(req.body, user.username);
		return res.status(201).json(newCard);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
