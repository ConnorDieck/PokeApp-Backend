"use strict";

/** Routes for items. */

const express = require("express");

const Item = require("../models/item");
const jsonschema = require("jsonschema");
const itemSearchSchema = require("../schema/itemSearchSchema.json");

const router = new express.Router();

/** GET / =>
 *      { items: [ { id, name, url }, { id, name, url }, ...] }

 * 
 * Authorization required: none
 */

router.get("/", async function(req, res, next) {
	const q = req.query;
	const validator = jsonschema.validate(q, itemSearchSchema);
	if (!validator.valid) {
		let listOfErrors = validator.errors.map(e => e.stack);
		let error = new BadRequestError(listOfErrors, 400);
		return next(error);
	}
	try {
		const items = await Item.getAll(q);

		return res.json({ items });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
