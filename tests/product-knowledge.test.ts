import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parseAnalyticsPayload } from "../lib/analytics-policy.ts";
import { buildPublicProductFaqs, productJsonLd, productKnowledgeList } from "../lib/product-knowledge.ts";

test("knowledge base has one complete, distinct record per lotion variant", () => {
  assert.deepEqual(productKnowledgeList.map((product) => product.slug).sort(), ["babies", "men", "women"]);
  assert.equal(new Set(productKnowledgeList.map((product) => product.productCode)).size, 3);
  for (const product of productKnowledgeList) {
    assert.equal(product.size, "500 mL");
    assert.match(product.publicName, /^BaBra Lotion /);
    assert.equal(product.evidence.some((source) => source.type === "manufacturer-msds"), true);
    assert.equal(product.evidence.some((source) => source.type === "label-artwork"), true);
    assert.equal(product.evidence.some((source) => source.type === "batch-coa"), true);
    assert.equal(product.evidence.some((source) => source.type === "rwanda-fda-import-license"), true);
  }
});

test("retinol remains variant-specific in manufacturer records", () => {
  const women = productKnowledgeList.find((product) => product.slug === "women")!;
  const men = productKnowledgeList.find((product) => product.slug === "men")!;
  const kids = productKnowledgeList.find((product) => product.slug === "babies")!;
  assert.equal(women.ingredientHighlights.some((ingredient) => ingredient.name === "Retinol"), true);
  assert.equal(men.ingredientHighlights.some((ingredient) => ingredient.name === "Retinol"), true);
  assert.equal(kids.ingredientHighlights.some((ingredient) => ingredient.name === "Retinol"), false);
  assert.match(women.retinolStatus, /manufacturer MSDS and label artwork/);
  assert.match(men.retinolStatus, /manufacturer MSDS and label artwork/);
  assert.match(kids.retinolStatus, /No retinol is listed/);
  assert.doesNotMatch(JSON.stringify(productKnowledgeList), /under review|requires-product-specific-review/i);
  assert.doesNotMatch(JSON.stringify(productKnowledgeList), /0\.25%|65\.5%|59\.25%/);
});

test("supplied label declarations remain variant-specific and label-controlled", () => {
  const women = productKnowledgeList.find((product) => product.slug === "women")!;
  const men = productKnowledgeList.find((product) => product.slug === "men")!;
  const kids = productKnowledgeList.find((product) => product.slug === "babies")!;

  assert.deepEqual(women.labelIngredientDeclaration, men.labelIngredientDeclaration);
  assert.equal(women.labelIngredientDeclaration.includes("Retinol"), true);
  assert.equal(men.labelIngredientDeclaration.includes("Retinol"), true);
  assert.equal(kids.labelIngredientDeclaration.includes("Retinol"), false);
  assert.equal(kids.labelIngredientDeclaration.includes("Niacinamide"), true);
  assert.equal(kids.labelIngredientDeclaration.includes("Squalane"), true);
  assert.equal(kids.labelIngredientDeclaration.includes("Sodium PCA"), true);
  assert.match(kids.finalInciStatus, /physical released label remains the controlling consumer reference/i);
  assert.doesNotMatch(JSON.stringify(productKnowledgeList), /formula percentage|\b\d+(?:\.\d+)?%/i);
});

test("face-use copy stays label-led without approving universal use", () => {
  for (const product of productKnowledgeList) {
    assert.match(product.faceUse, /product label/);
    assert.doesNotMatch(product.faceUse, /safe for all|approved for (the )?face/i);
  }
});

test("Product structured data contains verified identity and omits an unverified Offer", () => {
  for (const product of productKnowledgeList) {
    const schema = productJsonLd(product);
    assert.equal(schema["@type"], "Product");
    assert.equal(schema.name, product.publicName);
    assert.equal(schema.size, "500 mL");
    assert.equal(schema.brand.name, "BaBra Cosmetics");
    assert.equal("offers" in schema, false);
    assert.equal(JSON.stringify(schema).includes("Price on request"), false);
  }
});

