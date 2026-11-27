import type { Metadata } from "next";
import { site } from "../commerce-data";
import { productKnowledge } from "../../lib/product-knowledge";

type LotionComparison = {
  brand: string;
  name: string;
  ingredients: string;
  fragrance: string;
  size: string;
  intendedUse: string;
  sources: { name: string; href: string }[];
};

const canonical = site.url + "/compare-body-lotions";
const title = "Compare Body Lotions | BaBra and 10 Other Brands";
const description = "Compare BaBra Lotion Signature for Her with ten body lotions, including CeraVe and Aveeno, by ingredients, fragrance, pack size and intended use.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "website" }
};

const lotions: LotionComparison[] = [
  {
    brand: "BaBra",
    name: productKnowledge.women.variant,
    ingredients: "Glycerin, shea butter, jojoba seed oil, panthenol and hyaluronic acid",
    fragrance: "Fragrance listed",
    size: productKnowledge.women.size,
    intendedUse: "Daily moisturizing body care for adults",
    sources: [{ name: "Product label", href: "/products/women#label-ingredients" }]
  },
  {
    brand: "Aveeno",
    name: "Daily Moisturizing Body Lotion",
    ingredients: "Prebiotic oat",
    fragrance: "Fragrance-free",
    size: "18 fl oz",
    intendedUse: "Daily body lotion for normal to dry, sensitive skin",
    sources: [{ name: "Product details", href: "https://www.aveeno.com/products/daily-moisturizing-lotion-with-soothing-oat" }]
  },
  {
    brand: "CeraVe",
    name: "Daily Moisturizing Lotion",
    ingredients: "Three ceramides and hyaluronic acid",
    fragrance: "Fragrance-free",
    size: "12 fl oz",
    intendedUse: "Face and body moisturizer for normal to dry skin",
    sources: [
      { name: "Product details", href: "https://www.cerave.com/skincare/moisturizers/daily-moisturizing-lotion" },
      { name: "Pack details", href: "https://www.target.com/p/-/A-13977969" }
    ]
  },
  {
    brand: "Cetaphil",
    name: "Moisturizing Lotion",
    ingredients: "Glycerin, panthenol and niacinamide",
    fragrance: "Fragrance-free",
    size: "16 fl oz",
    intendedUse: "Face and body lotion for dry to normal, sensitive skin",
    sources: [
      { name: "Product details", href: "https://www.cetaphil.com/us/products/product-categories/body-moisturizers/moisturizing-lotion/302990241334.html" },
      { name: "Pack details", href: "https://www.target.com/p/-/A-83019448" }
    ]
  },
  {
    brand: "Eucerin",
    name: "Advanced Repair Lotion",
    ingredients: "Urea, ceramide and natural moisturizing factors",
    fragrance: "Fragrance-free",
    size: "16.9 fl oz",
    intendedUse: "Body lotion for very dry skin",
    sources: [{ name: "Product details", href: "https://www.eucerinus.com/products/advanced-repair/eucerin-smoothing-repair-dry-skin-lotion" }]
  },
  {
    brand: "La Roche-Posay",
    name: "Lipikar Body Lotion",
    ingredients: "Shea butter, glycerin and niacinamide",
    fragrance: "Fragrance-free",
    size: "400 mL",
    intendedUse: "Daily body lotion for normal to dry skin",
    sources: [
      { name: "Product details", href: "https://www.laroche-posay.us/our-products/body/body-lotion/lipikar-body-lotion-for-normal-to-dry-skin-3337875549615.html" },
      { name: "Pack details", href: "https://www.laroche-posay.ca/en_CA/lipikar-body-lotion/3337875549615.html" }
    ]
  },
  {
    brand: "Lubriderm",
    name: "Daily Moisture Lotion Fragrance-Free",
    ingredients: "Pro-Ceramide, shea butter and glycerin",
    fragrance: "Fragrance-free",
    size: "24 fl oz",
    intendedUse: "Daily moisturizer for dry skin",
    sources: [
      { name: "Product details", href: "https://www.lubriderm.com/products/daily-moisture-lotion-fragrance-free" },
      { name: "Pack details", href: "https://www.lubriderm.com/products/daily-moisture-lotion-fragrance-free-24-fl-oz-2-count-6-fl-oz-travel-size" }
    ]
  },
  {
    brand: "Neutrogena",
    name: "Hydro Boost Body Gel Cream Fragrance-Free",
    ingredients: "Hyaluronic acid",
    fragrance: "Fragrance-free",
    size: "16 oz",
    intendedUse: "Body gel cream for dry, sensitive skin",
    sources: [{ name: "Product details", href: "https://www.neutrogena.com/products/skincare/neutrogena-hydro-boost-body-gel-cream-with-hyaluronic-acid/6811344" }]
  },
  {
    brand: "NIVEA",
    name: "Essentially Enriched Body Lotion",
    ingredients: "Sweet almond oil and sodium hyaluronate",
    fragrance: "Fragrance listed",
    size: "16.9 fl oz",
    intendedUse: "Body lotion for dry to very dry skin",
    sources: [
      { name: "Product details", href: "https://www.niveausa.com/products/nivea-essentially-enriched-body-lotion-0721400115050079.html" },
      { name: "Ingredient label", href: "https://www.vitacost.com/products/nivea-body-lotion-essentially-enriched-dry-to-very-dry-skin-16-9-fl-oz-500-ml-89902" }
    ]
  },
  {
    brand: "Palmer’s",
    name: "Cocoa Butter Formula Daily Skin Therapy Lotion",
    ingredients: "Cocoa butter and vitamin E",
    fragrance: "Fragrance listed",
    size: "13.5 fl oz",
    intendedUse: "Body lotion for rough, dry skin",
    sources: [
      { name: "Product details", href: "https://palmers.com/products/cocoa-butter-formula-lotion" },
      { name: "Ingredient label", href: "https://www.heb.com/product-detail/palmer-s-cocoa-butter-daily-skin-therapy-lotion/1009980" }
    ]
  },
  {
    brand: "Vaseline",
    name: "Advanced Repair Unscented Lotion",
    ingredients: "Glycerin, petrolatum and panthenol",
    fragrance: "Unscented as labelled",
    size: "20.3 oz",
    intendedUse: "Daily body lotion for very dry skin",
    sources: [{ name: "Product details", href: "https://www.vaseline.com/us/en/p/vaseline-advanced-repair-unscented-lotion.html/00305213087009" }]
  }
];

