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

console.log("Production migrations are never run by the build. Use the separately approved production:migrate command.");

run("pnpm", ["exec", "prisma", "generate"]);
run("pnpm", ["exec", "next", "build"]);
