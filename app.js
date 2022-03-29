"use strict";

/** Express app for pokeapp */

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const cardsRoutes = require("./routes/cards");
const usersRoutes = require("./routes/users");
const teamsRoutes = require("./routes/teams");
const abilitiesRoutes = require("./routes/abilities");
const itemsRoutes = require("./routes/items");
const naturesRoutes = require("./routes/natures");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);
app.use("/teams", teamsRoutes);
app.use("/abilities", abilitiesRoutes);
app.use("/items", itemsRoutes);
app.use("/natures", naturesRoutes);

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