test("public knowledge pages present Rwanda FDA licence records with their documented term", async () => {
  const files = [
    "app/products/[slug]/page.tsx",
    "app/ingredients/page.tsx",
    "app/faq/page.tsx",
    "app/where-to-buy/page.tsx",
    "lib/product-knowledge.ts",
    "public/llms.txt"
  ];
  const [qualityPage, ...otherPages] = await Promise.all(
    ["app/quality/page.tsx", ...files].map((file) => readFile(file, "utf8"))
  );
  const combined = [qualityPage, ...otherPages].join("\n");
  assert.match(qualityPage, /Rwanda FDA premises licence/i);
  assert.match(qualityPage, /Rwanda FDA import licence record/i);
  assert.match(qualityPage, /Issued 13 May 2026 · Printed valid through 12 November 2026/i);
  assert.match(qualityPage, /href="\/contact"/);
  assert.doesNotMatch(combined, /0469 authorizes|Is BaBra Lotion FDA approved\?/i);
  assert.doesNotMatch(combined, /official information pending|final approval pending|public wording standard|compliance note/i);
  assert.doesNotMatch(combined, /dermatologist[- ]approved|clinically proven|safe for everyone|has FDA approval|approved by the (?:US )?FDA|FDA-approved/i);
});

test("official product information page includes the required public questions", async () => {
  const faqs = buildPublicProductFaqs({
    manufacturer: "Guangzhou Pallas Cosmetics Co., Ltd.",
    rwandaPartner: "VIDAPHARMA",
    rwandaPhone: "0734 299 777",
    domain: "babra.store"
  });
  const questions = faqs.map((faq) => faq.question);
  assert.equal(questions.includes("What is BaBra Lotion?"), true);
  assert.equal(questions.includes("Who manufactures BaBra Lotion?"), true);
  const ingredientFaq = faqs.find(({ question }) => question === "What are the recognized cosmetic functions of the highlighted ingredients?");
  assert.match(ingredientFaq?.answer ?? "", /support skin conditioning\.$/);
  assert.match(faqs.find(({ question }) => question === "Is BaBra Lotion designed for face and body?")?.answer ?? "", /wherever and whenever it needs moisture/);
  assert.match(faqs.find(({ question }) => question === "Where can I verify BaBra Lotion’s Rwanda FDA documents?")?.answer ?? "", /product name and batch number/);
  assert.equal(questions.includes("Where can customers buy authentic BaBra Lotion?"), true);
  assert.equal(questions.includes("How can distributors contact BaBra Cosmetics Ltd?"), true);
  const faqPage = await readFile("app/faq/page.tsx", "utf8");
  assert.match(faqPage, /FAQPage/);

  const partnerPage = await readFile("app/where-to-buy/page.tsx", "utf8");
  assert.match(partnerPage, /VIDAPHARMA LTD/);
  assert.match(partnerPage, /Official VIDAPHARMA LTD logo/);
  assert.match(partnerPage, /Kiyovu, Nyarugenge, Kigali City, Rwanda|rwandaOrders\.location/);
});

test("new public analytics events accept only allowlisted route combinations", () => {
  const base = {
    id: "00000000-0000-4000-8000-000000000001",
    visit: "00000000-0000-4000-8000-000000000002",
    visitor: "00000000-0000-4000-8000-000000000003",
    consent: true,
    source: "Direct / unknown",
    campaign: ""
  };
  assert.equal(parseAnalyticsPayload({ ...base, path: "/faq", event: "faq_open" })?.event, "faq_open");
  assert.equal(parseAnalyticsPayload({ ...base, path: "/product-facts", event: "faq_open" })?.event, "faq_open");
  assert.equal(parseAnalyticsPayload({ ...base, path: "/products/women", event: "order_channel_click" })?.event, "order_channel_click");
  assert.equal(parseAnalyticsPayload({ ...base, path: "/quality", event: "faq_open" }), null);
  assert.equal(parseAnalyticsPayload({ ...base, path: "/products", event: "order_channel_click" }), null);
});
