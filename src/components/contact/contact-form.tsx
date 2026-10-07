"use client";

import { useState } from "react";
import { Send, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { services } from "@/data/services";
import { site } from "@/config/site";

type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(event.currentTarget);
    const entries = Object.fromEntries(form.entries()) as Record<string, string>;
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    const body = [
      `Name: ${entries.name}`,
      `Email: ${entries.email}`,
      `Phone: ${entries.phone || "—"}`,
      `Service: ${entries.service}`,
      `Location: ${entries.location || "—"}`,
      "",
      "Project details:",
      entries.message,
    ].join("\n");

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...entries, _subject: `Website enquiry — ${entries.name}` }),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("sent");
        return;
      } catch {
        setStatus("error");
        setError("We could not send that automatically — please email us directly below.");
        return;
      }
    }

    // No endpoint configured: hand the enquiry to the visitor's mail app (free, no backend).
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      `Website enquiry — ${entries.name}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-brand" />
        <h3 className="mt-4 text-xl font-semibold">Your enquiry is on its way.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          If your mail app did not open, email us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-brand hover:underline">
            {site.email}
          </a>{" "}
          or call <a href={`tel:${site.phoneHref}`} className="font-medium text-brand hover:underline">{site.phone}</a>.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" name="name" required autoComplete="name" placeholder="Your name" className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.co.za" className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="083 000 0000" className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Project location</Label>
          <Input id="location" name="location" placeholder="Town / province" className="h-11" />
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="service">Service required *</Label>
          <select
            id="service"
            name="service"
            required
            defaultValue=""
            className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              Select a discipline…
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Multiple / not sure">Multiple / not sure yet</option>
          </select>
        </div>
        <div className="grid gap-2 sm:col-span-2">
          <Label htmlFor="message">Project details *</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Describe the scope, site, programme and any drawings you already have…"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="bg-brand text-brand-foreground hover:bg-brand/90"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send /> Send enquiry
            </>
          )}
        </Button>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand"
        >
          <Mail className="size-4" /> or email {site.email}
        </a>
      </div>
    </form>
  );
}
