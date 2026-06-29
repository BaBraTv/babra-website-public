import { spawnSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL || "";

if (!databaseUrl) {
  console.error("DATABASE_URL is required before applying production migrations.");
  process.exit(1);
}

if (/localhost|127\.0\.0\.1/i.test(databaseUrl)) {
  console.error("Refusing to run production migrations against a localhost DATABASE_URL.");
  process.exit(1);
}

if (!databaseUrl.startsWith("postgresql://") && !databaseUrl.startsWith("postgres://")) {
  console.error("DATABASE_URL must be a PostgreSQL connection string.");
  process.exit(1);
}

console.log("Validating Prisma schema...");
let result = spawnSync("pnpm", ["exec", "prisma", "validate"], { stdio: "inherit", shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log("Applying Prisma migrations with prisma migrate deploy...");
result = spawnSync("pnpm", ["exec", "prisma", "migrate", "deploy"], { stdio: "inherit", shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log("Generating Prisma client...");
result = spawnSync("pnpm", ["exec", "prisma", "generate"], { stdio: "inherit", shell: true });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log("Production migrations applied successfully.");
