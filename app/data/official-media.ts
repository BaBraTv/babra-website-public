export type OfficialMediaCategory = "logo" | "product" | "founder" | "mobile-hub" | "foundation" | "schools" | "lifetalk" | "holding";
export type OfficialMediaStatus = "approved" | "pending";

export type OfficialMediaItem = {
  id: string;
  title: string;
  category: OfficialMediaCategory;
  path: string;
  alt: string;
  status: OfficialMediaStatus;
  approved: boolean;
  usage: string[];
  sourceNote: string;
};

export const officialMediaPendingLabel = "Official BaBra media pending approval.";

export const officialMedia: OfficialMediaItem[] = [
  {
    id: "babra-logo-primary",
    title: "Official BaBra logo",
    category: "logo",
    path: "/media/logos/babra-logo.jpeg",
    alt: "Official BaBra logo",
    status: "approved",
    approved: true,
    usage: ["navigation", "footer", "company cards", "pending division media fallback"],
    sourceNote: "Verified existing repository asset copied from public/brand/logo.jpeg."
  },
  {
    id: "babra-lotion-women-500ml",
    title: "BaBra Lotion Women — 500 ml",
    category: "product",
    path: "/media/products/babra-lotion-women-500ml.png",
    alt: "Official BaBra Lotion Women 500 ml bottle",
    status: "approved",
    approved: true,
    usage: ["homepage hero", "featured products", "store", "product cards", "product detail pages", "cart", "checkout"],
    sourceNote: "Verified existing repository asset copied from public/brand/official-babra-bottle.png."
  },
  {
    id: "babra-lotion-men-500ml",
    title: "BaBra Lotion Men — 500 ml",
    category: "product",
    path: "/media/products/babra-lotion-men-500ml.png",
    alt: "Official BaBra Lotion Men 500 ml bottle",
    status: "approved",
    approved: true,
    usage: ["homepage hero", "featured products", "store", "product cards", "product detail pages", "cart", "checkout"],
    sourceNote: "Verified existing repository asset copied from public/brand/official-babra-bottle-men.png."
  },
  {
    id: "babra-lotion-babies-500ml",
    title: "BaBra Lotion Babies — 500 ml",
    category: "product",
    path: "/media/products/babra-lotion-babies-500ml.png",
    alt: "Official BaBra Lotion Babies 500 ml bottle",
    status: "approved",
    approved: true,
    usage: ["homepage hero", "featured products", "store", "product cards", "product detail pages", "cart", "checkout"],
    sourceNote: "Verified existing repository asset copied from public/brand/official-babra-bottle-kids.png."
  }
];

export const officialMediaById = Object.fromEntries(officialMedia.map((item) => [item.id, item])) as Record<string, OfficialMediaItem>;

export const approvedProductMedia = {
  women: officialMediaById["babra-lotion-women-500ml"],
  men: officialMediaById["babra-lotion-men-500ml"],
  babies: officialMediaById["babra-lotion-babies-500ml"]
} as const;

