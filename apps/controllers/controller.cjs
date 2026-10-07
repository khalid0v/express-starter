const prisma = require("@/db/prisma.cjs");

async function testPrismaEndpoint() {
	return prisma.$queryRaw`SELECT 1 as result`;
}

module.exports = testPrismaEndpoint;
