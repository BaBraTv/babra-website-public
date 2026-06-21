"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice?: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    function onAppInstalled() {
      setInstalled(true);
      setPromptEvent(null);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  async function install() {
    if (installed) {
      alert("BaBra Store app is already installed on this device.");
      return;
    }

    if (!promptEvent) {
      alert(
        "To install BaBra Store: on Chrome or Edge, use the install icon in the address bar or open the browser menu and choose Install app. On iPhone, open Safari, tap Share, then Add to Home Screen."
      );
      return;
    }

    await promptEvent.prompt();
    await promptEvent.userChoice?.catch(() => null);
    setPromptEvent(null);
  }

  return (
    <button
      className="rounded-full border border-[#4ebeff]/45 px-4 py-2 text-sm font-black text-[#9be2ff] transition hover:border-[#f1d58b]/70 hover:text-[#f1d58b]"
      onClick={install}
      type="button"
      aria-label={installed ? "BaBra Store app installed" : "Install BaBra Store app"}
    >
      {installed ? "App Installed" : promptEvent ? "Install App" : "Install Guide"}
    </button>
  );
}
