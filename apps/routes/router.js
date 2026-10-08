const { Router } = require("express");
const testPrismaEndpoint = require("@/controllers/controller.js");
const router = Router();

router.get("/health/db", async (_req, res, next) => {
	try {
		const result = await testPrismaEndpoint();
		res.json({ ok: true, result });
	} catch (e) {
		next(e);
	}
});

module.exports = router;
