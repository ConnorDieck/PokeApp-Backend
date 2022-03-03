"use strict";

/** Express app for pokeapp */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const morgan = require("morgan");

app.use(cors());
// Parse request bodies for JSON
app.use(express.json());
/** Logs the route requested, HTTP verb, and much more. */
app.use(morgan("dev"));

/** Handle 404 errors -- this matches everything */
app.use(function(req, res, next) {
	return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	const status = err.status || 500;
	const message = err.message;

	return res.status(status).json({
		error : { message, status }
	});
});

module.exports = app;
