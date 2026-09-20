import { approvedProductMedia } from "./data/official-media";

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
  phone: "+250788351482",
  email: "babracosmeticsltd@gmail.com",
  manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd."
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
  size: "500 ml";
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
    name: "BaBra Lotion Women — 500 ml",
    shortName: "Women Lotion",
    category: "Women",
    image: approvedProductMedia.women.path,
    price: 0,
    size: "500 ml",
    description: "Official 500 ml BaBra Lotion for women. Contact BaBra for current price, stock and delivery options.",
    audience: "Check the product label and contact BaBra for suitability guidance",
    benefits: [],
    usage: "Follow the directions on the product label",
    fragrance: "Ask BaBra about the current variant before ordering",
    gallery: [approvedProductMedia.women.path],
    ctaLabel: "Request official details",
    alt: approvedProductMedia.women.alt,
    mediaId: approvedProductMedia.women.id
  },
  {
    slug: "men",
    name: "BaBra Lotion Men — 500 ml",
    shortName: "Men Lotion",
    category: "Men",
    image: approvedProductMedia.men.path,
    price: 0,
    size: "500 ml",
    description: "Official 500 ml BaBra Lotion for men. Contact BaBra for current price, stock and delivery options.",
    audience: "Check the product label and contact BaBra for suitability guidance",
    benefits: [],
    usage: "Follow the directions on the product label",
    fragrance: "Ask BaBra about the current variant before ordering",
    gallery: [approvedProductMedia.men.path],
    ctaLabel: "Request official details",
    alt: approvedProductMedia.men.alt,
    mediaId: approvedProductMedia.men.id
  },
  {
    slug: "babies",
    name: "BaBra Lotion Kids — 500 ml",
    shortName: "Kids Lotion",
    category: "Kids",
    image: approvedProductMedia.babies.path,
    price: 0,
    size: "500 ml",
    description: "BaBra Lotion Kids, 500 ml. Soft Care for Kids, as shown on the package. Contact BaBra for current price, stock and delivery options.",
    audience: "Check the product label and contact BaBra for suitability guidance",
    benefits: [],
    usage: "Follow the directions on the product label",
    fragrance: "Ask BaBra about the current variant before ordering",
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
