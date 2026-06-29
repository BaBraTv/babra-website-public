import { NextResponse, type NextRequest } from "next/server";
import { randomBytes, createHash } from "crypto";
import { getPrisma } from "../../../../lib/db";
import { forgotPasswordSchema } from "../../../../lib/auth";
import { queueNotification } from "../../../../lib/email-routing";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = forgotPasswordSchema.parse(await request.json());
    const prisma = getPrisma();
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: payload.identifier }, { phone: payload.identifier }] }
    });

    if (user) {
      const rawToken = randomBytes(32).toString("hex");
      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: createHash("sha256").update(rawToken).digest("hex"),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000)
        }
      });
      await queueNotification({
        route: "contact",
        subject: "BaBra password reset request",
        templateKey: "auth.forgot_password",
        payload: { userId: user.id, identifier: payload.identifier }
      });
    }

    return NextResponse.json({ ok: true, message: "If the account exists, BaBra support will review the reset request." });
  } catch (error) {
    return fail(error);
  }
}
