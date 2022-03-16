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

router.get("/", async function(req, res, next) {
	try {
		const res = Card.getAll(0);
		return res;
	} catch (e) {
		return next(e);
	}
});

/** POST / =>
 *      { cards: [ id, nickname, gender, nature, ability, art, species, item]...}
 * 
 * Authorization required: logged in
 */

router.post("/", async function(req, res, next) {
	try {
		console.log(req.body);
		const newCard = await Card.save(req.body, 1);
		return res.status(201).json(newCard);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
