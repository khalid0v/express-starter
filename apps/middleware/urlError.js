const AppError = require('../errors/AppError');

/**
 * Handles 404 errors for not found routes.
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Cannot ${req.method} ${req.originalUrl} - Route not found`, 404);
  next(error);
};

module.exports = notFoundHandler;