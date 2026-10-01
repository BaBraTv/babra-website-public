export function isAcademyEnabled() {
  return process.env.ACADEMY_ENABLED !== "false";
}

export function requireAcademyEnabled() {
  if (!isAcademyEnabled()) {
    throw new Error("ACADEMY_DISABLED");
  }
}
