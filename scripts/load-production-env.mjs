import { existsSync } from "node:fs";
import dotenv from "dotenv";

const envFiles = [".env", ".env.local", ".env.production.local", ".vercel/.env.production.local"];

for (const path of envFiles) {
  if (existsSync(path)) {
    dotenv.config({ path, override: false, quiet: true });
  }
}
