import { NextRequest } from "next/server";
import { z } from "zod";

export function requireSameOrigin(request: NextRequest) {
  const method = request.method.toUpperCase();
  if (["GET", "HEAD", "OPTIONS"].includes(method)) return;

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) {
    throw new Error("CSRF validation failed");
  }

  const originHost = new URL(origin).host;
  if (originHost !== host) {
    throw new Error("CSRF validation failed");
  }
}

export const adminProductSchema = z.object({
  slug: z.string().trim().min(2).max(120).optional(),
  name: z.string().trim().min(2).max(180).optional(),
  shortName: z.string().trim().max(120).optional().nullable(),
  description: z.string().trim().max(4000).optional().nullable(),
  size: z.string().trim().max(80).optional().nullable(),
  category: z.string().trim().min(1).max(120).optional(),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
  priceCents: z.number().int().min(0).optional().nullable(),
  discountCents: z.number().int().min(0).optional().nullable(),
  stockQuantity: z.number().int().min(0).optional(),
  lowStockThreshold: z.number().int().min(0).optional().nullable(),
  sku: z.string().trim().max(120).optional().nullable(),
  barcode: z.string().trim().max(160).optional().nullable(),
  barcodePlaceholder: z.string().trim().max(240).optional().nullable(),
  ingredientsPlaceholder: z.string().trim().max(4000).optional().nullable(),
  directions: z.string().trim().max(4000).optional().nullable(),
  features: z.array(z.string().trim().min(1).max(240)).optional(),
  gallery: z.array(z.object({ src: z.string().trim().min(1).max(500), alt: z.string().trim().max(240).optional() })).optional(),
  imageUrl: z.string().trim().max(500).optional().nullable(),
  imageAlt: z.string().trim().max(240).optional().nullable(),
  isFeatured: z.boolean().optional()
});

export const adminProductCreateSchema = adminProductSchema.extend({
  slug: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(180),
  category: z.string().trim().min(1).max(120)
});

export const adminTaxonomySchema = z.object({
  slug: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(1000).optional().nullable(),
  sortOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().optional()
});

export const adminBrandSchema = z.object({
  slug: z.string().trim().min(2).max(120),
  name: z.string().trim().min(2).max(160),
  website: z.string().trim().url().optional().nullable(),
  isActive: z.boolean().optional()
});