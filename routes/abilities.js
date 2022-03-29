"use strict";

/** Routes for abilities. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Ability = require("../models/ability");
const jsonschema = require("jsonschema");
const ianSchema = require("../schema/ianSchema.json");

const router = new express.Router();

/** POST / =>
 *      { id, name, url }
 * 
 * Route to save an ability.
 * 
 * Authorization required: logged in
 */

router.post("/", ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, ianSchema);

		if (!validator.valid) {
			let listOfErrors = validator.errors.map(e => e.stack);
			let error = new BadRequestError(listOfErrors, 400);
			return next(error);
		}
		const response = await Ability.addToDb(req.body);
		return res.status(201).json(response);
	} catch (e) {
		return next(e);
	}
});

/** DELETE / =>
 *      { deleted: id }
 * 
 * Authorization required: logged in
 */

router.delete("/:id", ensureLoggedIn, async function(req, res, next) {
	try {
		const abilityId = req.params.id;
		await Ability.remove(abilityId);
		return res.json({ deleted: +abilityId });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
