const { PrismaClient } = require("@prisma/client");
const { PrismaNeon } = require("@prisma/adapter-neon");
const { neonConfig } = require("@neondatabase/serverless");
require("dotenv").config();

neonConfig.webSocketConstructor = globalThis.WebSocket;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
	throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaNeon({ connectionString });

const prisma =
	globalThis.prisma ||
	new PrismaClient({
		adapter,
		log:
			process.env.NODE_ENV === "development"
				? ["query", "warn", "error"]
				: ["error"],
	});

if (process.env.NODE_ENV !== "production") {
	globalThis.prisma = prisma;
}

module.exports = prisma;
