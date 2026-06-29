import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { loginSchema, verifyPassword } from "../../../../lib/auth";
import { createSession, publicUser } from "../../../../lib/session";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = loginSchema.parse(await request.json());
    const prisma = getPrisma();
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: payload.identifier }, { phone: payload.identifier }]
      },
      include: { profile: true }
    });

    if (!user || !user.passwordHash || !(await verifyPassword(payload.password, user.passwordHash))) {
      throw new Error("Invalid login details");
    }

    if (user.status === "SUSPENDED" || user.status === "DELETED") {
      throw new Error("Account is not active");
    }

    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date(), status: "ACTIVE" } });
    await createSession(user.id);
    return NextResponse.json({ ok: true, user: publicUser({ ...user, status: "ACTIVE" }) });
  } catch (error) {
    return fail(error, 401);
  }
}
