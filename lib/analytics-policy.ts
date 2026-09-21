// Shared allowlists prevent URLs, form contents and arbitrary labels entering analytics.
export const analyticsPaths = ["/", "/cosmetics", "/products", "/products/women", "/products/men", "/products/babies", "/store", "/cart", "/checkout", "/founder", "/holding", "/foundation", "/schools", "/schools/masterplan", "/farm", "/hospital", "/lifetalk-tv", "/lifetalk-tv/nzabigeraho", "/babra-tv", "/rwanda-mobile-hub", "/lost-and-found", "/lost-documents", "/wholesale-distributor", "/sample-request", "/contact", "/contact-showroom", "/showroom", "/quality", "/forms", "/forms/cosmetics", "/forms/farm", "/forms/foundation", "/forms/lifetalk-tv", "/forms/rwanda-mobile-hub", "/forms/schools", "/child-family-support", "/investor-sponsor-access"] as const;
export const analyticsEvents = ["page_view", "product_view", "whatsapp_click", "rwanda_order_click", "partnership_click", "add_to_cart", "checkout_started", "order_requested", "wholesale_started", "wholesale_handoff", "sample_handoff", "contact_handoff", "foundation_interaction", "tv_outbound", "engagement"] as const;
export type AnalyticsEvent = typeof analyticsEvents[number];
export const sourceNames = ["Direct / unknown", "Google / search", "Other search", "Facebook", "Instagram", "TikTok", "YouTube", "WhatsApp", "Pinterest", "X", "Other referral"];
export function safePath(path: unknown): string | null {
  if (typeof path !== "string") return null;
  const clean = path.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
  return (analyticsPaths as readonly string[]).includes(clean) ? clean : null;
}
export function trafficSource(referrer: string, utmSource = ""): string {
  const known: Record<string, string> = { google: "Google / search", facebook: "Facebook", fb: "Facebook", instagram: "Instagram", ig: "Instagram", tiktok: "TikTok", youtube: "YouTube", whatsapp: "WhatsApp", wa: "WhatsApp", pinterest: "Pinterest", twitter: "X", x: "X" };
  if (known[utmSource.toLowerCase()]) return known[utmSource.toLowerCase()];
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === "babra.store" || host === "www.babra.store") return "Direct / unknown";
    const suffix = (domain: string) => host === domain || host.endsWith(`.${domain}`);
    for (const [domain, name] of Object.entries({ "google.com": "Google / search", "facebook.com": "Facebook", "instagram.com": "Instagram", "tiktok.com": "TikTok", "youtube.com": "YouTube", "youtu.be": "YouTube", "whatsapp.com": "WhatsApp", "wa.me": "WhatsApp", "pinterest.com": "Pinterest", "twitter.com": "X", "t.co": "X", "x.com": "X", "bing.com": "Other search", "duckduckgo.com": "Other search" })) if (suffix(domain)) return name;
    return "Other referral";
  } catch { return "Direct / unknown"; }
}
export function coarseDevice(ua: string) {
  return {
    device: /ipad|tablet|android(?!.*mobile)/i.test(ua) ? "Tablet" : /mobile|iphone|ipod/i.test(ua) ? "Mobile" : "Desktop",
    browser: /edg/i.test(ua) ? "Edge" : /firefox|fxios/i.test(ua) ? "Firefox" : /chrome|crios/i.test(ua) ? "Chrome" : /safari/i.test(ua) ? "Safari" : "Other",
    os: /android/i.test(ua) ? "Android" : /iphone|ipad|ipod/i.test(ua) ? "iOS" : /windows/i.test(ua) ? "Windows" : /macintosh|mac os/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : "Other"
  };
}
export function excludedAgent(ua: string) { return !ua || /bot|crawl|spider|headless|lighthouse|uptime|monitor|healthcheck|curl|wget|python|playwright/i.test(ua); }
export function kigaliDay(now = new Date()) { return new Date(now.getTime() + 7_200_000).toISOString().slice(0, 10); }
export function parseRange(from: string | null, to: string | null, now = new Date()) {
  const end = to || kigaliDay(now);
  const start = from || kigaliDay(new Date(now.getTime() - 6 * 86400000));
  for (const value of [start, end]) if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) throw new Error("Invalid date range");
  const length = (Date.parse(end) - Date.parse(start)) / 86400000 + 1;
  if (length < 1 || length > 31 || end > kigaliDay(now) || start < kigaliDay(new Date(now.getTime() - 89 * 86400000))) throw new Error("Choose up to 31 days within the last 90 days");
  return { from: start, to: end };
}
export type AnalyticsPayload = { id: string; visit: string; visitor: string; consent: true; path: string; event: AnalyticsEvent; source: string; campaign: string };
export function parseAnalyticsPayload(input: unknown, allowedCampaigns: string[] = []): AnalyticsPayload | null {
  if (!input || typeof input !== "object") return null;
  const p = input as Record<string, unknown>;
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const path = safePath(p.path);
  if (Object.keys(p).some(k => !["id", "visit", "visitor", "consent", "path", "event", "source", "campaign"].includes(k)) || p.consent !== true || !path || ![p.id, p.visit, p.visitor].every(v => typeof v === "string" && uuid.test(v)) || !(analyticsEvents as readonly unknown[]).includes(p.event)) return null;
  const event = p.event as AnalyticsEvent;
  if (event === "product_view" && !path.startsWith("/products/")) return null;
  if (event === "checkout_started" && path !== "/checkout") return null;
  if (event === "order_requested" && !["/checkout", "/cart"].includes(path)) return null;
  return { id: p.id as string, visit: p.visit as string, visitor: p.visitor as string, consent: true, path, event, source: sourceNames.includes(String(p.source)) ? String(p.source) : "Direct / unknown", campaign: typeof p.campaign === "string" && allowedCampaigns.includes(p.campaign) ? p.campaign : "None / unrecognized" };
}
