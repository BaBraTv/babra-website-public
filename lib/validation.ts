import { z } from "zod";

export const rwandaAddressSchema = z.object({
  province: z.string().trim().optional(),
  district: z.string().trim().optional(),
  sector: z.string().trim().optional(),
  cell: z.string().trim().optional(),
  village: z.string().trim().optional(),
  landmark: z.string().trim().max(240).optional(),
  deliveryNotes: z.string().trim().max(1000).optional()
});

export const checkoutAddressSchema = rwandaAddressSchema.extend({
  recipientName: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(32).optional().or(z.literal(""))
});

export const contactMessageSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().optional().or(z.literal("")),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(5).max(4000),
  sourcePage: z.string().trim().max(240).optional()
});

export const orderItemSchema = z.object({
  productSlug: z.string().trim().min(1).max(120),
  quantity: z.number().int().min(1).max(500)
});

export const orderSubmissionSchema = z
  .object({
    customerName: z.string().trim().min(2).max(120),
    customerEmail: z.string().trim().email().optional().or(z.literal("")),
    customerPhone: z.string().trim().min(7).max(32),
    items: z.array(orderItemSchema).min(1),
    paymentProvider: z.enum(["CASH_ON_DELIVERY", "MTN_MOMO", "AIRTEL_MONEY", "BANK_TRANSFER", "CARD", "USDT", "MANUAL"]).default("CASH_ON_DELIVERY"),
    billingAddress: checkoutAddressSchema.optional(),
    shippingAddress: checkoutAddressSchema.optional(),
    deliveryOption: z.enum(["PICKUP", "KIGALI_DELIVERY", "RWANDA_DELIVERY", "INTERNATIONAL_QUOTE"]).default("KIGALI_DELIVERY"),
    couponCode: z.string().trim().max(80).optional().or(z.literal("")),
    giftNote: z.string().trim().max(500).optional().or(z.literal(""))
  })
  .merge(rwandaAddressSchema);

export const savedCartSchema = z.object({
  sessionId: z.string().trim().max(120).optional().or(z.literal("")),
  items: z.array(orderItemSchema).max(100),
  coupon: z.string().trim().max(80).optional().or(z.literal("")),
  giftNote: z.string().trim().max(500).optional().or(z.literal(""))
});

export const wishlistSchema = z.object({
  productSlug: z.string().trim().min(1).max(120)
});

export const recentlyViewedSchema = z.object({
  productSlug: z.string().trim().min(1).max(120),
  sessionId: z.string().trim().max(120).optional().or(z.literal(""))
});

export const couponSchema = z.object({
  code: z.string().trim().min(2).max(80).transform((value) => value.toUpperCase()),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  discountType: z.enum(["FIXED", "PERCENTAGE"]),
  discountCents: z.number().int().min(0).optional().nullable(),
  discountPercent: z.number().int().min(0).max(100).optional().nullable(),
  startsAt: z.string().datetime().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  maxRedemptions: z.number().int().min(1).optional().nullable(),
  isActive: z.boolean().optional()
});

export const shippingZoneSchema = z.object({
  code: z.string().trim().min(2).max(80).transform((value) => value.toUpperCase()),
  name: z.string().trim().min(2).max(160),
  countries: z.array(z.string().trim().min(2).max(3)).min(1),
  regions: z.array(z.string().trim().min(1).max(120)).optional(),
  isActive: z.boolean().optional()
});

export const shippingMethodSchema = z.object({
  zoneId: z.string().trim().min(1),
  code: z.string().trim().min(2).max(80).transform((value) => value.toUpperCase()),
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  baseFeeCents: z.number().int().min(0),
  currency: z.string().trim().min(3).max(8).default("RWF"),
  estimateMinDays: z.number().int().min(0).optional().nullable(),
  estimateMaxDays: z.number().int().min(0).optional().nullable(),
  supportsCOD: z.boolean().optional(),
  requiresQuote: z.boolean().optional(),
  isActive: z.boolean().optional()
});

export const refundRequestSchema = z.object({
  orderId: z.string().trim().min(1),
  paymentId: z.string().trim().min(1).optional().or(z.literal("")),
  reason: z.string().trim().min(5).max(1000),
  amountCents: z.number().int().min(1),
  customerNotes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const refundReviewSchema = z.object({
  refundId: z.string().trim().min(1),
  status: z.enum(["UNDER_REVIEW", "APPROVED", "REJECTED", "PROCESSING", "REFUNDED", "CANCELLED"]),
  adminNotes: z.string().trim().max(2000).optional().or(z.literal(""))
});

export const jobApplicationSchema = z
  .object({
    fullName: z.string().trim().min(2).max(120),
    email: z.string().trim().email().optional().or(z.literal("")),
    phone: z.string().trim().min(7).max(32),
    roleApplied: z.string().trim().min(2).max(160),
    division: z.string().trim().max(120).optional(),
    experience: z.string().trim().max(3000).optional(),
    coverMessage: z.string().trim().max(4000).optional()
  })
  .merge(rwandaAddressSchema.pick({ province: true, district: true }));

export const lostFoundReportSchema = z
  .object({
    reportType: z.enum(["LOST", "FOUND"]),
    reporterName: z.string().trim().min(2).max(120),
    reporterPhone: z.string().trim().min(7).max(32),
    reporterEmail: z.string().trim().email().optional().or(z.literal("")),
    itemType: z.string().trim().min(2).max(120),
    itemTitle: z.string().trim().min(2).max(160),
    itemDescription: z.string().trim().min(5).max(4000),
    ownerName: z.string().trim().max(120).optional(),
    foundLocation: z.string().trim().max(240).optional(),
    lostLocation: z.string().trim().max(240).optional()
  })
  .merge(rwandaAddressSchema.pick({ province: true, district: true, sector: true, cell: true, village: true }));

export const investorAccessRequestSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  position: z.string().trim().max(120).optional().or(z.literal("")),
  country: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email(),
  phone: z.string().trim().max(32).optional().or(z.literal("")),
  projectArea: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal(""))
});
