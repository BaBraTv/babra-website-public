import type { MetadataRoute } from "next";
import { site } from "./commerce-data";

const baseUrl = site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", "weekly", 1],
    ["/products", "weekly", 0.95],
    ["/store", "weekly", 0.95],
    ["/cosmetics", "weekly", 0.9],
    ["/schools", "monthly", 0.85],
    ["/rwanda-mobile-hub", "monthly", 0.85],
    ["/foundation", "monthly", 0.85],
    ["/contact", "monthly", 0.85],
    ["/showroom", "monthly", 0.85],
    ["/lifetalk-tv", "weekly", 0.85],
    ["/lifetalk-tv/nzabigeraho", "weekly", 0.8],
    ["/holding", "monthly", 0.8],
    ["/child-family-support", "monthly", 0.75],
    ["/quality", "monthly", 0.85],
    ["/marketplace", "weekly", 0.9],
    ["/wallet", "monthly", 0.7]
  ] as const;

  return routes.map(([path, changeFrequency, priority]) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  }));
}
