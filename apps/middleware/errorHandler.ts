import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) return next(error);
  const err = error instanceof Error ? error : new Error("Unknown error");
  const statusCode = Number((err as Error & { statusCode?: number; status?: number }).statusCode ?? (err as Error & { status?: number }).status ?? 500);
  res.status(statusCode).json({
    status: statusCode < 500 ? "fail" : "error",
    statusCode,
    message: statusCode >= 500 ? "Internal Server Error" : err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
