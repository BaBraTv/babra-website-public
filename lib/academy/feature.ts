export function isAcademyEnabled() {
  return process.env.ACADEMY_ENABLED === "true";
}

export function requireAcademyEnabled() {
  if (!isAcademyEnabled()) {
    throw new Error("ACADEMY_DISABLED");
  }
}
