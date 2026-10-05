import {ErrorRequestHandler, Request, Response, NextFunction} from 'express';

/**
 * @param ErrorRequestHandler err
 * @param Request req
 * @param Response res
 * @param NextFunction next
 * @returns void
 */
function timeLog(err, res ,req,Next){
    console.log(`[${req.method}] ${req.originalUrl} - ${new Date().toISOString()}`);
    return Next();
}


export default timeLog;