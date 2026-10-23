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
  }
});

test("retinol status remains product-specific and concentration is not published", () => {
  const women = productKnowledgeList.find((product) => product.slug === "women")!;
  const men = productKnowledgeList.find((product) => product.slug === "men")!;
  const kids = productKnowledgeList.find((product) => product.slug === "babies")!;
  assert.equal(women.ingredientHighlights.some((ingredient) => ingredient.name === "Retinol"), true);
  assert.equal(men.ingredientHighlights.some((ingredient) => ingredient.name === "Retinol"), true);
  assert.equal(kids.ingredientHighlights.some((ingredient) => ingredient.name === "Retinol"), false);
  assert.match(kids.retinolStatus, /No retinol is listed/);
  assert.doesNotMatch(JSON.stringify(productKnowledgeList), /0\.25%|65\.5%|59\.25%/);
});

test("supplied label declarations remain variant-specific and approval-gated", () => {
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
  assert.match(kids.finalInciStatus, /Final controlled approval.*INCI-name normalization/i);
  assert.doesNotMatch(JSON.stringify(productKnowledgeList), /formula percentage|\b\d+(?:\.\d+)?%/i);
});

test("face-use copy neither approves universal use nor creates a blanket prohibition", () => {
  for (const product of productKnowledgeList) {
    assert.match(product.faceUse, /Not confirmed/);
    assert.match(product.faceUse, /not a blanket prohibition/);
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

test("public knowledge pages retain claim guardrails and visible evidence labels", async () => {
  const files = [
    "app/products/[slug]/page.tsx",
    "app/ingredients/page.tsx",
    "app/product-facts/page.tsx",
    "app/faq/page.tsx",
    "app/quality/page.tsx"
  ];
  const combined = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
  assert.match(combined, /final approved INCI/i);
  assert.match(combined, /not (?:FDA product approval|product approval)/i);
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
  assert.equal(questions.includes("Is BaBra Lotion designed for face and body?"), true);
  assert.equal(questions.includes("Where can customers buy authentic BaBra Lotion?"), true);
  assert.equal(questions.includes("How can distributors contact BaBra Cosmetics Ltd?"), true);
  const page = await readFile("app/product-facts/page.tsx", "utf8");
  assert.match(page, /BaBra Lotion — Official Product Information & Frequently Asked Questions/);
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
