import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { hashAcademyToken } from "../../../../../../lib/academy/tokens";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("token");
  if (!raw) return NextResponse.json({ error: "Invalid verification link" }, { status: 400 });
  const token = await getPrisma().academyVerificationToken.findUnique({ where: { tokenHash: hashAcademyToken(raw) } });
  if (!token || token.usedAt || token.expiresAt <= new Date()) return NextResponse.json({ error: "Verification link is invalid or expired" }, { status: 400 });
  await getPrisma().$transaction([
    getPrisma().academyVerificationToken.update({ where: { id: token.id }, data: { usedAt: new Date() } }),
    getPrisma().academyUser.update({ where: { id: token.userId }, data: { status: "ACTIVE", emailVerifiedAt: new Date() } })
  ]);
  await writeAcademyAudit({ actorId: token.userId, action: "AUTH_EMAIL_VERIFIED", entityType: "AcademyUser", entityId: token.userId });
  return NextResponse.redirect(new URL("/academy/login?verified=1", request.url), 303);
}
