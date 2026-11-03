import type { RequestHandler } from "express";

const timeLog: RequestHandler = (req, _res, next) => {
  console.info(`[${req.method}] ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};

export default timeLog;
