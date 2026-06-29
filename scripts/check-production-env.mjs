const required = [
  "DATABASE_URL",
  "PRODUCTION_APP_URL",
  "NEXT_PUBLIC_SITE_URL",
  "AUTH_SESSION_SECRET",
  "NEXTAUTH_SECRET",
  "PASSWORD_RESET_TOKEN_SECRET",
  "ADMIN_SETUP_SECRET",
  "PAYMENT_CALLBACK_SECRET"
];

const emailPlaceholders = ["EMAIL_FROM", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_SECURE"];
const paymentPlaceholders = ["MTN_MOMO_BASE_URL", "MTN_MOMO_SUBSCRIPTION_KEY", "MTN_MOMO_API_USER", "MTN_MOMO_API_KEY"];

function redacted(value) {
  if (!value) return "";
  if (value.length <= 8) return "********";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

const missing = required.filter((key) => !process.env[key]);
const warnings = [...emailPlaceholders, ...paymentPlaceholders].filter((key) => !process.env[key]);
const databaseUrl = process.env.DATABASE_URL || "";

const checks = {
  hasDatabaseUrl: Boolean(databaseUrl),
  databaseLooksPostgres: databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://"),
  databaseIsNotLocalhost: databaseUrl ? !/localhost|127\.0\.0\.1/i.test(databaseUrl) : false,
  appUrl: process.env.PRODUCTION_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "",
  missingRequired: missing,
  unsetOptionalPlaceholders: warnings
};

console.log(JSON.stringify({
  ok: missing.length === 0 && checks.databaseLooksPostgres && checks.databaseIsNotLocalhost,
  checks,
  redacted: Object.fromEntries(required.map((key) => [key, redacted(process.env[key] || "")]))
}, null, 2));

if (missing.length > 0 || !checks.databaseLooksPostgres || !checks.databaseIsNotLocalhost) {
  process.exitCode = 1;
}
