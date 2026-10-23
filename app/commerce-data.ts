import { approvedProductMedia } from "./data/official-media";
import { productKnowledge } from "../lib/product-knowledge";

export const site = {
  name: "BaBra Store",
  domain: "babra.store",
  url: "https://www.babra.store",
  company: "BaBra Cosmetics Ltd",
  email: "support@babra.store",
  phone: "+250 788 351 482",
  whatsapp: "250788351482",
  address: "Kigali, Rwanda",
  license: "Official information pending",
  manufacturing: "Official information pending",
  positioning: "Official information pending"
};

export const cosmetics = {
  company: "BaBra Cosmetics Ltd",
  tin: "149358983",
  phone: "+250 788 351 482",
  whatsapp: "250788351482",
  email: "babracosmeticsltd@gmail.com",
  manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd."
} as const;

export const rwandaOrders = {
  partner: "VIDAPHARMA",
  phone: "0734 299 777",
  whatsapp: "250734299777"
} as const;

export const PRICE_INQUIRY_LABEL = "Price on request";
export const PRICE_INQUIRY_NOTE = "Official price, stock, delivery, reseller, wholesale, and distributor details are confirmed by BaBra.";
export const OFFICIAL_INFORMATION_PENDING = "Official information pending";

export type ProductSlug = "women" | "men" | "babies";

export type StoreProduct = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  category: string;
  image: string;
  price: number;
  size: "500 mL";
  description: string;
  audience: string;
  benefits: string[];
  usage: string;
  fragrance: string;
  gallery: string[];
  ctaLabel: string;
  alt: string;
  mediaId: string;
};

export const products: StoreProduct[] = [
  {
    slug: "women",
    name: "BaBra Lotion Signature for Her — 500 mL",
    shortName: "Signature for Her",
    category: "For Her",
    image: approvedProductMedia.women.path,
    price: 0,
    size: "500 mL",
    description: productKnowledge.women.overview,
    audience: productKnowledge.women.intendedUse,
    benefits: productKnowledge.women.ingredientHighlights.filter((ingredient) => ingredient.state !== "requires-product-specific-review").slice(0, 4).map((ingredient) => ingredient.displayName || ingredient.name),
    usage: productKnowledge.women.usage,
    fragrance: "Fragrance is listed in the current product documents; the fragrance composition and allergen disclosure remain under final review.",
    gallery: [approvedProductMedia.women.path],
    ctaLabel: "Request official details",
    alt: approvedProductMedia.women.alt,
    mediaId: approvedProductMedia.women.id
  },
  {
    slug: "men",
    name: "BaBra Lotion Signature for Him — 500 mL",
    shortName: "Signature for Him",
    category: "For Him",
    image: approvedProductMedia.men.path,
    price: 0,
    size: "500 mL",
    description: productKnowledge.men.overview,
    audience: productKnowledge.men.intendedUse,
    benefits: productKnowledge.men.ingredientHighlights.filter((ingredient) => ingredient.state !== "requires-product-specific-review").slice(0, 4).map((ingredient) => ingredient.displayName || ingredient.name),
    usage: productKnowledge.men.usage,
    fragrance: "Fragrance is listed in the current product documents; the fragrance composition and allergen disclosure remain under final review.",
    gallery: [approvedProductMedia.men.path],
    ctaLabel: "Request official details",
    alt: approvedProductMedia.men.alt,
    mediaId: approvedProductMedia.men.id
  },
  {
    slug: "babies",
    name: "BaBra Lotion Soft Care for Kids — 500 mL",
    shortName: "Soft Care for Kids",
    category: "Kids",
    image: approvedProductMedia.babies.path,
    price: 0,
    size: "500 mL",
    description: productKnowledge.babies.overview,
    audience: productKnowledge.babies.intendedUse,
    benefits: productKnowledge.babies.ingredientHighlights.slice(0, 4).map((ingredient) => ingredient.displayName || ingredient.name),
    usage: productKnowledge.babies.usage,
    fragrance: "Fragrance is listed in the current product documents; age-specific allergen and safety substantiation remain under final review.",
    gallery: [approvedProductMedia.babies.path],
    ctaLabel: "Request official details",
    alt: approvedProductMedia.babies.alt,
    mediaId: approvedProductMedia.babies.id
  }
];

export const pricingTiers = [
  { key: "Retail", min: 1, max: 11, discount: 0, note: PRICE_INQUIRY_NOTE },
  { key: "Reseller", min: 12, max: 47, discount: 0, note: PRICE_INQUIRY_NOTE },
  { key: "Wholesale", min: 48, max: 119, discount: 0, note: PRICE_INQUIRY_NOTE },
  { key: "Distributor", min: 120, max: null, discount: 0, note: PRICE_INQUIRY_NOTE }
] as const;

export const rwandaLocations = {
  "Kigali City": ["Gasabo", "Kicukiro", "Nyarugenge"],
  "Eastern Province": ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
  "Northern Province": ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
  "Southern Province": ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  "Western Province": ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"]
};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getPricing(quantity: number) {
  return pricingTiers.find((tier) => quantity >= tier.min && (tier.max === null || quantity <= tier.max)) ?? pricingTiers[0];
}

export function formatRwf(_value?: number) {
  return PRICE_INQUIRY_LABEL;
}

export function formatUsdEstimate(_value?: number) {
  return PRICE_INQUIRY_LABEL;
}

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function rwandaOrderUrl(message: string) {
  return `https://wa.me/${rwandaOrders.whatsapp}?text=${encodeURIComponent(message)}`;
}
