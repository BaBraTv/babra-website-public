"use client";

import { useEffect, useState } from "react";

export function InstallAppButton() {
  const [promptEvent, setPromptEvent] = useState<any>(null);

  useEffect(() => {
    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event);
    }
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
  }, []);

  async function install() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    setPromptEvent(null);
  }

  return (
    <button
      className="rounded-full border border-[#4ebeff]/45 px-4 py-2 text-sm font-black text-[#9be2ff]"
      disabled={!promptEvent}
      onClick={install}
      type="button"
    >
      Install App
    </button>
  );
}
