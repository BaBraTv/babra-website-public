import { z } from "zod";
import type { PaymentProvider } from "@prisma/client";

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

export type PaymentIntentInput = {
  orderId: string;
  orderNumber: string;
  amountCents: number;
  currency: string;
  customerPhone?: string | null;
  callbackUrl?: string | null;
};

export type PaymentIntentResult = {
  provider: PaymentProvider;
  status: "PENDING" | "MANUAL_REVIEW" | "PROCESSING";
  instructions: string;
  providerReference?: string;
  callbackUrl?: string;
};

type ProviderDefinition = {
  provider: PaymentProvider;
  displayName: string;
  createIntent(input: PaymentIntentInput): PaymentIntentResult;
};

function manualProvider(provider: PaymentProvider, displayName: string, instructions: string): ProviderDefinition {
  return {
    provider,
    displayName,
    createIntent(input) {
      return {
        provider,
        status: provider === "CASH_ON_DELIVERY" ? "PENDING" : "MANUAL_REVIEW",
        instructions,
        providerReference: `${provider}-${input.orderNumber}`
      };
    }
  };
}

export const paymentProviders: Record<PaymentProvider, ProviderDefinition> = {
  CASH_ON_DELIVERY: manualProvider("CASH_ON_DELIVERY", "Cash on Delivery", "Customer pays after delivery is confirmed by BaBra staff."),
  MTN_MOMO: manualProvider("MTN_MOMO", "MTN Mobile Money", "Manual MTN MoMo confirmation is prepared. API credentials must be configured before automatic collection."),
  AIRTEL_MONEY: manualProvider("AIRTEL_MONEY", "Airtel Money", "Manual Airtel Money confirmation is prepared. API credentials must be configured before automatic collection."),
  BANK_TRANSFER: manualProvider("BANK_TRANSFER", "Bank Transfer", "Bank transfer confirmation is manually reviewed by BaBra finance."),
  CARD: manualProvider("CARD", "Stripe/Card", "Stripe architecture is prepared. Add Stripe keys in environment variables before enabling live card payments."),
  MANUAL: manualProvider("MANUAL", "Manual Review", "Payment is held for manual admin review."),
  USDT: manualProvider("USDT", "USDT", "Crypto payment remains manual until official wallet and compliance settings are configured.")
};

export function createPaymentIntent(provider: PaymentProvider, input: PaymentIntentInput) {
  return paymentProviders[provider].createIntent(input);
}
