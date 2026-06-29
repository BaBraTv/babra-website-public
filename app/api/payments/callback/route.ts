import { NextResponse, type NextRequest } from "next/server";
import { getPrisma } from "../../../../lib/db";
import { assertValidPaymentCallbackSecret, paymentCallbackSchema } from "../../../../lib/payments";

export async function POST(request: NextRequest) {
  try {
    assertValidPaymentCallbackSecret(request.headers.get("x-babra-payment-secret"));
    const payload = paymentCallbackSchema.parse(await request.json());
    const prisma = getPrisma();

    const payment = await prisma.payment.update({
      where: { internalReference: payload.internalReference },
      data: {
        status: payload.status,
        providerReference: payload.providerReference,
        amountCents: payload.amountCents,
        currency: payload.currency,
        callbackPayload: payload.rawPayload ?? payload,
        callbackReceivedAt: new Date(),
        paidAt: payload.status === "SUCCEEDED" ? new Date() : undefined
      }
    });

    return NextResponse.json({ ok: true, paymentId: payment.id });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Payment callback failed" },
      { status: 400 }
    );
  }
}
