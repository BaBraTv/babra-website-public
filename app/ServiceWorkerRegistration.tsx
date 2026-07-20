"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || process.env.NODE_ENV !== "production") {
      return;
    }

    let reloading = false;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch(() => {
        // PWA updates should never block the website.
      });

    function activateUpdatedWorker() {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    }

    navigator.serviceWorker.addEventListener("controllerchange", activateUpdatedWorker);
    return () => navigator.serviceWorker.removeEventListener("controllerchange", activateUpdatedWorker);
  }, []);

  return null;
}
