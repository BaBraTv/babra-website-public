import { NextResponse } from "next/server";
import { destroyAcademySession, getAcademyUser, verifyAcademyPassword } from "../../../../../../lib/academy/auth";
import { enforceAcademyRateLimit } from "../../../../../../lib/academy/rate-limit";
import { getPrisma } from "../../../../../../lib/db";
import { requireAcademyEnabled } from "../../../../../../lib/academy/feature";

export async function POST(request: Request) {
  try { requireAcademyEnabled(); } catch { return NextResponse.json({ error: "Not found" }, { status: 404 }); }
  const user = await getAcademyUser();
  if (!user) return NextResponse.json({ error: "Sign in is required" }, { status: 401 });
  try { await enforceAcademyRateLimit(`academy-delete:${user.id}`, 3, 60); } catch { return NextResponse.json({ error: "Too many attempts" }, { status: 429 }); }
  const password = String((await request.json().catch(() => null) as { password?: unknown } | null)?.password || "");
  if (!(await verifyAcademyPassword(password, user.passwordHash))) return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
  await getPrisma().academyUser.delete({ where: { id: user.id } });
  await destroyAcademySession();
  return NextResponse.redirect(new URL("/academy?account=deleted", request.url), 303);
}
