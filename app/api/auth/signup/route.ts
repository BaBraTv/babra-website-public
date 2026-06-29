import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { signupSchema, hashPassword } from "../../../../lib/auth";
import { createSession, publicUser } from "../../../../lib/session";
import { fail } from "../../../../lib/api";

export async function POST(request: NextRequest) {
  try {
    const payload = signupSchema.parse(await request.json());
    if (!payload.email && !payload.phone) {
      throw new Error("Email or phone is required");
    }

    const prisma = getPrisma();
    const exists = await prisma.user.findFirst({
      where: {
        OR: [
          ...(payload.email ? [{ email: payload.email }] : []),
          ...(payload.phone ? [{ phone: payload.phone }] : [])
        ]
      }
    });

    if (exists) {
      throw new Error("Account already exists. Please login.");
    }

    const isAdminSetup = payload.role !== "CUSTOMER" && request.headers.get("x-babra-admin-setup-secret") === process.env.ADMIN_SETUP_SECRET;
    const user = await prisma.user.create({
      data: {
        fullName: payload.fullName,
        email: payload.email || null,
        phone: payload.phone || null,
        role: isAdminSetup ? payload.role : "CUSTOMER",
        status: "ACTIVE",
        passwordHash: await hashPassword(payload.password),
        profile: { create: {} }
      },
      include: { profile: true }
    });

    await createSession(user.id);
    return NextResponse.json({ ok: true, user: publicUser(user) });
  } catch (error) {
    return fail(error);
  }
}
