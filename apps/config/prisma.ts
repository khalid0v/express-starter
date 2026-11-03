import "dotenv/config";
import path from "node:path";
import type { DatabaseClient } from "../types/prisma.js";

const log: Array<"query" | "warn" | "error"> =
  process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"];

function createPrismaClient(): DatabaseClient {
  if (process.env.DATABASE_URL) {
    const { PrismaNeon } = require("@prisma/adapter-neon") as typeof import("@prisma/adapter-neon");
    const { neonConfig } = require("@neondatabase/serverless") as typeof import("@neondatabase/serverless");
    neonConfig.webSocketConstructor = globalThis.WebSocket;
    const { PrismaClient } = require("@prisma/client") as typeof import("@prisma/client");
    return new PrismaClient({
      adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL }),
      log,
    }) as unknown as DatabaseClient;
  }

  const { PrismaClient: SQLiteClient } = require("../../generated/sqlite-client") as typeof import("../../generated/sqlite-client");
  const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3") as typeof import("@prisma/adapter-better-sqlite3");
  const dbPath = path.resolve(process.cwd(), "prisma/dev.db");
  console.info(`DATABASE_URL is not set; using SQLite at ${dbPath}`);
  return new SQLiteClient({
    adapter: new PrismaBetterSqlite3({ url: `file:${dbPath}` }),
    log,
  }) as unknown as DatabaseClient;
}

const prisma = globalThis.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
