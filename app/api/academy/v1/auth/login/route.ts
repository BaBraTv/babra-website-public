import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { createAcademySession, verifyAcademyPassword } from "../../../../../../lib/academy/auth";
import { requireAcademyEnabled } from "../../../../../../lib/academy/feature";
import { academyLoginSchema } from "../../../../../../lib/academy/validation";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  const parsed = academyLoginSchema.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  const user = await getPrisma().academyUser.findUnique({ where: { email: parsed.data.email } });
  if (!user || user.status !== "ACTIVE" || !(await verifyAcademyPassword(parsed.data.password, user.passwordHash))) {
    await writeAcademyAudit({ action: "AUTH_LOGIN", entityType: "AcademyUser", outcome: "FAILURE", metadata: { email: parsed.data.email } });
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await getPrisma().academyUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  await createAcademySession(user.id);
  await writeAcademyAudit({ actorId: user.id, action: "AUTH_LOGIN", entityType: "AcademyUser", entityId: user.id });
  return NextResponse.redirect(new URL("/academy/candidate", request.url), 303);
}
