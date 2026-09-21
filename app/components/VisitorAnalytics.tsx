"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { analyticsEvents, safePath } from "../../lib/analytics-policy";
import type { AnalyticsEvent } from "../../lib/analytics-policy";
import { configureAnalytics, consentAllowed, consentKey, privacySignal, setAnalyticsConsent, trackAnalytics } from "../analytics-client";
import styles from "./visitor-analytics.module.css";

export function VisitorAnalytics({ enabled, campaigns }: { enabled: boolean; campaigns: string[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false), [allowed, setAllowed] = useState(false), [signal, setSignal] = useState(false);
  const lastView = useRef("");
  useEffect(() => {
    configureAnalytics(enabled, campaigns);
    if (!enabled) return;
    const refresh = () => { const permitted = consentAllowed(); setAllowed(permitted); setSignal(privacySignal()); if (!permitted) lastView.current = ""; };
    refresh();
    try { const c = JSON.parse(localStorage.getItem(consentKey) || "null"); setOpen(!privacySignal() && (!c || c.expires < Date.now())); } catch { setOpen(false); }
    window.addEventListener("babra-analytics-consent", refresh); window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("babra-analytics-consent", refresh); window.removeEventListener("storage", refresh); configureAnalytics(false, []); };
  }, [enabled, campaigns]);
  useEffect(() => {
    if (!enabled || !allowed || !safePath(path)) { lastView.current = ""; return; }
    if (lastView.current === path) return;
    lastView.current = path;
    trackAnalytics("page_view", path);
    if (path.startsWith("/products/")) trackAnalytics("product_view", path);
    if (path === "/checkout") trackAnalytics("checkout_started", path);
  }, [path, allowed, enabled]);
  useEffect(() => {
    if (!enabled || !allowed || !safePath(path)) return;
    let activity = Date.now(); let wholesaleStarted = false;
    const activityListener = () => { activity = Date.now(); };
    const click = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest("a,button") : null;
      if (!element) return;
      const tagged = element.getAttribute("data-analytics");
      if (tagged && (analyticsEvents as readonly string[]).includes(tagged)) trackAnalytics(tagged as AnalyticsEvent);
      if (element instanceof HTMLAnchorElement) {
        const url = new URL(element.href);
        if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(url.hostname)) trackAnalytics("whatsapp_click");
        if (["youtube.com", "www.youtube.com", "youtu.be", "facebook.com", "www.facebook.com"].includes(url.hostname) && ["/lifetalk-tv", "/babra-tv"].includes(path)) trackAnalytics("tv_outbound");
        if (url.origin === location.origin && url.pathname === "/wholesale-distributor") trackAnalytics("partnership_click");
        if (path === "/store" && ["wa.me", "api.whatsapp.com"].includes(url.hostname)) trackAnalytics("rwanda_order_click");
        if (path === "/foundation") trackAnalytics("foundation_interaction");
      }
    };
    const focus = (event: FocusEvent) => { if (!wholesaleStarted && path === "/wholesale-distributor" && event.target instanceof Element && event.target.closest("form")) { wholesaleStarted = true; trackAnalytics("wholesale_started"); } };
    const interval = window.setInterval(() => { if (document.visibilityState === "visible" && Date.now() - activity < 60000) trackAnalytics("engagement"); }, 15000);
    document.addEventListener("click", click); document.addEventListener("focusin", focus);
    document.addEventListener("pointerdown", activityListener); document.addEventListener("keydown", activityListener); document.addEventListener("scroll", activityListener, { passive: true });
    return () => { clearInterval(interval); document.removeEventListener("click", click); document.removeEventListener("focusin", focus); document.removeEventListener("pointerdown", activityListener); document.removeEventListener("keydown", activityListener); document.removeEventListener("scroll", activityListener); };
  }, [enabled, allowed, path]);
  if (!enabled || /^\/(admin|account|profile|orders|dashboard|affiliate|login|signup)(\/|$)/.test(path)) return null;
  function choose(value: boolean) { setAnalyticsConsent(value); setOpen(false); }
  return <aside className={styles.privacy} aria-label="Analytics privacy preferences">
    <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>Analytics privacy settings</button>
    {open && <div className={styles.panel}>
      <h2>Help improve BaBra?</h2>
      <p>With your permission, we measure pages and button clicks using a random browser identifier. We do not collect form contents, messages or precise location. You can withdraw at any time.</p>
      <p><a href="/privacy#analytics">How analytics works</a></p>
      {signal ? <p>Your browser privacy preference is respected. Analytics is off.</p> : <div className={styles.actions}><button type="button" onClick={() => choose(true)}>Allow analytics</button><button type="button" onClick={() => choose(false)}>{allowed ? "Withdraw consent" : "Decline analytics"}</button></div>}
      <button type="button" onClick={() => setOpen(false)}>Close</button>
    </div>}
  </aside>;
}
