require("module-alias/register");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const router = require("./routes/router.cjs");
const express = require("express");
const errorHandler = require("errorhandler");
const cookieParser = require("./middleware/cookiParser.cjs");

const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Middleware setup
 */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(router);
app.use(compression());
app.use(morgan("common"));
app.use(errorHandler());
app.use(cookieParser);

/**
 * Start the server
 */
app.listen(PORT, () => {
	console.dir(`Server is running on port [ http://localhost:${PORT} ]`);
});