export default function CompareBodyLotionsPage() {
  return (
    <main className="min-h-screen bg-[#fbf5ec] text-[#35241a]">
      <header className="border-b border-[#96704e]/30 bg-[#48252b] px-5 py-12 text-[#fff5e8] md:px-9 md:py-20">
        <div className="mx-auto max-w-[1290px]">
          <a href="/" className="text-sm font-semibold text-[#f1d4a0] underline underline-offset-4">BaBra Lotion</a>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight tracking-[-0.045em] md:text-7xl">Compare Body Lotions</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#faeadf]">Choosing a lotion is personal. Find out how BaBra Lotion Signature for Her compares with ten other lotions on ingredients, fragrance, pack size and intended use.</p>
        </div>
      </header>

      <section className="px-5 py-10 md:px-9 md:py-14" aria-labelledby="lotion-comparison">
        <div className="mx-auto max-w-[1290px]">
          <h2 id="lotion-comparison" className="font-serif text-3xl md:text-4xl">Eleven lotions side by side</h2>
          <p id="comparison-scope" className="mt-3 max-w-3xl text-sm leading-6 text-[#654d3d]">Pack sizes are examples from the linked product pages. Check your local packaging for the ingredient list and size of the bottle you choose.</p>
          <p className="mt-3 text-xs text-[#654d3d] md:hidden">Swipe across the table to see every column.</p>
          <div className="mt-5 overflow-x-auto rounded-xl border border-[#bca284] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#865830]" role="region" aria-label="Body lotion comparison table" tabIndex={0}>
            <table className="w-full min-w-[830px] border-collapse text-left text-sm leading-6" aria-describedby="comparison-scope">
              <caption className="sr-only">Product information reported by the linked brands and retailers</caption>
              <thead className="bg-[#302017] text-[#fff3e6]">
                <tr>
                  {["Lotion", "Selected ingredients", "Fragrance", "Example size", "Intended use"].map((column) => (
                    <th key={column} scope="col" className="px-4 py-4 font-semibold md:px-5">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cbb69d]">
                {lotions.map((lotion) => (
                  <tr key={lotion.brand} className={lotion.brand === "BaBra" ? "bg-[#f3e3cb]" : "bg-[#fffaf4] even:bg-[#f8efe3]"}>
                    <th scope="row" className="px-4 py-4 align-top md:px-5">
                      <span className="block font-serif text-xl font-semibold">{lotion.brand}</span>
                      <span className="mt-1 block font-medium">{lotion.name}</span>
                      <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {lotion.sources.map((source) => (
                          <a key={source.href} href={source.href} className="text-xs font-semibold text-[#744820] underline underline-offset-4" aria-label={lotion.brand + " " + source.name}>{source.name}</a>
                        ))}
                      </span>
                    </th>
                    <td className="px-4 py-4 align-top md:px-5">{lotion.ingredients}</td>
                    <td className="px-4 py-4 align-top md:px-5">{lotion.fragrance}</td>
                    <td className="whitespace-nowrap px-4 py-4 align-top md:px-5">{lotion.size}</td>
                    <td className="px-4 py-4 align-top md:px-5">{lotion.intendedUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/products" className="rounded-full bg-[#38241a] px-6 py-3.5 text-sm font-semibold text-[#fff7e9] transition hover:bg-[#583a27]">Explore the BaBra collection</a>
            <a href="/ingredients" className="rounded-full border border-[#96704e] px-6 py-3.5 text-sm font-semibold text-[#4d3322] transition hover:bg-[#f0e1ce]">Ingredients &amp; Science</a>
            <a href="/where-to-buy" className="rounded-full border border-[#96704e] px-6 py-3.5 text-sm font-semibold text-[#4d3322] transition hover:bg-[#f0e1ce]">Where to Buy</a>
          </div>
        </div>
      </section>
    </main>
  );
}
