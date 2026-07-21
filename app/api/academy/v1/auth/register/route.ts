import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { createAcademySession, hashAcademyPassword } from "../../../../../../lib/academy/auth";
import { requireAcademyEnabled } from "../../../../../../lib/academy/feature";
import { academyRegisterSchema } from "../../../../../../lib/academy/validation";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";
import { createAcademyToken } from "../../../../../../lib/academy/tokens";
import { sendAcademyVerification } from "../../../../../../lib/academy/email";
import { enforceAcademyRateLimit } from "../../../../../../lib/academy/rate-limit";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  try { await enforceAcademyRateLimit("academy-register", 5, 30); } catch { return NextResponse.json({ error: "Too many requests" }, { status: 429 }); }
  const form = await request.formData();
  const parsed = academyRegisterSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return NextResponse.json({ error: "Invalid registration details", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const existing = await getPrisma().academyUser.findUnique({ where: { email: parsed.data.email } });
  if (existing) return NextResponse.json({ error: "An account already exists for this email" }, { status: 409 });
  const token = createAcademyToken();
  const user = await getPrisma().academyUser.create({ data: { fullName: parsed.data.fullName, email: parsed.data.email, passwordHash: await hashAcademyPassword(parsed.data.password), roles: { create: { role: "CANDIDATE" } }, verificationTokens: { create: { tokenHash: token.hash, expiresAt: new Date(Date.now() + 86_400_000) } } } });
  await sendAcademyVerification(user.email, token.raw);
  await writeAcademyAudit({ actorId: user.id, action: "AUTH_REGISTER", entityType: "AcademyUser", entityId: user.id });
  return NextResponse.redirect(new URL("/academy/check-email", request.url), 303);
}
