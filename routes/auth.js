"use strict";

/** Routes for authentication and registration. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

/** POST /auth/token: { username, password } => { token } 
 * 
 * Returns JWT token which can be used to authenticate further requests. Login route.
 * 
 * Authorization required: none
*/

router.post("/token", async function(req, res, next) {
	try {
		const { username, password } = req.body;
		const user = User.authenticate(username, password);
		const token = createToken(user);
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
		const newUser = await User.register({ ...req.body, isAdmin: false });
		const token = createToken(newUser);
		// res.locals.user = jwt.verify(token, SECRET_KEY);
		return res.status(201).json({ token });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;