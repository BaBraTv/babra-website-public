import { spawnSync } from "node:child_process";
import "./load-production-env.mjs";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      ...(options.env || {})
    }
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const isVercelProduction = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production" && process.env.CI === "1";
const postgresUrlPattern = /^postgres(ql)?:\/\//i;
const migrationUrl = [process.env.DIRECT_URL, process.env.DATABASE_URL].find((value) => value && postgresUrlPattern.test(value));
const hasAnyDatabaseUrl = Boolean(process.env.DIRECT_URL || process.env.DATABASE_URL);

if (isVercelProduction) {
  if (migrationUrl) {
    console.log("Running production Prisma migrations before Next.js build...");
    run("pnpm", ["exec", "prisma", "migrate", "deploy"], {
      env: { DATABASE_URL: migrationUrl }
    });
  } else if (hasAnyDatabaseUrl) {
    console.warn("Skipping Prisma migrations because DIRECT_URL/DATABASE_URL is present but not a valid PostgreSQL URL.");
  } else {
    console.warn("Skipping Prisma migrations because DIRECT_URL/DATABASE_URL is not configured for this Vercel project.");
  }
} else {
  console.log("Skipping production migrations outside Vercel production build.");
}

run("pnpm", ["exec", "prisma", "generate"]);
run("pnpm", ["exec", "next", "build"]);
