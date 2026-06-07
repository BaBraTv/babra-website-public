import type { MetadataRoute } from "next";

const baseUrl = "https://babra.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", "weekly", 1],
    ["/products", "weekly", 0.95],
    ["/showroom", "monthly", 0.85],
    ["/lifetalk-tv", "weekly", 0.85],
    ["/lifetalk-tv/nzabigeraho", "weekly", 0.8],
    ["/holding", "monthly", 0.8],
    ["/marketplace", "weekly", 0.9],
    ["/wallet", "monthly", 0.7],
    ["/dashboard", "monthly", 0.6]
  ] as const;

  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }));
}
