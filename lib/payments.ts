import { z } from "zod";

export const paymentCallbackSchema = z.object({
  provider: z.enum(["MTN_MOMO", "AIRTEL_MONEY", "BANK_TRANSFER", "CARD", "USDT", "MANUAL"]),
  providerReference: z.string().trim().min(1),
  internalReference: z.string().trim().min(1),
  status: z.enum(["PENDING", "PROCESSING", "SUCCEEDED", "FAILED", "CANCELLED", "REFUNDED", "CALLBACK_RECEIVED", "MANUAL_REVIEW"]),
  amountCents: z.number().int().nonnegative(),
  currency: z.string().trim().min(3).max(8).default("RWF"),
  rawPayload: z.unknown().optional()
});

export function assertValidPaymentCallbackSecret(receivedSecret: string | null) {
  const expectedSecret = process.env.PAYMENT_CALLBACK_SECRET;
  if (!expectedSecret || receivedSecret !== expectedSecret) {
    throw new Error("Invalid payment callback secret");
  }
}
