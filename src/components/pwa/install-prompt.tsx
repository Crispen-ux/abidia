"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Download, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STORAGE_KEY = "abidia-install-dismissed";

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  ("standalone" in navigator &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true);

const subscribeStandalone = (onChange: () => void) => {
  const media = window.matchMedia("(display-mode: standalone)");
  media.addEventListener("change", onChange);
  window.addEventListener("appinstalled", onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("appinstalled", onChange);
  };
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const standalone = useSyncExternalStore(
    subscribeStandalone,
    isStandalone,
    () => false
  );

  useEffect(() => {
    const dismissedAt = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    const recentlyDismissed = Date.now() - dismissedAt < 1000 * 60 * 60 * 24 * 14;

    const handler = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
      if (!isStandalone() && !recentlyDismissed) setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  if (standalone || !visible || !deferred) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") setVisible(false);
    else dismiss();
  };

  return (
    <div className="fixed inset-x-3 bottom-20 z-40 sm:inset-x-auto sm:right-5 sm:bottom-24 sm:max-w-sm">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-black/10">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground">
            <Smartphone className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Install the Abidia app</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
              Offline access to services, projects and our cost tools — straight from your home
              screen.
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss install prompt"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90"
            onClick={install}
          >
            <Download /> Install
          </Button>
          <Button size="sm" variant="outline" onClick={dismiss}>
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
}
