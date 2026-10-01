import { spawnSync } from "node:child_process";
import "./load-production-env.mjs";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: {
      ...process.env,
      ...(options.env || {})
    }
  });

  if (result.error) console.error(result.error);
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runPnpm(args) {
  if (!process.env.npm_execpath) throw new Error("npm_execpath is required to run the project package manager safely.");
  run(process.execPath, [process.env.npm_execpath, ...args]);
}

console.log("Production migrations are never run by the build. Use the separately approved production:migrate command.");

runPnpm(["exec", "prisma", "generate"]);
runPnpm(["exec", "next", "build"]);
