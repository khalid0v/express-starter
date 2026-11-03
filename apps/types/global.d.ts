import type { DatabaseClient } from "./prisma.js";

declare global {
  var prisma: DatabaseClient | undefined;
}

export {};
