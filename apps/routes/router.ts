import { Router } from "express";
import { testPrismaEndpoint } from "../controllers/controller.js";

const router = Router();

router.get("/health/db", async (_req, res, next) => {
  try {
    res.json({ ok: true, result: await testPrismaEndpoint() });
  } catch (error) {
    next(error);
  }
});

export default router;
