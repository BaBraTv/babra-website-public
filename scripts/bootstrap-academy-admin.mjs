import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
const email = process.env.ACADEMY_BOOTSTRAP_EMAIL?.trim().toLowerCase();
const fullName = process.env.ACADEMY_BOOTSTRAP_NAME?.trim();
const password = process.env.ACADEMY_BOOTSTRAP_PASSWORD;

if (!databaseUrl || !email || !fullName || !password || password.length < 16) {
  throw new Error("DATABASE_URL, ACADEMY_BOOTSTRAP_EMAIL, ACADEMY_BOOTSTRAP_NAME and a 16+ character ACADEMY_BOOTSTRAP_PASSWORD are required");
}

const pool = new Pool({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

try {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.academyUser.upsert({
    where: { email },
    create: { email, fullName, passwordHash, status: "ACTIVE", emailVerifiedAt: new Date() },
    update: { fullName, passwordHash, status: "ACTIVE", emailVerifiedAt: new Date() }
  });
  await prisma.academyUserRole.upsert({
    where: { userId_role: { userId: user.id, role: "SUPER_ADMIN" } },
    create: { userId: user.id, role: "SUPER_ADMIN" },
    update: {}
  });
  await prisma.academyAuditLog.create({ data: { actorId: user.id, action: "BOOTSTRAP_SUPER_ADMIN", entityType: "AcademyUser", entityId: user.id } });
  console.log(`Academy SUPER_ADMIN is ready for ${email}. Remove bootstrap secrets from the environment now.`);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
