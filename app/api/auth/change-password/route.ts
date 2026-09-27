import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { requireCurrentUser } from "../../../../lib/session";
import { changePassword } from "../../../../lib/password-recovery";
export async function POST(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store" };
  const user = await requireCurrentUser().catch(() => null);
  if (!user || user.status !== "ACTIVE") return NextResponse.json({ error: "Please sign in." }, { status: 401, headers });
  try {
    await enforceRateLimit(request, { route: "auth.change-password", limit: 5, windowMs: 15 * 60_000 });
    const data = z.object({ currentPassword: z.string().min(1).max(128), password: z.string().min(12).max(72) }).parse(await request.json());
    await changePassword(getPrisma(), user.id, data.currentPassword, data.password);
    return NextResponse.json({ ok: true }, { headers });
  } catch (error) {
    const limited = error instanceof Error && error.message === "Rate limit exceeded";
    return NextResponse.json({ error: limited ? "Too many attempts. Try again in 15 minutes." : "Check your current password. New passwords must have 12–72 characters (maximum 72 UTF-8 bytes)." }, { status: limited ? 429 : 400, headers });
  }
}
