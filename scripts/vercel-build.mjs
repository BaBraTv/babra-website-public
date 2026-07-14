import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import "./load-production-env.mjs";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDir);
const isWindows = process.platform === "win32";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: options.shell ?? false,
    env: {
      ...process.env,
      ...(options.env || {})
    }
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function localBin(name) {
  const executable = isWindows ? `${name}.CMD` : name;
  const candidate = join(projectRoot, "node_modules", ".bin", executable);
  return existsSync(candidate) ? candidate : null;
}

function runProjectBin(name, args = [], options = {}) {
  const bin = localBin(name);
  if (bin) {
    run(bin, args, { ...options, shell: isWindows });
    return;
  }

  run("pnpm", ["exec", name, ...args], { ...options, shell: true });
}

const isVercelProduction = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production" && process.env.CI === "1";
const postgresUrlPattern = /^postgres(ql)?:\/\//i;
const migrationUrl = [process.env.DIRECT_URL, process.env.DATABASE_URL].find((value) => value && postgresUrlPattern.test(value));
const hasAnyDatabaseUrl = Boolean(process.env.DIRECT_URL || process.env.DATABASE_URL);

if (isVercelProduction) {
  if (migrationUrl) {
    console.log("Running production Prisma migrations before Next.js build...");
    runProjectBin("prisma", ["migrate", "deploy"], {
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

runProjectBin("prisma", ["generate"]);
runProjectBin("next", ["build"]);