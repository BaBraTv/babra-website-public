const localBase = (process.argv[2] || process.env.SITE_AUDIT_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const canonicalBase = "https://www.babra.store";
const coreRoutes = [
  "/",
  "/products",
  "/products/women",
  "/products/men",
  "/products/babies",
  "/cosmetics",
  "/ingredients",
  "/product-facts",
  "/faq",
  "/quality"
];

const failures = [];
const checkedLinks = new Map();
const pageHtml = new Map();
const structuredData = new Map();

function check(condition, message) {
  if (!condition) failures.push(message);
}

function attribute(html, selectorPattern, attributeName) {
  const tag = html.match(selectorPattern)?.[0] || "";
  return tag.match(new RegExp(`${attributeName}=["']([^"']*)["']`, "i"))?.[1] || "";
}

function canonicalFor(path) {
  return path === "/" ? canonicalBase : `${canonicalBase}${path}`;
}

function flattenJsonLd(value) {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLd);
  if (!value || typeof value !== "object") return [];
  const graph = Array.isArray(value["@graph"]) ? value["@graph"].flatMap(flattenJsonLd) : [];
  return [value, ...graph];
}

async function fetchPage(path) {
  const response = await fetch(`${localBase}${path}`, { redirect: "manual" });
  const body = await response.text();
  return { response, body };
}

