require("module-alias/register");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const compression = require("compression");
const router = require("./routes/router.js");
const express = require("express");
const errorHandler = require("errorhandler");
const cookieParser = require("./middleware/cookiParser.js");

const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Middleware setup
 */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(compression());
app.use(morgan("dev"));
app.use(errorHandler());
app.use(cookieParser);

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.dir(`Server is running on port [ http://localhost:${PORT} ]`);
});
