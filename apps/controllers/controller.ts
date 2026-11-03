import prisma from "../config/prisma.js";

export async function testPrismaEndpoint() {
  return prisma.$queryRaw<[{ result: number }]>`SELECT 1 as result`;
}
