import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import dotenv from "dotenv";

export const productionEnvFiles = [".env", ".env.local", ".env.production.local", ".vercel/.env.production.local"];

/**
 * @param {{ cwd?: string, environment?: Record<string, string | undefined> }} options
 */
export function loadProductionEnvironment({ cwd = process.cwd(), environment = process.env } = {}) {
  for (const relativePath of productionEnvFiles) {
    const path = resolve(cwd, relativePath);
    if (!existsSync(path)) continue;

    for (const [name, value] of Object.entries(dotenv.parse(readFileSync(path)))) {
      environment[name] = value;
    }
  }

  return environment;
}

loadProductionEnvironment();
