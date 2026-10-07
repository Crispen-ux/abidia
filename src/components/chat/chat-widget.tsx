"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import {
  answerLocally,
  CHAT_SUGGESTIONS,
  suggestionHref,
  type ChatMessage,
} from "@/lib/chat-engine";
import { site } from "@/config/site";
import { cn } from "cn";

type Bubble = {
  id: number;
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
};

let counter = 0;
const nextId = () => ++counter;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([
    {
      id: nextId(),
      role: "assistant",
      content:
        "Hi — I'm the Abidia assistant. Ask me about our services, fees or where we work, and I'll point you to the right page or person.",
      suggestions: CHAT_SUGGESTIONS,
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [bubbles, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || busy) return;

    setInput("");
    setBubbles((prev) => [...prev, { id: nextId(), role: "user", content: message }]);
    setBusy(true);

    const history: ChatMessage[] = [
      ...bubbles
        .filter((bubble) => bubble.id !== 1)
        .slice(-8)
        .map((bubble) => ({ role: bubble.role, content: bubble.content })),
      { role: "user" as const, content: message },
    ];

    let reply = "";
    let suggestions: string[] | undefined;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);
      const data = (await response.json()) as { reply?: string; suggestions?: string[] };
      if (typeof data.reply !== "string") throw new Error("bad payload");
      reply = data.reply;
      suggestions = data.suggestions;
    } catch {
      const fallback = answerLocally(message);
      reply = fallback.content;
      suggestions = fallback.suggestions;
    }

    setBubbles((prev) => [...prev, { id: nextId(), role: "assistant", content: reply, suggestions }]);
    setBusy(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-20 left-4 z-40 inline-flex size-14 items-center justify-center rounded-full shadow-xl shadow-black/20 transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none lg:bottom-6 lg:left-6",
          open ? "bg-[#141418] text-white" : "bg-brand text-brand-foreground"
        )}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {open && (
        <div className="fixed bottom-36 left-4 z-50 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/25 sm:left-6 lg:bottom-24">
          <div className="flex items-center gap-3 bg-[#141418] px-4 py-3.5 text-white">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
              A
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Abidia assistant</p>
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Online — replies in minutes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex max-h-[55vh] min-h-[260px] flex-col gap-3 overflow-y-auto p-4 sm:max-h-[420px]"
            aria-live="polite"
          >
            {bubbles.map((bubble) => (
              <div key={bubble.id}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    bubble.role === "user"
                      ? "ml-auto rounded-br-md bg-brand text-brand-foreground"
                      : "rounded-bl-md bg-muted text-foreground"
                  )}
                >
                  {bubble.content}
                </div>
                {bubble.suggestions && bubble.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {bubble.suggestions.map((suggestion) => {
                      const href = suggestionHref(suggestion);
                      const className =
                        "rounded-full border border-brand/40 bg-brand-subtle px-3 py-1.5 text-xs font-medium text-brand-subtle-foreground transition-colors hover:bg-brand hover:text-brand-foreground";

                      if (href) {
                        return (
                          <Link key={suggestion} href={href} className={className}>
                            {suggestion}
                          </Link>
                        );
                      }

                      return (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => send(suggestion)}
                          className={className}
                        >
                          {suggestion}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {busy && (
              <div className="inline-flex w-fit items-center gap-2 rounded-2xl rounded-bl-md bg-muted px-3.5 py-2.5 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" /> Thinking…
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about services, fees, areas…"
              aria-label="Message the Abidia assistant"
              className="h-10 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition-colors hover:bg-brand/90 disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </form>

          <div className="flex items-center justify-between gap-2 border-t border-border bg-muted/40 px-4 py-2">
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Sparkles className="size-3 text-brand" /> AI assistant — not a quotation
            </p>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-brand hover:underline"
            >
              Talk to a human
            </a>
          </div>
        </div>
      )}
    </>
  );
}
