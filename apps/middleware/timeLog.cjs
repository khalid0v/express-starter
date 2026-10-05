/**
 * @param import('express').ErrorRequestHandler err
 * @param import('express').Request req
 * @param import('express').Response res
 * @param import('express').NextFunction next
 * @returns void
 */
function timeLog(err, res ,req,Next){
    console.log(`[${req.method}] ${req.originalUrl} - ${new Date().toISOString()}`);
    return Next();
}


module.exports = timeLog;