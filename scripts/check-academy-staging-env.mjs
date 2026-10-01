import "dotenv/config";

const required = ["DATABASE_URL", "DIRECT_URL", "ACADEMY_APP_URL", "ACADEMY_SESSION_SECRET", "EMAIL_FROM", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD"];
const missing = required.filter((key) => !process.env[key]);
const issues = [];
if ((process.env.ACADEMY_SESSION_SECRET || "").length < 32) issues.push("ACADEMY_SESSION_SECRET must contain at least 32 characters");
if (/localhost|127\.0\.0\.1/i.test(process.env.DATABASE_URL || "")) issues.push("DATABASE_URL must not point to localhost for staging");
if (process.env.ACADEMY_ENABLED !== "true") issues.push("ACADEMY_ENABLED must be true for staging acceptance testing");

console.log(JSON.stringify({ ok: missing.length === 0 && issues.length === 0, missing, issues }, null, 2));
if (missing.length || issues.length) process.exitCode = 1;
