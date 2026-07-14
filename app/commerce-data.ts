import { editableCosmeticsProducts, getEditableProduct, productPriceLabel, productStockLabel } from "./data/cosmetics-catalog";

export const site = {
  name: "BaBra Store",
  domain: "babra.store",
  url: "https://www.babra.store",
  company: "BaBra Cosmetics Ltd",
  email: "support@babra.store",
  phone: "+250 788 351 482",
  whatsapp: "250788351482",
  address: "Kigali, Rwanda",
  license:
    "Rwanda FDA and premises license records are managed by BaBra Cosmetics Ltd and shared with verified partners when required.",
  manufacturing:
    "GMP-supported and ISO cosmetics manufacturing support through verified production partners.",
  positioning: "Hydroquinone-free premium skincare positioning with protected formula details."
};

export const PRICE_INQUIRY_LABEL = "Price on request";
export const PRICE_INQUIRY_NOTE = "BaBra confirms official price, discount, stock, delivery, reseller, wholesale, or distributor terms after inquiry.";

export type ProductSlug = "women" | "men" | "babies";

export type StoreProduct = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  category: string;
  brand: string;
  image: string;
  price: number | null;
  priceCents: number | null;
  discountCents: number | null;
  stock: number | null;
  sku: string;
  barcodePlaceholder: string;
  size: string;
  description: string;
  audience: string;
  benefits: string[];
  features: string[];
  ingredientsPlaceholder: string;
  directions: string;
  usage: string;
  gallery: { src: string; alt: string }[];
  alt: string;
  isFeatured: boolean;
  tags: string[];
};

export const products: StoreProduct[] = editableCosmeticsProducts.map((product) => ({
  slug: product.slug,
  name: product.name,
  shortName: product.shortName,
  category: product.category,
  brand: product.brand,
  image: product.gallery[0].src,
  price: product.priceCents === null ? null : product.priceCents / 100,
  priceCents: product.priceCents,
  discountCents: product.discountCents,
  stock: product.stock,
  sku: product.sku,
  barcodePlaceholder: product.barcodePlaceholder,
  size: product.size,
  description: product.description,
  audience: `${product.category} customers`,
  benefits: product.features,
  features: product.features,
  ingredientsPlaceholder: product.ingredientsPlaceholder,
  directions: product.directions,
  usage: product.directions,
  gallery: product.gallery,
  alt: product.gallery[0].alt,
  isFeatured: product.isFeatured,
  tags: product.tags
}));

export const pricingTiers = [
  { key: "Retail", min: 1, max: 11, discount: 0, note: "Ask BaBra Cosmetics for official retail price" },
  { key: "Reseller", min: 12, max: 47, discount: 0, note: "Contact BaBra Cosmetics for reseller pricing" },
  { key: "Wholesale", min: 48, max: 119, discount: 0, note: "Contact BaBra Cosmetics for wholesale pricing" },
  { key: "Distributor", min: 120, max: null, discount: 0, note: "Contact BaBra Cosmetics for distributor pricing" }
] as const;

export const rwandaLocations = {
  "Kigali City": ["Gasabo", "Kicukiro", "Nyarugenge"],
  "Eastern Province": ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
  "Northern Province": ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
  "Southern Province": ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  "Western Province": ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"]
};

export function getProduct(slug: string) {
  const product = getEditableProduct(slug);
  return product ? products.find((item) => item.slug === product.slug) : undefined;
}

export function getPricing(quantity: number) {
  return pricingTiers.find((tier) => quantity >= tier.min && (tier.max === null || quantity <= tier.max)) ?? pricingTiers[0];
}

export function formatRwf(value: number) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)} RWF`;
}

export function formatUsdEstimate(value: number) {
  return `Quote depends on official exchange rate and delivery terms for ${formatRwf(value)}.`;
}

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export { productPriceLabel, productStockLabel };