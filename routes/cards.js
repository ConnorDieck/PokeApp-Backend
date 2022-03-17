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
		const newCard = await Card.create(req.body, user.username);
		return res.status(201).json(newCard);
	} catch (e) {
		return next(e);
	}
});

/** GET /:cardId =>
 *      {  id, nickname, gender, nature, ability, art, species, item }
 * 
 * Authorization required: logged in 
 * (a user can get a card they don't own, they simply can't edit it)
 */

router.get("/:cardId", ensureLoggedIn, async function(req, res, next) {
	try {
		const cardId = req.params.cardId;
		const result = await Card.get(cardId);
		return res.json(result);
	} catch (e) {
		return next(e);
	}
});

/** PATCH /:cardId =>
 *      {  id, nickname, gender, nature, ability, art, species, item }
 * 
 * Authorization required: logged in 
 * (will throw error if no card is found with matching username and cardId)
 */

router.patch("/:cardId/edit", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = res.locals.user;
		const data = req.body;
		const result = await Card.edit(data, user.username);
		return res.json(result);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
