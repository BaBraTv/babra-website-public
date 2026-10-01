import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { hashAcademyPassword } from "../../../../../../lib/academy/auth";
import { requireAcademyEnabled } from "../../../../../../lib/academy/feature";
import { academyRegisterSchema } from "../../../../../../lib/academy/validation";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";
import { createAcademyToken } from "../../../../../../lib/academy/tokens";
import { sendAcademyVerification } from "../../../../../../lib/academy/email";
import { enforceAcademyRateLimit } from "../../../../../../lib/academy/rate-limit";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  try { await enforceAcademyRateLimit("academy-register", 5, 30); } catch { return NextResponse.json({ error: "Too many requests" }, { status: 429 }); }
  const parsed = academyRegisterSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid registration details", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const existing = await getPrisma().academyUser.findUnique({ where: { email: parsed.data.email } });
  if (existing) return NextResponse.json({ error: "An account already exists for this email" }, { status: 409 });
  const token = createAcademyToken();
  const role = parsed.data.accountType === "parent" ? "PARENT" : "STUDENT";
  const user = await getPrisma().academyUser.create({ data: { fullName: parsed.data.fullName, email: parsed.data.email, passwordHash: await hashAcademyPassword(parsed.data.password), roles: { create: { role } }, learnerProfiles: role === "STUDENT" ? { create: { birthYear: parsed.data.birthYear } } : undefined, verificationTokens: { create: { tokenHash: token.hash, expiresAt: new Date(Date.now() + 86_400_000) } } } });
  try {
    await sendAcademyVerification(user.email, token.raw);
  } catch {
    await getPrisma().academyUser.delete({ where: { id: user.id } }).catch(() => undefined);
    return NextResponse.json({ error: "Verification email is temporarily unavailable. Please try again later." }, { status: 503 });
  }
  await writeAcademyAudit({ actorId: user.id, action: "AUTH_REGISTER", entityType: "AcademyUser", entityId: user.id });
  return NextResponse.redirect(new URL("/academy/check-email", request.url), 303);
}
