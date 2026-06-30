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
const migrationUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (isVercelProduction) {
  if (!migrationUrl) {
    console.error("Production Vercel build requires DIRECT_URL or DATABASE_URL for Prisma migrations.");
    process.exit(1);
  }

  console.log("Running production Prisma migrations before Next.js build...");
  run("pnpm", ["exec", "prisma", "migrate", "deploy"], {
    env: { DATABASE_URL: migrationUrl }
  });
} else {
  console.log("Skipping production migrations outside Vercel production build.");
}

run("pnpm", ["exec", "prisma", "generate"]);
run("pnpm", ["exec", "next", "build"]);