for (const path of coreRoutes) {
  try {
    const { response, body } = await fetchPage(path);
    check(response.status === 200, `${path}: expected 200, received ${response.status}`);
    if (response.status !== 200) continue;
    pageHtml.set(path, body);

    const title = body.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || "";
    const description = attribute(body, /<meta\b[^>]*name=["']description["'][^>]*>/i, "content");
    const canonical = attribute(body, /<link\b[^>]*rel=["']canonical["'][^>]*>/i, "href");
    const viewport = attribute(body, /<meta\b[^>]*name=["']viewport["'][^>]*>/i, "content");
    const h1Count = (body.match(/<h1\b/gi) || []).length;
    const mainCount = (body.match(/<main\b/gi) || []).length;
    const images = body.match(/<img\b[^>]*>/gi) || [];

    check(Boolean(title), `${path}: missing title`);
    check(description.length >= 50 && description.length <= 180, `${path}: meta description length is ${description.length}`);
    check(canonical === canonicalFor(path), `${path}: canonical is ${canonical || "missing"}`);
    check(Boolean(viewport), `${path}: missing viewport metadata`);
    check(h1Count === 1, `${path}: expected one h1, found ${h1Count}`);
    check(mainCount === 1, `${path}: expected one main landmark, found ${mainCount}`);
    check(images.every((image) => /\balt=["'][^"']*["']/i.test(image)), `${path}: image without alt attribute`);
    check(/<a\b[^>]*href=["']#main-content["']/i.test(body), `${path}: missing skip link`);
    check(/id=["']main-content["']/i.test(body), `${path}: missing skip-link target`);
    check(Boolean(attribute(body, /<meta\b[^>]*property=["']og:title["'][^>]*>/i, "content")), `${path}: missing Open Graph title`);
    check(Boolean(attribute(body, /<meta\b[^>]*property=["']og:description["'][^>]*>/i, "content")), `${path}: missing Open Graph description`);

    const jsonLd = [...body.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    check(jsonLd.length > 0, `${path}: no JSON-LD found`);
    const nodes = [];
    for (const [index, match] of jsonLd.entries()) {
      try {
        nodes.push(...flattenJsonLd(JSON.parse(match[1])));
      } catch (error) {
        failures.push(`${path}: JSON-LD block ${index + 1} is invalid (${error.message})`);
      }
    }
    structuredData.set(path, nodes);
  } catch (error) {
    failures.push(`${path}: request failed (${error.message})`);
  }
}

const homepageSchema = structuredData.get("/") || [];
check(homepageSchema.some((node) => node["@type"] === "Organization"), "/: missing Organization structured data");
check(homepageSchema.some((node) => node["@type"] === "Brand"), "/: missing Brand structured data");

for (const path of ["/products/women", "/products/men", "/products/babies"]) {
  const product = (structuredData.get(path) || []).find((node) => node["@type"] === "Product");
  check(Boolean(product), `${path}: missing Product structured data`);
  if (!product) continue;
  check(Boolean(product.name), `${path}: Product schema is missing name`);
  check(Boolean(product.image), `${path}: Product schema is missing image`);
  check(Boolean(product.sku), `${path}: Product schema is missing sku`);
  check(
    product.brand?.["@type"] === "Brand" && product.brand?.name === "BaBra Cosmetics",
    `${path}: Product schema has invalid brand`
  );
  check(product.manufacturer?.["@type"] === "Organization", `${path}: Product schema has invalid manufacturer`);
  check(!Object.hasOwn(product, "offers"), `${path}: unverified Offer schema must not be published`);
}

const factsPage = pageHtml.get("/product-facts") || "";
check(
  factsPage.includes("BaBra Lotion — Official Product Information &amp; Frequently Asked Questions"),
  "/product-facts: exact official information title is missing"
);
const faqSchema = (structuredData.get("/product-facts") || []).find((node) => node["@type"] === "FAQPage");
check(Boolean(faqSchema), "/product-facts: missing FAQPage structured data");
check(Array.isArray(faqSchema?.mainEntity) && faqSchema.mainEntity.length >= 10, "/product-facts: FAQPage schema is incomplete");

const linkPaths = new Set();
for (const html of pageHtml.values()) {
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(?:mailto:|tel:|javascript:|#)/i.test(href)) continue;
    try {
      const url = new URL(href, canonicalBase);
      if (url.origin !== canonicalBase || url.pathname.startsWith("/_next") || url.pathname.startsWith("/api/")) continue;
      linkPaths.add(url.pathname || "/");
    } catch {
      failures.push(`Invalid internal href: ${href}`);
    }
  }
}

for (const path of linkPaths) {
  try {
    const response = await fetch(`${localBase}${path}`, { redirect: "manual" });
    checkedLinks.set(path, response.status);
    check(response.status >= 200 && response.status < 400, `Broken internal link ${path}: ${response.status}`);
  } catch (error) {
    failures.push(`Broken internal link ${path}: ${error.message}`);
  }
}

try {
  const response = await fetch(`${localBase}/product-facts.json`);
  const facts = await response.json();
  check(response.status === 200, `/product-facts.json: expected 200, received ${response.status}`);
  check(Array.isArray(facts.products) && facts.products.length === 3, "/product-facts.json: expected three products");
  check(facts.products.every((product) => product.size === "500 mL"), "/product-facts.json: invalid size data");
  check(
    Array.isArray(facts.frequentlyAskedQuestions) && facts.frequentlyAskedQuestions.length >= 10,
    "/product-facts.json: official FAQ data is incomplete"
  );
  check(!JSON.stringify(facts).includes("0.25%"), "/product-facts.json: confidential concentration leaked");
} catch (error) {
  failures.push(`/product-facts.json: invalid JSON (${error.message})`);
}

const homepage = pageHtml.get("/") || "";
const stylesheetPaths = [...homepage.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]);
let responsiveStylesheetFound = false;
for (const href of stylesheetPaths) {
  try {
    const css = await (await fetch(new URL(href, localBase))).text();
    if (/@media\s*\(/.test(css)) responsiveStylesheetFound = true;
  } catch {}
}
check(responsiveStylesheetFound, "No responsive media query found in rendered stylesheets");

if (failures.length) {
  console.error(`Public-site audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Public-site audit passed: ${coreRoutes.length} core pages, ${checkedLinks.size} internal links, semantic JSON-LD, metadata and responsive stylesheets.`);
}
