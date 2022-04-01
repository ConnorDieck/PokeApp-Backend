"use strict";

/** Routes for natures. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Nature = require("../models/nature");
const jsonschema = require("jsonschema");
const ianSchema = require("../schema/ianSchema.json");

const router = new express.Router();

/** GET / =>
 *      { items: [ { id, name, url }, { id, name, url }, ...] }

 * 
 * Authorization required: none
 */

router.get("/", async function(req, res, next) {
	try {
		const natures = await Nature.getAll();

		return res.json({ natures });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
