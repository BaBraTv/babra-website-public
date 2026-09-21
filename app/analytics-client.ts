"use client";
import { safePath, trafficSource } from "../lib/analytics-policy";
import type { AnalyticsEvent } from "../lib/analytics-policy";

export const consentKey = "babra-analytics-consent-v1";
const identityKey = "babra-analytics-browser-v1", visitKey = "babra-analytics-visit-v1";
let active = false, campaigns: string[] = [];
export function privacySignal() { return navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true; }
export function consentAllowed() {
  try { const choice = JSON.parse(localStorage.getItem(consentKey) || "null"); return choice?.allowed === true && choice.expires > Date.now() && !privacySignal(); } catch { return false; }
}
export function configureAnalytics(enabled: boolean, allowed: string[]) { active = enabled; campaigns = allowed; }
export function setAnalyticsConsent(allowed: boolean) {
  try {
    localStorage.setItem(consentKey, JSON.stringify({ allowed, expires: Date.now() + 180 * 86400000 }));
    if (!allowed) { localStorage.removeItem(identityKey); sessionStorage.removeItem(visitKey); }
  } catch { /* No storage means no tracking. */ }
  window.dispatchEvent(new Event("babra-analytics-consent"));
}
export function trackAnalytics(event: AnalyticsEvent, path = location.pathname) {
  if (!active || !consentAllowed() || !safePath(path)) return;
  try {
    const now = Date.now();
    let identity = JSON.parse(localStorage.getItem(identityKey) || "null");
    if (!identity || identity.expires <= now) { identity = { id: crypto.randomUUID(), expires: now + 30 * 86400000 }; localStorage.setItem(identityKey, JSON.stringify(identity)); }
    let visit = JSON.parse(sessionStorage.getItem(visitKey) || "null");
    if (!visit || now - visit.last > 1800000) {
      const params = new URLSearchParams(location.search), campaign = params.get("utm_campaign") || "";
      visit = { id: crypto.randomUUID(), source: trafficSource(document.referrer, params.get("utm_source") || ""), campaign: campaigns.includes(campaign) ? campaign : "", last: now };
    }
    visit.last = now; sessionStorage.setItem(visitKey, JSON.stringify(visit));
    const body = JSON.stringify({ id: crypto.randomUUID(), visit: visit.id, visitor: identity.id, consent: true, path: safePath(path), event, source: visit.source, campaign: visit.campaign });
    void fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true, credentials: "same-origin" }).catch(() => {});
  } catch { /* Analytics must never interrupt shopping or forms. */ }
}
