export type CosmeticsProductSlug = "women" | "men" | "babies";

export type EditableCosmeticsProduct = {
  slug: CosmeticsProductSlug;
  name: string;
  shortName: string;
  category: "Women" | "Men" | "Babies";
  brand: "BaBra Cosmetics";
  size: "500ml";
  description: string;
  features: string[];
  ingredientsPlaceholder: string;
  directions: string;
  gallery: { src: string; alt: string }[];
  priceCents: number | null;
  discountCents: number | null;
  stock: number | null;
  sku: string;
  barcodePlaceholder: string;
  status: "editable";
  isFeatured: boolean;
  tags: string[];
};

const officialInfoPending = "Official information pending approval. BaBra admin can edit this field before public release.";

export const editableCosmeticsProducts: EditableCosmeticsProduct[] = [
  {
    slug: "women",
    name: "BaBra Lotion Women",
    shortName: "Women Lotion",
    category: "Women",
    brand: "BaBra Cosmetics",
    size: "500ml",
    description: "Official 500ml BaBra lotion product page prepared for editable public content.",
    features: ["500ml bottle", "Official BaBra Cosmetics product structure", "Editable product page", "WhatsApp ordering enabled"],
    ingredientsPlaceholder: officialInfoPending,
    directions: officialInfoPending,
    gallery: [
      { src: "/brand/official-babra-bottle.png", alt: "BaBra Lotion Women 500ml official bottle" },
      { src: "/products/women-lotion.jpg", alt: "BaBra Lotion Women gallery placeholder" }
    ],
    priceCents: null,
    discountCents: null,
    stock: null,
    sku: "BABRA-LOT-WOMEN-500ML",
    barcodePlaceholder: "Barcode pending official packaging approval",
    status: "editable",
    isFeatured: true,
    tags: ["lotion", "women", "500ml"]
  },
  {
    slug: "men",
    name: "BaBra Lotion Men",
    shortName: "Men Lotion",
    category: "Men",
    brand: "BaBra Cosmetics",
    size: "500ml",
    description: "Official 500ml BaBra lotion product page prepared for editable public content.",
    features: ["500ml bottle", "Official BaBra Cosmetics product structure", "Editable product page", "WhatsApp ordering enabled"],
    ingredientsPlaceholder: officialInfoPending,
    directions: officialInfoPending,
    gallery: [
      { src: "/brand/official-babra-bottle-men.png", alt: "BaBra Lotion Men 500ml official bottle" },
      { src: "/products/men-lotion.jpg", alt: "BaBra Lotion Men gallery placeholder" }
    ],
    priceCents: null,
    discountCents: null,
    stock: null,
    sku: "BABRA-LOT-MEN-500ML",
    barcodePlaceholder: "Barcode pending official packaging approval",
    status: "editable",
    isFeatured: true,
    tags: ["lotion", "men", "500ml"]
  },
  {
    slug: "babies",
    name: "BaBra Lotion Babies",
    shortName: "Babies Lotion",
    category: "Babies",
    brand: "BaBra Cosmetics",
    size: "500ml",
    description: "Official 500ml BaBra lotion product page prepared for editable public content.",
    features: ["500ml bottle", "Official BaBra Cosmetics product structure", "Editable product page", "WhatsApp ordering enabled"],
    ingredientsPlaceholder: officialInfoPending,
    directions: officialInfoPending,
    gallery: [
      { src: "/brand/official-babra-bottle-kids.png", alt: "BaBra Lotion Babies 500ml official bottle" },
      { src: "/products/kids-lotion.jpg", alt: "BaBra Lotion Babies gallery placeholder" }
    ],
    priceCents: null,
    discountCents: null,
    stock: null,
    sku: "BABRA-LOT-BABIES-500ML",
    barcodePlaceholder: "Barcode pending official packaging approval",
    status: "editable",
    isFeatured: true,
    tags: ["lotion", "babies", "500ml"]
  }
];

export const cosmeticsCategories = ["All", "Women", "Men", "Babies"] as const;
export const productSortOptions = ["Featured", "Name A-Z", "Category"] as const;

export function getEditableProduct(slug: string) {
  return editableCosmeticsProducts.find((product) => product.slug === slug);
}

export function relatedEditableProducts(slug: string) {
  return editableCosmeticsProducts.filter((product) => product.slug !== slug);
}

export function productPriceLabel(product: EditableCosmeticsProduct) {
  return product.priceCents === null ? "Price on request" : `${new Intl.NumberFormat("en-US").format(product.priceCents / 100)} RWF`;
}

export function productStockLabel(product: EditableCosmeticsProduct) {
  if (product.stock === null) return "Stock managed by admin";
  if (product.stock <= 0) return "Out of stock";
  return `${product.stock} in stock`;
}