import type { RequestHandler } from "express";

const cookieParser: RequestHandler = (req, _res, next) => {
  req.cookies = {};
  for (const part of req.headers.cookie?.split(";") ?? []) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;
    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    req.cookies[name] = decodeURIComponent(value);
  }
  next();
};

export default cookieParser;
