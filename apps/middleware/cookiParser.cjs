/**
 * Parses cookies from the incoming request
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
function cookieParser(req, _res, next) {
	const cookieHeader = req.headers.cookie;
	req.cookies = {};
	if (cookieHeader) {
		const cookies = cookieHeader.split(";");
		for (const cookie of cookies) {
			const [name, value] = cookie.trim().split("=");
			req.cookies[name] = value;
		}
	}
	next();
}

module.exports = cookieParser;
