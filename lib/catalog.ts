import { products } from "../app/commerce-data";
import { getPrisma } from "./db";

export async function ensureCatalogProduct(slug: string) {
  const product = products.find((item) => item.slug === slug);
  if (!product) return null;

  return getPrisma().product.upsert({
    where: { slug },
    update: {
      name: product.name,
      shortName: product.shortName,
      description: product.description,
      size: product.size,
      category: product.category,
      status: "ACTIVE",
      priceCents: product.priceCents,
      currency: "RWF",
      imageUrl: product.image,
      imageAlt: product.alt
    },
    create: {
      slug,
      name: product.name,
      shortName: product.shortName,
      description: product.description,
      size: product.size,
      category: product.category,
      status: "ACTIVE",
      priceCents: product.priceCents,
      currency: "RWF",
      stockQuantity: 0,
      imageUrl: product.image,
      imageAlt: product.alt
    }
  });
}

export function catalogPriceCents(slug: string) {
  const product = products.find((item) => item.slug === slug);
  return product?.priceCents ?? 0;
}

export function catalogName(slug: string) {
  return products.find((item) => item.slug === slug)?.name ?? "BaBra product";
}
