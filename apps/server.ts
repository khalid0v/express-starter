import compression from "compression";
import express from "express";
import morgan from "morgan";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/urlError.js";
import router from "./routes/router.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));
app.use("/api/v1", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
