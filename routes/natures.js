"use strict";

/** Routes for natures. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Nature = require("../models/nature");
const jsonschema = require("jsonschema");
const ianSchema = require("../schema/ianSchema.json");

const router = new express.Router();

/** POST / =>
 *      { id, name, url }
 * 
 * Route to save an nature.
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
		const response = await Nature.addToDb(req.body);
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
		const natureId = req.params.id;
		await Nature.remove(natureId);
		return res.json({ deleted: +natureId });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
