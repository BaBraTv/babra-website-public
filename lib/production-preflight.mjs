export const requiredProductionVariables = [
  "DATABASE_URL", "DIRECT_URL", "PRODUCTION_APP_URL", "NEXT_PUBLIC_SITE_URL",
  "AUTH_SESSION_SECRET", "NEXTAUTH_SECRET", "PASSWORD_RESET_TOKEN_SECRET",
  "ADMIN_SETUP_SECRET", "PAYMENT_CALLBACK_SECRET", "AFFILIATE_WITHDRAWAL_MIN_MINOR"
];

const secretVariables = ["AUTH_SESSION_SECRET", "NEXTAUTH_SECRET", "PASSWORD_RESET_TOKEN_SECRET", "ADMIN_SETUP_SECRET", "PAYMENT_CALLBACK_SECRET"];

export function evaluateProductionEnvironment(environment) {
  const missing = requiredProductionVariables.filter((name) => !environment[name]);
  const placeholderSecrets = secretVariables.filter((name) => !environment[name] || environment[name].length < 32 || /replace|placeholder|example|changeme/i.test(environment[name]));
  const parseDatabase = (name) => {
    try {
      const url = new URL(environment[name]);
      return { valid: ["postgres:", "postgresql:"].includes(url.protocol), remote: !["localhost", "127.0.0.1", "::1"].includes(url.hostname), host: url.hostname };
    } catch { return { valid: false, remote: false, host: "" }; }
  };
  const runtime = parseDatabase("DATABASE_URL");
  const migration = parseDatabase("DIRECT_URL");
  const minimum = Number(environment.AFFILIATE_WITHDRAWAL_MIN_MINOR);
  const maximum = environment.AFFILIATE_WITHDRAWAL_MAX_MINOR ? Number(environment.AFFILIATE_WITHDRAWAL_MAX_MINOR) : null;
  const affiliatePolicyValid = Number.isSafeInteger(minimum) && minimum > 0 && (maximum == null || Number.isSafeInteger(maximum) && maximum >= minimum);
  const appUrlsValid = [environment.PRODUCTION_APP_URL, environment.NEXT_PUBLIC_SITE_URL].every((value) => {
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  });
  return {
    ok: missing.length === 0 && placeholderSecrets.length === 0 && runtime.valid && runtime.remote && migration.valid && migration.remote && affiliatePolicyValid && appUrlsValid,
    checks: { missing, placeholderSecrets, runtimePostgres: runtime.valid, runtimeRemote: runtime.remote, migrationPostgres: migration.valid, migrationRemote: migration.remote, databaseHostsMatch: Boolean(runtime.host && runtime.host === migration.host), affiliatePolicyValid, appUrlsHttps: appUrlsValid }
  };
}
