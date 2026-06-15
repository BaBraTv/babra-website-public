import type { MetadataRoute } from "next";

const baseUrl = "https://www.babra.store";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", "weekly", 1],
    ["/store", "weekly", 1],
    ["/sample-request", "weekly", 0.9],
    ["/wholesale-distributor", "weekly", 0.9],
    ["/job-application", "monthly", 0.7],
    ["/lost-documents", "weekly", 0.72],
    ["/contact-showroom", "weekly", 0.82],
    ["/products", "weekly", 0.95],
    ["/products/women", "weekly", 0.92],
    ["/products/men", "weekly", 0.92],
    ["/products/kids", "weekly", 0.92],
    ["/products/serum", "weekly", 0.92],
    ["/cart", "weekly", 0.8],
    ["/checkout", "weekly", 0.82],
    ["/profile", "monthly", 0.65],
    ["/orders", "weekly", 0.75],
    ["/showroom", "monthly", 0.85],
    ["/lifetalk-tv", "weekly", 0.85],
    ["/lifetalk-tv/nzabigeraho", "weekly", 0.8],
    ["/holding", "monthly", 0.8],
    ["/child-family-support", "monthly", 0.75],
    ["/quality", "monthly", 0.85],
    ["/contact", "monthly", 0.85],
    ["/forms", "monthly", 0.75],
    ["/marketplace", "weekly", 0.9],
    ["/wallet", "monthly", 0.7],
    ["/dashboard", "monthly", 0.6],
    ["/privacy", "yearly", 0.5],
    ["/terms", "yearly", 0.5],
    ["/returns", "yearly", 0.5],
    ["/delivery", "monthly", 0.7]
  ] as const;

  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }));
}
