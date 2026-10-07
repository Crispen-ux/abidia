"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  Mail,
  MessageCircle,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { cn } from "cn";

const steps = [
  { title: "Service", subtitle: "What do you need?" },
  { title: "Site", subtitle: "Where is it?" },
  { title: "Scale", subtitle: "How big?" },
  { title: "You", subtitle: "Who should we contact?" },
  { title: "Brief", subtitle: "Review & send" },
];

const budgets = [
  "Under R500k",
  "R500k – R2m",
  "R2m – R10m",
  "R10m – R50m",
  "Over R50m",
  "Not sure yet",
];

const timelines = ["ASAP", "1–3 months", "3–6 months", "6–12 months", "Planning stage"];

export function BriefBuilder({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    service: initialService && services.some((s) => s.slug === initialService) ? initialService : "",
    town: "",
    province: "Mpumalanga",
    status: "New development",
    size: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const update = (patch: Partial<typeof form>) => setForm((prev) => ({ ...prev, ...patch }));

  const service = services.find((s) => s.slug === form.service);

  const canNext = useMemo(() => {
    if (step === 0) return Boolean(form.service);
    if (step === 1) return form.town.trim().length > 1;
    if (step === 2) return form.size.trim().length > 0;
    if (step === 3) return form.name.trim().length > 1 && form.email.includes("@");
    return true;
  }, [step, form]);

  const brief = useMemo(() => {
    return [
      "ABIDIA — PROJECT BRIEF",
      `Prepared: ${new Date().toLocaleDateString("en-ZA")}`,
      "",
      "1. PROJECT",
      `Service required: ${service?.name ?? "—"}`,
      `Project type: ${form.status}`,
      "",
      "2. SITE",
      `Location: ${form.town || "—"}, ${form.province}`,
      "",
      "3. SCALE & PROGRAMME",
      `Estimated scale: ${form.size || "—"}`,
      `Budget band: ${form.budget || "—"}`,
      `Target start: ${form.timeline || "—"}`,
      "",
      "4. ADDITIONAL NOTES",
      form.notes || "—",
      "",
      "5. CONTACT",
      `Name: ${form.name || "—"}`,
      `Organisation: ${form.email || "—"}`,
      `Email: ${form.email || "—"}`,
      `Phone: ${form.phone || "—"}`,
      "",
      "Generated with the Abidia project brief builder.",
    ].join("\n");
  }, [form, service]);

  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(brief)}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Project brief — ${service?.name ?? "Engineering"} (${form.town || "Site"})`
  )}&body=${encodeURIComponent(brief)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const download = () => {
    const blob = new Blob([brief], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "abidia-project-brief.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-7">
        <ol className="flex items-center gap-2">
          {steps.map((item, index) => (
            <li key={item.title} className="flex flex-1 flex-col gap-1.5">
              <span
                className={cn(
                  "h-1 rounded-full transition-colors",
                  index <= step ? "bg-brand" : "bg-border"
                )}
              />
              <span
                className={cn(
                  "hidden text-[11px] font-medium sm:block",
                  index === step ? "text-brand" : "text-muted-foreground"
                )}
              >
                {index + 1}. {item.title}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-7 min-h-[340px]">
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold">Which discipline do you need?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick the closest match — you can describe multi-discipline scopes in step 4.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {services.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => update({ service: item.slug })}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      form.service === item.slug
                        ? "border-brand bg-brand-subtle font-semibold text-brand-subtle-foreground"
                        : "border-border bg-background hover:border-brand/50"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4">
              <h2 className="text-lg font-semibold">Where is the project?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="town">Town / city *</Label>
                  <Input
                    id="town"
                    value={form.town}
                    onChange={(e) => update({ town: e.target.value })}
                    placeholder="e.g. Emalahleni"
                    className="h-11"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="province">Province / country</Label>
                  <select
                    id="province"
                    value={form.province}
                    onChange={(e) => update({ province: e.target.value })}
                    className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {["Mpumalanga", "Gauteng", "KwaZulu-Natal", "Limpopo", "North West", "Western Cape", "Eastern Cape", "Free State", "Botswana", "Other"].map(
                      (item) => (
                        <option key={item}>{item}</option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Project status</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["New development", "Upgrade / refurb", "Assessment / study"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => update({ status: item })}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm",
                        form.status === item
                          ? "border-brand bg-brand-subtle font-medium text-brand-subtle-foreground"
                          : "border-border bg-background hover:border-brand/50"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4">
              <h2 className="text-lg font-semibold">How big, and when?</h2>
              <div className="grid gap-2">
                <Label htmlFor="size">Estimated scale *</Label>
                <Input
                  id="size"
                  value={form.size}
                  onChange={(e) => update({ size: e.target.value })}
                  placeholder="e.g. 4 500 m² site · 200 units · 3 km road"
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Units, metres, square metres or stands — whatever you know.
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Budget band</Label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => update({ budget: item })}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium",
                        form.budget === item
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-brand/50"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Target start</Label>
                <div className="flex flex-wrap gap-2">
                  {timelines.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => update({ timeline: item })}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium",
                        form.timeline === item
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-brand/50"
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <h2 className="text-lg font-semibold">Who should we contact?</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="bname">Full name *</Label>
                  <Input id="bname" value={form.name} onChange={(e) => update({ name: e.target.value })} className="h-11" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bemail">Email *</Label>
                  <Input id="bemail" type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} className="h-11" placeholder="you@company.co.za" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bphone">Phone</Label>
                  <Input id="bphone" type="tel" value={form.phone} onChange={(e) => update({ phone: e.target.value })} className="h-11" placeholder="083 000 0000" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bnotes">Anything else we should know?</Label>
                <Textarea
                  id="bnotes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                  placeholder="Drawings available, funder requirements, approvals already in place…"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ClipboardList className="size-5 text-brand" /> Your project brief
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Send it straight to our team — we respond within one business day.
              </p>
              <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-border bg-background p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                {brief}
              </pre>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Button
                  className="bg-brand text-brand-foreground hover:bg-brand/90"
                  render={<a href={whatsapp} target="_blank" rel="noopener noreferrer" />}
                >
                  <MessageCircle /> Send on WhatsApp
                </Button>
                <Button variant="outline" render={<a href={mailto} />}>
                  <Mail /> Email to Abidia
                </Button>
                <Button variant="outline" onClick={copy}>
                  {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy brief"}
                </Button>
                <Button variant="outline" onClick={download}>
                  <Download /> Download .txt
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft /> Back
          </Button>

          {step < steps.length - 1 ? (
            <Button
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue <ArrowRight />
            </Button>
          ) : (
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of {steps.length}
            </span>
          )}
        </div>
      </div>

      <aside className="lg:col-span-5">
        <div className="sticky top-[132px] rounded-3xl border border-border bg-muted/40 p-6">
          <p className="eyebrow">Live summary</p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Service</dt>
              <dd className="text-right font-medium">{service?.name ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Location</dt>
              <dd className="text-right font-medium">
                {form.town ? `${form.town}, ${form.province}` : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="text-right font-medium">{form.status}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Scale</dt>
              <dd className="text-right font-medium">{form.size || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Budget</dt>
              <dd className="text-right font-medium">{form.budget || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Start</dt>
              <dd className="text-right font-medium">{form.timeline || "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Contact</dt>
              <dd className="text-right font-medium">{form.name || "—"}</dd>
            </div>
          </dl>

          <div className="mt-5 rounded-xl bg-[#141418] p-4 text-white">
            <p className="text-xs text-white/60">Prefer to skip the form?</p>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-1 block font-display text-lg font-semibold text-white hover:text-brand"
            >
              {site.phone}
            </a>
            <p className="mt-1 text-xs text-white/50">{site.hours}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
