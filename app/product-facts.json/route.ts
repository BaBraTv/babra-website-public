import { buildPublicProductFaqs, productKnowledgeList } from "../../lib/product-knowledge";
import { cosmetics, rwandaOrders, site } from "../commerce-data";

export const dynamic = "force-static";

const faqs = buildPublicProductFaqs({
  manufacturer: cosmetics.manufacturer,
  rwandaPartner: rwandaOrders.partner,
  rwandaPhone: rwandaOrders.phone,
  domain: site.domain
});

export function GET() {
  return Response.json(
    {
      publisher: "BaBra Cosmetics Ltd",
      canonical: `${site.url}/product-facts`,
      generatedForPublicReference: "2026-11-18",
      policy: {
        formulaPercentagesPublished: false,
        offerPublished: false,
        ingredientReference: "Variant ingredient declarations come from manufacturer-supplied label records; the physical bottle is the controlling consumer reference.",
        interpretationRule: "Ingredient functions do not constitute clinical proof of a finished product."
      },
      frequentlyAskedQuestions: faqs,
      products: productKnowledgeList.map((product) => ({
        slug: product.slug,
        canonicalUrl: `${site.url}/products/${product.slug}`,
        name: product.publicName,
        variant: product.variant,
        category: product.category,
        size: product.size,
        productCode: product.productCode,
        manufacturer: product.manufacturer,
        countryOfManufacture: product.countryOfManufacture,
        intendedUse: product.intendedUse,
        currentUsageGuidance: product.usage,
        faceUse: product.faceUse,
        dailyUse: product.dailyUse,
        retinolStatus: product.retinolStatus,
        finalInciStatus: product.finalInciStatus,
        suppliedLabelIngredientDeclaration: {
          consumerReference: "Check the physical bottle supplied with the product.",
          ingredients: product.labelIngredientDeclaration
        },
        ingredientHighlights: product.ingredientHighlights.map((ingredient) => ({
          name: ingredient.name,
          familiarName: ingredient.displayName,
          cosmeticFunction: ingredient.function
        })),
        evidenceReferences: product.evidence.map((source) => ({
          type: source.type,
          reference: source.reference,
          reviewed: source.reviewed
        })),
        purchase: {
          rwanda: `${rwandaOrders.partner}, ${rwandaOrders.phone}`,
          international: "Contact BaBra Cosmetics through the official website",
          priceAndAvailability: "Confirmed when you contact the official order channel"
        }
      }))
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Language": "en-RW",
        "X-Robots-Tag": "index, follow"
      }
    }
  );
}
