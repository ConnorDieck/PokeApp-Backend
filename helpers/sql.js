const { BadRequestError } = require("../expressError");
const fs = require("fs");
const Batch = require("batch");

const batch = new Batch();

/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *   like { firstName: "first_name", age: "age" }
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 * @example {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError("No data");

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	return {
		setCols : cols.join(", "),
		values  : Object.values(dataToUpdate)
	};
}

// Code pulled from here: https://www.thiscodeworks.com/javascript-import-sql-file-in-node-js-and-execute-against-postgresql-stack-overflow-sql-nodejs/5fc1488a5fb6ba00144ecb60
function processSQLFile(fileName) {
	// Extract SQL queries from files. Assumes no ';' in the fileNames
	var queries = fs
		.readFileSync(fileName)
		.toString()
		.replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
		.replace(/\s+/g, " ") // excess white space
		.split(";") // split into all statements
		.map(Function.prototype.call, String.prototype.trim)
		.filter(function(el) {
			return el.length != 0;
		}); // remove any empty ones

	// Execute each SQL query sequentially
	queries.forEach(function(query) {
		batch.push(function(done) {
			if (query.indexOf("COPY") === 0) {
				// COPY - needs special treatment
				var regexp = /COPY\ (.*)\ FROM\ (.*)\ DELIMITERS/gim;
				var matches = regexp.exec(query);
				var table = matches[1];
				var fileName = matches[2];
				var copyString = "COPY " + table + " FROM STDIN DELIMITERS ',' CSV HEADER";
				var stream = client.copyFrom(copyString);
				stream.on("close", function() {
					done();
				});
				var csvFile = __dirname + "/" + fileName;
				var str = fs.readFileSync(csvFile);
				stream.write(str);
				stream.end();
			} else {
				// Other queries don't need special treatment
				client.query(query, function(result) {
					done();
				});
			}
		});
	});
}
module.exports = { sqlForPartialUpdate, processSQLFile };
