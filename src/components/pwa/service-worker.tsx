"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* registration failed silently — app still works online */
      });
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });

    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail?.waiting) detail.waiting.postMessage("SKIP_WAITING");
    };
    window.addEventListener("abidia:sw-update", onUpdate);
    return () => window.removeEventListener("abidia:sw-update", onUpdate);
  }, []);

  return null;
}
