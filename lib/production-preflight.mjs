export const requiredProductionVariables = [
  "DATABASE_URL", "DIRECT_URL", "PRODUCTION_APP_URL", "NEXT_PUBLIC_SITE_URL",
  "ADMIN_SETUP_SECRET", "PAYMENT_CALLBACK_SECRET", "AFFILIATE_WITHDRAWAL_MIN_MINOR",
  "PRODUCTION_SUPABASE_PROJECT_REF", "PRODUCTION_DATABASE_HOST", "PRODUCTION_DIRECT_DATABASE_HOST"
];

const secretVariables = ["ADMIN_SETUP_SECRET", "PAYMENT_CALLBACK_SECRET"];
const projectRefPattern = /^[a-z0-9]{20}$/;

function parsePostgresUrl(value) {
  try {
    const url = new URL(value);
    return {
      valid: ["postgres:", "postgresql:"].includes(url.protocol),
      remote: !["localhost", "127.0.0.1", "::1"].includes(url.hostname),
      host: url.hostname.toLowerCase(),
      username: decodeURIComponent(url.username).toLowerCase()
    };
  } catch { return { valid: false, remote: false, host: "", username: "" }; }
}

function belongsToSupabaseProject(database, expectedHost, projectRef) {
  if (!database.valid || !database.remote || !expectedHost || database.host !== expectedHost.toLowerCase()) return false;
  const directIdentity = database.host === `db.${projectRef}.supabase.co`;
  const poolerIdentity = database.host.endsWith(".pooler.supabase.com") && database.username === `postgres.${projectRef}`;
  return directIdentity || poolerIdentity;
}

export function evaluateProductionEnvironment(environment) {
  const missing = requiredProductionVariables.filter((name) => !environment[name]);
  const placeholderSecrets = secretVariables.filter((name) => !environment[name] || environment[name].length < 32 || /replace|placeholder|example|changeme/i.test(environment[name]));
  const runtime = parsePostgresUrl(environment.DATABASE_URL);
  const migration = parsePostgresUrl(environment.DIRECT_URL);
  const projectRef = String(environment.PRODUCTION_SUPABASE_PROJECT_REF || "").trim().toLowerCase();
  const projectRefValid = projectRefPattern.test(projectRef);
  const runtimeIdentityValid = projectRefValid && belongsToSupabaseProject(runtime, environment.PRODUCTION_DATABASE_HOST, projectRef);
  const migrationIdentityValid = projectRefValid && belongsToSupabaseProject(migration, environment.PRODUCTION_DIRECT_DATABASE_HOST, projectRef);
  const minimum = Number(environment.AFFILIATE_WITHDRAWAL_MIN_MINOR);
  const maximum = environment.AFFILIATE_WITHDRAWAL_MAX_MINOR ? Number(environment.AFFILIATE_WITHDRAWAL_MAX_MINOR) : null;
  const affiliatePolicyValid = Number.isSafeInteger(minimum) && minimum > 0 && (maximum == null || Number.isSafeInteger(maximum) && maximum >= minimum);
  const appUrlsValid = [environment.PRODUCTION_APP_URL, environment.NEXT_PUBLIC_SITE_URL].every((value) => {
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  });
  return {
    ok: missing.length === 0 && placeholderSecrets.length === 0 && runtime.valid && runtime.remote && migration.valid && migration.remote
      && runtimeIdentityValid && migrationIdentityValid && affiliatePolicyValid && appUrlsValid,
    checks: {
      missing, placeholderSecrets, runtimePostgres: runtime.valid, runtimeRemote: runtime.remote,
      migrationPostgres: migration.valid, migrationRemote: migration.remote, projectRefValid,
      runtimeIdentityValid, migrationIdentityValid, affiliatePolicyValid, appUrlsHttps: appUrlsValid
    }
  };
}
