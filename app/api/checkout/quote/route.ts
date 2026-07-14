import { NextResponse, type NextRequest } from "next/server";
import { fail } from "../../../../lib/api";
import { getPrisma } from "../../../../lib/db";
import { priceCheckout } from "../../../../lib/commerce";
import { orderSubmissionSchema } from "../../../../lib/validation";
import { assertRateLimit } from "../../../../lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    await assertRateLimit(request, "checkout:quote", 30, 60_000);
    const payload = orderSubmissionSchema.pick({ items: true, couponCode: true, deliveryOption: true }).parse(await request.json());
    const quote = await priceCheckout(getPrisma(), {
      items: payload.items,
      couponCode: payload.couponCode,
      deliveryOption: payload.deliveryOption
    });
    return NextResponse.json({
      ok: true,
      quote: {
        items: quote.enrichedItems,
        subtotalCents: quote.subtotalCents,
        deliveryCents: quote.deliveryCents,
        taxCents: quote.taxCents,
        discountCents: quote.discountCents,
        totalCents: quote.totalCents,
        couponApplied: Boolean(quote.coupon)
      }
    });
  } catch (error) {
    return fail(error);
  }
}
