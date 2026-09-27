import { NextResponse, after, type NextRequest } from "next/server";
import { z } from "zod";
import { getPrisma } from "../../../../lib/db";
import { enforceRateLimit } from "../../../../lib/rate-limit";
import { recoveryMessage, requestRecovery } from "../../../../lib/password-recovery";
import { recoveryEmailConfigured, sendRecoveryEmail } from "../../../../lib/password-email";
export const maxDuration = 30;
export async function POST(request: NextRequest) {
  const headers = { "Cache-Control": "private, no-store" };
  try {
    await enforceRateLimit(request, { route: "auth.forgot-password", limit: 5, windowMs: 15 * 60_000 });
    const { identifier } = z.object({ identifier: z.string().trim().email().max(254) }).parse(await request.json());
    if (!recoveryEmailConfigured()) return NextResponse.json({ error: "Email recovery is not available yet. Contact support@babra.store. / Kwakira link kuri email ntibirafungurwa." }, { status: 503, headers });
    // Account lookup and delivery happen after the same generic response for everyone.
    after(async () => {
      try { await requestRecovery(getPrisma(), identifier, sendRecoveryEmail); }
      catch { console.error("Password recovery processing failed"); }
    });
    return NextResponse.json({ ok: true, message: recoveryMessage }, { headers });
  } catch (error) {
    const limited = error instanceof Error && error.message === "Rate limit exceeded";
    return NextResponse.json({ error: limited ? "Too many requests. Try again in 15 minutes." : "Enter a valid email address, or try again later." }, { status: limited ? 429 : 400, headers });
  }
}
