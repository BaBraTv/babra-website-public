import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { createAcademySession, hashAcademyPassword } from "../../../../../../lib/academy/auth";
import { requireAcademyEnabled } from "../../../../../../lib/academy/feature";
import { academyRegisterSchema } from "../../../../../../lib/academy/validation";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  const form = await request.formData();
  const parsed = academyRegisterSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return NextResponse.json({ error: "Invalid registration details", issues: parsed.error.flatten().fieldErrors }, { status: 400 });
  const existing = await getPrisma().academyUser.findUnique({ where: { email: parsed.data.email } });
  if (existing) return NextResponse.json({ error: "An account already exists for this email" }, { status: 409 });
  const user = await getPrisma().academyUser.create({ data: { fullName: parsed.data.fullName, email: parsed.data.email, passwordHash: await hashAcademyPassword(parsed.data.password), status: "ACTIVE", emailVerifiedAt: new Date(), roles: { create: { role: "CANDIDATE" } } } });
  await createAcademySession(user.id);
  await writeAcademyAudit({ actorId: user.id, action: "AUTH_REGISTER", entityType: "AcademyUser", entityId: user.id });
  return NextResponse.redirect(new URL("/academy/candidate", request.url), 303);
}
