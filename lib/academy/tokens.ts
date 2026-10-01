import { createHash, randomBytes } from "crypto";

export function createAcademyToken() {
  const raw = randomBytes(32).toString("base64url");
  return { raw, hash: hashAcademyToken(raw) };
}

export function hashAcademyToken(raw: string) {
  return createHash("sha256").update(raw).digest("hex");
}
