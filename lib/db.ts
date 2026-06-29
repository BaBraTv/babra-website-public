import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

export function getPrisma() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to initialize Prisma");
  }

  const pool =
    globalForPrisma.prismaPool ??
    new Pool({
      connectionString
    });
  const adapter = new PrismaPg(pool);

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prismaPool = pool;
  }

  const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
  }

  return prisma;
}
