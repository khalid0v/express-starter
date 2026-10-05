/** 
 * @param {import('express').ErrorRequestHandler} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 * @returns 
 */
function errorHandler (err, req, res, next){

    if (res.headersSent) return next(err);
    if (err.name === "ValidationError") return res.status(400).json({ error: err.message });
    if (err.name === "UnauthorizedError") return res.status(401).json({ error: "Unauthorized" });
    const status = err.status || err.statusCode || 500;
    if (status >= 500) console.error(`[${req.method}] ${req.originalUrl}`, err);
    return res.status(status).json({
        error: status >= 500 ? "Internal Server Error" : err.message,
    });
};

module.exports = errorHandler;
