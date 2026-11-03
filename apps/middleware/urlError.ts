import type { RequestHandler } from "express";
import AppError from "../errors/AppErrors.js";

const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new AppError(`Cannot ${req.method} ${req.originalUrl} - Route not found`, 404));
};

export default notFoundHandler;
