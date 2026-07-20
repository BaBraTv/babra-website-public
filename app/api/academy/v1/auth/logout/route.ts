import { NextResponse } from "next/server";
import { destroyAcademySession, getAcademyUser } from "../../../../../../lib/academy/auth";
import { writeAcademyAudit } from "../../../../../../lib/academy/audit";

export async function POST(request: Request) {
  const user = await getAcademyUser();
  await destroyAcademySession();
  if (user) await writeAcademyAudit({ actorId: user.id, action: "AUTH_LOGOUT", entityType: "AcademyUser", entityId: user.id });
  return NextResponse.redirect(new URL("/academy/login", request.url), 303);
}
