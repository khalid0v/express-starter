const prisma = require("@/config/prisma.js");

async function testPrismaEndpoint() {
	return prisma.$queryRaw`SELECT 1 as result`;
}

module.exports = testPrismaEndpoint;
