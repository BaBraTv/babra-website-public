import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRICE_INQUIRY_LABEL, PRICE_INQUIRY_NOTE, getProduct, products, site, whatsappOrderUrl } from "../../commerce-data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | ${site.domain}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, width: 1200, height: 630, alt: product.alt }]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${site.url}${product.image}`,
    description: product.description,
    brand: { "@type": "Brand", name: "BaBra Cosmetics" },
    manufacturer: { "@type": "Organization", name: site.company },
    url: `${site.url}/products/${product.slug}`
  };

  const message = `Hello BaBra Store, I want to order ${product.name} from ${site.domain}. Please confirm price, delivery, and availability.`;

  return (
    <main className="min-h-screen bg-[#090706] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <figure className="rounded-lg border border-[#d6ad57]/25 bg-gradient-to-br from-white via-[#fff8eb] to-[#d6ad57] p-6 shadow-2xl shadow-black/35">
            <img className="h-[520px] w-full object-contain drop-shadow-2xl" src={product.image} alt={product.alt} />
          </figure>
          <div>
            <a className="text-sm font-black uppercase tracking-[0.18em] text-[#f1d58b]" href="/store">
              {site.domain} store
            </a>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.24em] text-[#d6ad57]">{product.category} product page</p>
            <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">{product.name}</h1>
            <div className="mt-5 rounded-2xl border border-[#f1d58b]/30 bg-white/[0.06] p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d6ad57]">Price inquiry</p>
              <p className="mt-2 text-3xl font-black text-[#f1d58b]">{PRICE_INQUIRY_LABEL}</p>
              <p className="mt-1 text-sm font-bold text-white/58">{product.size} - {PRICE_INQUIRY_NOTE}</p>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">{product.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-full bg-[#f1d58b] px-6 py-3 font-black text-[#130d08]" href="/store">
                Baza igiciro
              </a>
              <a className="rounded-full border border-white/20 px-6 py-3 font-black text-white" href={whatsappOrderUrl(message)} target="_blank" rel="noopener noreferrer">
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf1] px-5 py-16 text-[#18110c] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          <article className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            <h2 className="font-serif text-4xl">Customer fit</h2>
            <p className="mt-4 leading-7 text-black/62">{product.audience}</p>
          </article>
          <article className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            <h2 className="font-serif text-4xl">Usage</h2>
            <p className="mt-4 leading-7 text-black/62">{product.usage}</p>
          </article>
          <article className="rounded-lg border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
            <h2 className="font-serif text-4xl">Formula protection</h2>
            <p className="mt-4 leading-7 text-black/62">
              Public pages show benefits and safe usage guidance only. Full ingredients, QR, barcode, supplier records, and complete label files stay offline.
            </p>
          </article>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-4">
          {product.benefits.map((benefit) => (
            <div key={benefit} className="rounded-lg border border-black/10 bg-white px-5 py-4 font-black shadow-xl shadow-black/5">
              {benefit}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
