import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import router from './routes/router';
import express from 'express';
import errorHandler from 'errorhandler';
import cookieParser from './middleware/cookiParser';


const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Middleware setup
 */
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(router);
app.use(compression());
app.use(morgan('common'));
app.use(errorHandler());
app.use(cookieParser());

/**
 * Start the server
 */
app.listen(PORT, () => {
    console.dir(`Server is running on port [ http://localhost:${PORT} ]`);
})