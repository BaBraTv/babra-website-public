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
    paymentProvider: z.enum(["CASH_ON_DELIVERY", "MTN_MOMO", "AIRTEL_MONEY", "BANK_TRANSFER", "CARD", "USDT", "MANUAL"]).default("CASH_ON_DELIVERY")
  })
  .merge(rwandaAddressSchema);

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
