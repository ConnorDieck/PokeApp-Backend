"use strict";

/** Routes for authentication and registration. */

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jsonschema = require("jsonschema");
const userSchema = require("../schema/userSchema.json");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { BadRequestError, ExpressError } = require("../expressError");

/** POST /auth/token: { username, password } => { token } 
 * 
 * Returns JWT token which can be used to authenticate further requests.
 * 
 * Authorization required: none
*/

router.post("/token", async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userSchema);

		if (!validator.valid) {
			let listOfErrors = validator.errors.map(e => e.stack);
			let error = new ExpressError(listOfErrors, 400);
			return next(error);
		}

		const { username, password } = req.body;
		const user = await User.authenticate(username, password);
		console.log("user from authenticate", user);
		const token = createToken(user);
		console.log("token decoded", jwt.decode(token));
		return res.json({ token });
	} catch (e) {
		return next(e);
	}
});

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, userSchema);

		if (!validator.valid) {
			let listOfErrors = validator.errors.map(e => e.stack);
			let error = new ExpressError(listOfErrors, 400);
			return next(error);
		}

		const newUser = await User.register({ ...req.body });
		const token = createToken(newUser);
		return res.status(201).json({ token });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
