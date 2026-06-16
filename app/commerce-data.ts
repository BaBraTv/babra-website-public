export const site = {
  name: "BaBra Store",
  domain: "babra.store",
  url: "https://www.babra.store",
  company: "BaBra Cosmetics Ltd",
  email: "babracosmeticsltd@gmail.com",
  phone: "+250 788 351 482",
  whatsapp: "250788351482",
  address: "Kigali, Rwanda",
  license:
    "Rwanda FDA and premises license records are managed by BaBra Cosmetics Ltd and shared with verified partners when required.",
  manufacturing:
    "GMP-supported and ISO cosmetics manufacturing support through verified production partners.",
  positioning: "Hydroquinone-free premium skincare positioning with protected formula details."
};

export const OFFICIAL_LOTION_500ML_PRICE_RWF = 25000;
export const USD_ESTIMATE_RATE_RWF = 1300;

export type ProductSlug = "women" | "men" | "kids" | "serum" | "soap" | "pads" | "pocket-fresh";

export type StoreProduct = {
  slug: ProductSlug;
  name: string;
  shortName: string;
  category: string;
  image: string;
  price: number;
  size: string;
  description: string;
  audience: string;
  benefits: string[];
  usage: string;
  alt: string;
};

export const products: StoreProduct[] = [
  {
    slug: "women",
    name: "BaBra Lotion for Women",
    shortName: "Women Lotion",
    category: "Women",
    image: "/brand/official-babra-bottle.png",
    price: OFFICIAL_LOTION_500ML_PRICE_RWF,
    size: "Premium 500ml",
    description:
      "Premium daily body lotion for soft hydration, refined fragrance, and polished skin comfort.",
    audience: "Women and premium daily skincare customers",
    benefits: ["Long-lasting hydration feel", "Soft daily comfort", "Premium fragrance direction", "Retail-ready bottle"],
    usage: "Apply to clean skin after bathing or whenever skin needs comfort. Avoid contact with eyes.",
    alt: "BaBra Lotion for Women 500ml premium body lotion bottle"
  },
  {
    slug: "men",
    name: "BaBra Lotion for Men",
    shortName: "Men Lotion",
    category: "Men",
    image: "/brand/official-babra-bottle-men.png",
    price: OFFICIAL_LOTION_500ML_PRICE_RWF,
    size: "Premium 500ml",
    description:
      "Clean, confident body care for men with a premium fresh feel and everyday skin comfort.",
    audience: "Men, salons, retailers, and grooming customers",
    benefits: ["Fresh confident feel", "Non-greasy comfort", "Premium masculine direction", "Wholesale-ready SKU"],
    usage: "Apply to clean, dry skin. Use daily for a fresh premium body-care routine.",
    alt: "BaBra Lotion for Men 500ml premium body lotion bottle"
  },
  {
    slug: "kids",
    name: "BaBra Lotion Baby",
    shortName: "Baby Lotion",
    category: "Baby",
    image: "/brand/official-babra-bottle-kids.png",
    price: OFFICIAL_LOTION_500ML_PRICE_RWF,
    size: "Premium 500ml",
    description:
      "Family-friendly lotion presentation for gentle daily comfort while keeping sensitive product details protected.",
    audience: "Babies, kids, and family skincare routines",
    benefits: ["Gentle family positioning", "Soft daily comfort", "Parent-friendly guidance", "Safe public product preview"],
    usage: "Apply under adult supervision. Avoid eyes and broken skin. Stop use if irritation occurs.",
    alt: "BaBra Lotion Baby premium 500ml body lotion bottle"
  },
  {
    slug: "serum",
    name: "BaBra Anti-Wrinkle Serum",
    shortName: "Serum",
    category: "Serum",
    image: "/products/serum-safe-preview.jpg",
    price: 18000,
    size: "30ml",
    description:
      "Premium serum preview for advanced care positioning, retail shelf presence, and partner discussions.",
    audience: "Advanced skincare customers and verified retail partners",
    benefits: ["Premium shelf presence", "Advanced care positioning", "Partner-ready preview", "Protected label details"],
    usage: "Use a small amount on clean skin as directed on the physical product label.",
    alt: "BaBra Anti-Wrinkle Serum premium bottle and retail box"
  },
  {
    slug: "soap",
    name: "BaBra Soap",
    shortName: "Soap",
    category: "Soap",
    image: "/brand/logo.jpeg",
    price: 2500,
    size: "Single bar",
    description: "Future premium hygiene and skincare soap line for daily BaBra body-care routines.",
    audience: "Retail customers, shops, hotels, and family hygiene buyers",
    benefits: ["Daily hygiene positioning", "Premium beauty ecosystem fit", "Retail-ready roadmap", "Public-safe preview"],
    usage: "Use with water for daily cleansing. Follow the physical product label when available.",
    alt: "BaBra Soap premium public-safe preview"
  },
  {
    slug: "pads",
    name: "BaBra Pads",
    shortName: "Pads",
    category: "Pads",
    image: "/brand/logo.jpeg",
    price: 3000,
    size: "Pack",
    description: "Personal-care product line positioned for comfort, confidence, and trusted BaBra distribution.",
    audience: "Retail customers, shops, pharmacies, schools, and distributors",
    benefits: ["Personal-care confidence", "Retail shelf potential", "Distributor-ready category", "Public-safe preview"],
    usage: "Use as directed on the physical product packaging.",
    alt: "BaBra Pads public-safe product category preview"
  },
  {
    slug: "pocket-fresh",
    name: "BaBra Pocket Fresh",
    shortName: "Pocket Fresh",
    category: "Pocket Fresh",
    image: "/brand/logo.jpeg",
    price: 1500,
    size: "Pocket size",
    description: "Portable freshness product category for modern customers, retail counters, and travel use.",
    audience: "Retail customers, students, travelers, shops, and beauty counters",
    benefits: ["Portable freshness", "Impulse retail category", "Youth-friendly product line", "Wholesale-ready roadmap"],
    usage: "Use as directed on the physical product packaging.",
    alt: "BaBra Pocket Fresh public-safe product category preview"
  }
];

export const pricingTiers = [
  { key: "Retail", min: 1, max: 11, discount: 0, note: "Official retail price shown publicly" },
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
  return products.find((product) => product.slug === slug);
}

export function getPricing(quantity: number) {
  return pricingTiers.find((tier) => quantity >= tier.min && (tier.max === null || quantity <= tier.max)) ?? pricingTiers[0];
}

export function formatRwf(value: number) {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)} RWF`;
}

export function formatUsdEstimate(value: number) {
  return `~$${(value / USD_ESTIMATE_RATE_RWF).toFixed(2)} USD`;
}

export function whatsappOrderUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
