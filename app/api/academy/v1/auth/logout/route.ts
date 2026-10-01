import { NextResponse } from "next/server";
import { destroyAcademySession, getAcademyUser } from "../../../../../../lib/academy/auth";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";
import { requireAcademyEnabled } from "../../../../../../lib/academy/feature";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  const user = await getAcademyUser();
  await destroyAcademySession();
  if (user) await writeAcademyAudit({ actorId: user.id, action: "AUTH_LOGOUT", entityType: "AcademyUser", entityId: user.id });
  return NextResponse.redirect(new URL("/academy/login", request.url), 303);
}
