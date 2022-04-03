"use strict";

/** Routes for users. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

/** GET /:username =>
 *      { username, favoriteId }
 * 
 * Authorization required: logged in
 */

router.get("/:username", ensureLoggedIn, async function(req, res, next) {
	try {
		const user = await User.get(req.params.username);
		return res.json({ user });
	} catch (e) {
		return next(e);
	}
});

/** DELETE /:username =>
 *      { username, favoriteId }
 * 
 * Authorization required: same user
 */

router.delete("/:username", ensureCorrectUser, async function(req, res, next) {
	try {
		await User.remove(req.params.username);
		return res.json({ deleted: req.params.username });
	} catch (e) {
		return next(e);
	}
});

/** PATCH /:username =>
 *      { username, favoriteId, favorite }
 * 
 * Authorization required: same user
 */

router.patch("/:username", ensureCorrectUser, async function(req, res, next) {
	try {
		const username = req.params.username;
		const result = await User.updateFavorite(username, req.body.id);
		return res.json(result);
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
