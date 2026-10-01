"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { AnalyticsEvent } from "../../lib/analytics-policy";
import { consentAllowed } from "../analytics-client";

type GoogleTag = (...args: unknown[]) => void;
type GoogleAnalyticsWindow = Window & {
  gtag?: GoogleTag;
  babraTrackGoogleAnalytics?: (event: AnalyticsEvent, path?: string) => void;
};

let lastPageLocation = "";
let lastEvent = { key: "", time: 0 };

function googleTag() {
  return (window as GoogleAnalyticsWindow).gtag;
}

function cleanPath(path: string) {
  return path.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
}

function sendEvent(name: string, path: string, parameters: Record<string, string> = {}) {
  if (!consentAllowed()) return;
  const pagePath = cleanPath(path);
  const key = `${name}:${pagePath}`;
  const now = Date.now();
  if (lastEvent.key === key && now - lastEvent.time < 500) return;
  lastEvent = { key, time: now };
  googleTag()?.("event", name, { page_path: pagePath, ...parameters });
}

function trackPageView(path: string) {
  if (!consentAllowed()) return;
  const pagePath = cleanPath(path);
  const pageLocation = `${window.location.origin}${pagePath}`;
  if (lastPageLocation === pageLocation) return;
  lastPageLocation = pageLocation;
  googleTag()?.("event", "page_view", {
    page_title: document.title,
    page_location: pageLocation,
    page_path: pagePath
  });
}

function trackBaBraEvent(event: AnalyticsEvent, path = window.location.pathname) {
  if (event === "page_view") return trackPageView(path);
  const names: Partial<Record<AnalyticsEvent, string>> = {
    product_view: "view_item",
    whatsapp_click: "whatsapp_click",
    rwanda_order_click: "order_action",
    add_to_cart: "add_to_cart",
    checkout_started: "begin_checkout",
    order_requested: "order_action",
    wholesale_handoff: "generate_lead",
    sample_handoff: "generate_lead",
    contact_handoff: "contact_submit"
  };
  const name = names[event];
  if (name) sendEvent(name, path, { action_source: event });
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const analyticsWindow = window as GoogleAnalyticsWindow;
    const syncConsent = () => {
      const allowed = consentAllowed();
      googleTag()?.("consent", "update", {
        analytics_storage: allowed ? "granted" : "denied"
      });
      if (allowed) trackPageView(window.location.pathname);
      else lastPageLocation = "";
    };
    analyticsWindow.babraTrackGoogleAnalytics = trackBaBraEvent;
    window.addEventListener("babra-analytics-consent", syncConsent);
    syncConsent();
    return () => {
      if (analyticsWindow.babraTrackGoogleAnalytics === trackBaBraEvent) delete analyticsWindow.babraTrackGoogleAnalytics;
      window.removeEventListener("babra-analytics-consent", syncConsent);
    };
  }, []);

  useEffect(() => {
    trackPageView(pathname);
    if (pathname === "/checkout") sendEvent("begin_checkout", pathname, { action_source: "checkout_page" });
  }, [pathname]);

  useEffect(() => {
    const trackWhatsAppClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      try {
        const url = new URL(link.href);
        if (!["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) return;
        sendEvent("whatsapp_click", window.location.pathname, {
          link_domain: url.hostname,
          link_text: (link.textContent || "WhatsApp").trim().slice(0, 80)
        });
      } catch {}
    };
    document.addEventListener("click", trackWhatsAppClick);
    return () => document.removeEventListener("click", trackWhatsAppClick);
  }, []);

  return null;
}
