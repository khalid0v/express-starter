export default class AppError extends Error {
  readonly statusCode: number;
  readonly status: "fail" | "error";
  readonly isOperational = true;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, new.target);
  }
}
