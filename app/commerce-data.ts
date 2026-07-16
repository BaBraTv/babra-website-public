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
    description: OFFICIAL_INFORMATION_PENDING,
    audience: OFFICIAL_INFORMATION_PENDING,
    benefits: [OFFICIAL_INFORMATION_PENDING],
    usage: OFFICIAL_INFORMATION_PENDING,
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
    description: OFFICIAL_INFORMATION_PENDING,
    audience: OFFICIAL_INFORMATION_PENDING,
    benefits: [OFFICIAL_INFORMATION_PENDING],
    usage: OFFICIAL_INFORMATION_PENDING,
    alt: approvedProductMedia.men.alt,
    mediaId: approvedProductMedia.men.id
  },
  {
    slug: "babies",
    name: "BaBra Lotion Babies — 500 ml",
    shortName: "Babies Lotion",
    category: "Babies",
    image: approvedProductMedia.babies.path,
    price: 0,
    size: "500 ml",
    description: OFFICIAL_INFORMATION_PENDING,
    audience: OFFICIAL_INFORMATION_PENDING,
    benefits: [OFFICIAL_INFORMATION_PENDING],
    usage: OFFICIAL_INFORMATION_PENDING,
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
