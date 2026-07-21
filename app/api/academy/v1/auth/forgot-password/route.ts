import { NextResponse } from "next/server";
import { getPrisma } from "../../../../../../lib/db";
import { academyForgotPasswordSchema } from "../../../../../../lib/academy/validation";
import { createAcademyToken } from "../../../../../../lib/academy/tokens";
import { sendAcademyPasswordReset } from "../../../../../../lib/academy/email";
import { enforceAcademyRateLimit } from "../../../../../../lib/academy/rate-limit";

export async function POST(request: Request) {
  try { await enforceAcademyRateLimit("academy-forgot-password", 5, 30); } catch { return NextResponse.json({ error: "Too many requests" }, { status: 429 }); }
  const parsed = academyForgotPasswordSchema.safeParse(Object.fromEntries(await request.formData()));
  if (parsed.success) {
    const user = await getPrisma().academyUser.findUnique({ where: { email: parsed.data.email } });
    if (user && user.status !== "DELETED") {
      const token = createAcademyToken();
      await getPrisma().academyPasswordResetToken.create({ data: { userId: user.id, tokenHash: token.hash, expiresAt: new Date(Date.now() + 3_600_000) } });
      await sendAcademyPasswordReset(user.email, token.raw);
    }
  }
  return NextResponse.redirect(new URL("/academy/check-email", request.url), 303);
}
