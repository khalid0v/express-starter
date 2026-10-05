import { NextFunction, Request, Response } from 'express';


/**
 * Parses cookies from the incoming request
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * @returns {void} 
 */
function cookieParser(req, res, next) {
  const cookieHeader = req.headers.cookie;
  req.cookies = {};
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      req.cookies[name] = value;
    }
  }
  next();
}

export default cookieParser;