"use strict";

const app = require("./app");
const { PORT } = require("./config");

// const cors = require("cors");
// const corsOptions = {
// 	origin              : "http://localhost:3000",
// 	credentials         : true, //access-control-allow-credentials:true
// 	optionSuccessStatus : 200
// };
// app.use(cors(corsOptions));

app.listen(PORT, function() {
	console.log(`Started on http://localhost:${PORT}`);
});
