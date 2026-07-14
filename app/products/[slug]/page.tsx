import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "../../commerce-data";
import { editableCosmeticsProducts, getEditableProduct, productPriceLabel } from "../../data/cosmetics-catalog";
import { ProductDetailClient } from "../ProductDetailClient";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return editableCosmeticsProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getEditableProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} ${product.size} | ${site.domain}`,
    description: product.description,
    openGraph: {
      title: `${product.name} ${product.size}`,
      description: product.description,
      images: [{ url: product.gallery[0].src, width: 1200, height: 630, alt: product.gallery[0].alt }]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getEditableProduct(slug);

  if (!product) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    image: product.gallery.map((image) => `${site.url}${image.src}`),
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    manufacturer: { "@type": "Organization", name: site.company },
    size: product.size,
    offers: {
      "@type": "Offer",
      price: product.priceCents === null ? undefined : product.priceCents / 100,
      priceCurrency: "RWF",
      availability: product.stock === null || product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${site.url}/products/${product.slug}`
    },
    url: `${site.url}/products/${product.slug}`
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductDetailClient product={product} />
    </>
  );
}