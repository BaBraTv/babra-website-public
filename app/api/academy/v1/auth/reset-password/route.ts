import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { academyResetPasswordSchema } from "../../../../../../lib/academy/validation";
import { hashAcademyPassword } from "../../../../../../lib/academy/auth";
import { hashAcademyToken } from "../../../../../../lib/academy/tokens";

export async function POST(request: Request) {
  const parsed = academyResetPasswordSchema.safeParse(Object.fromEntries(await request.formData()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid reset request" }, { status: 400 });
  const token = await getPrisma().academyPasswordResetToken.findUnique({ where: { tokenHash: hashAcademyToken(parsed.data.token) } });
  if (!token || token.usedAt || token.expiresAt <= new Date()) return NextResponse.json({ error: "Reset link is invalid or expired" }, { status: 400 });
  await getPrisma().$transaction([
    getPrisma().academyPasswordResetToken.update({ where: { id: token.id }, data: { usedAt: new Date() } }),
    getPrisma().academyUser.update({ where: { id: token.userId }, data: { passwordHash: await hashAcademyPassword(parsed.data.password) } }),
    getPrisma().academySession.deleteMany({ where: { userId: token.userId } })
  ]);
  return NextResponse.redirect(new URL("/academy/login?reset=1", request.url), 303);
}
