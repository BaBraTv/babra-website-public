import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { resetPassword } from "../../../../lib/password-recovery";
export async function POST(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store" };
  try {
    await enforceRateLimit(request, { route: "auth.reset-password", limit: 5, windowMs: 15 * 60_000 });
    const data = z.object({ token: z.string().regex(/^[a-f0-9]{64}$/), password: z.string().min(12).max(72) }).parse(await request.json());
    await resetPassword(getPrisma(), data.token, data.password);
    return NextResponse.json({ ok: true }, { headers });
  } catch (error) {
    const limited = error instanceof Error && error.message === "Rate limit exceeded";
    return NextResponse.json({ error: limited ? "Too many attempts. Try again in 15 minutes." : "This link is invalid, expired or already used. Request a new link. New passwords must have 12–72 characters (maximum 72 UTF-8 bytes)." }, { status: limited ? 429 : 400, headers });
  }
}
