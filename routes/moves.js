"use strict";

/** Routes for moves. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Move = require("../models/move");
const jsonschema = require("jsonschema");
const abilitySchema = require("../schema/abilitySchema.json");

const router = new express.Router();

/** POST / =>
 *      { name, url }
 * 
 * Route to save an ability.
 * 
 * Authorization required: logged in
 */

router.post("/", async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, abilitySchema);

		if (!validator.valid) {
			let listOfErrors = validator.errors.map(e => e.stack);
			let error = new BadRequestError(listOfErrors, 400);
			return next(error);
		}
		const response = await Move.addToDb(req.body);
		return res.status(201).json(response);
	} catch (e) {
		return next(e);
	}
});

/** DELETE / =>
 *      { deleted: name }
 * 
 * Authorization required: logged in
 */

router.delete("/:name", ensureLoggedIn, async function(req, res, next) {
	try {
		const name = req.params.name;
		await Move.removeFromDb(name);
		return res.json({ deleted: name });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
