import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { assertValidPaymentCallbackSecret, paymentCallbackSchema } from "../../../../lib/payments";
import { fail } from "../../../../lib/api";
import { enforceRateLimit } from "../../../../lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    assertValidPaymentCallbackSecret(request.headers.get("x-babra-payment-secret"));
    await enforceRateLimit(request, { route: "payments.callback", limit: 120, windowMs: 60_000 });
    const payload = paymentCallbackSchema.parse(await request.json());
    const prisma = getPrisma();

    const existing = await prisma.payment.findUnique({ where: { internalReference: payload.internalReference } });
    if (
      !existing ||
      existing.provider !== payload.provider ||
      existing.amountCents !== payload.amountCents ||
      existing.currency !== payload.currency
    ) {
      throw new Error("Payment callback verification failed");
    }
    if (existing.providerReference && existing.providerReference !== payload.providerReference) {
      throw new Error("Payment callback reference conflict");
    }
    if (existing.status === payload.status && existing.providerReference === payload.providerReference) {
      return NextResponse.json({ ok: true, paymentId: existing.id, duplicate: true });
    }

    const payment = await prisma.payment.update({
      where: { internalReference: payload.internalReference },
      data: {
        status: payload.status,
        providerReference: payload.providerReference,
        callbackPayload: payload.rawPayload ?? payload,
        callbackReceivedAt: new Date(),
        paidAt: payload.status === "SUCCEEDED" ? new Date() : undefined
      }
    });

    return NextResponse.json({ ok: true, paymentId: payment.id });
  } catch (error) {
    return fail(error);
  }
}
