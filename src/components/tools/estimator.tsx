"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Copy,
  Check,
  Mail,
  MessageCircle,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/data/services";

type SizeKey = "small" | "medium" | "large";
type Mode = "construction" | "fee";

type Rate = { [K in SizeKey]: [number, number] };

const rates: Record<string, { mode: Mode; rates: Rate; unit: string }> = {
  "municipal-engineering": {
    mode: "construction",
    unit: "bulk services, sanitation & public facilities",
    rates: {
      small: [400_000, 2_500_000],
      medium: [2_500_000, 18_000_000],
      large: [18_000_000, 90_000_000],
    },
  },
  "road-engineering": {
    mode: "construction",
    unit: "roadworks, pavement & street infrastructure",
    rates: {
      small: [350_000, 2_000_000],
      medium: [2_000_000, 15_000_000],
      large: [15_000_000, 80_000_000],
    },
  },
  "structural-engineering": {
    mode: "construction",
    unit: "structural works from foundations to frame",
    rates: {
      small: [900_000, 5_000_000],
      medium: [5_000_000, 30_000_000],
      large: [30_000_000, 200_000_000],
    },
  },
  "water-wastewater-engineering": {
    mode: "construction",
    unit: "pipes, reservoirs, pump stations & treatment",
    rates: {
      small: [500_000, 3_000_000],
      medium: [3_000_000, 20_000_000],
      large: [20_000_000, 100_000_000],
    },
  },
  "construction-management": {
    mode: "fee",
    unit: "employer's agent & site supervision fees",
    rates: {
      small: [80_000, 400_000],
      medium: [400_000, 2_000_000],
      large: [2_000_000, 8_000_000],
    },
  },
  "environmental-management": {
    mode: "fee",
    unit: "assessments, authorisations & management plans",
    rates: {
      small: [60_000, 200_000],
      medium: [200_000, 750_000],
      large: [750_000, 3_000_000],
    },
  },
  "traffic-management": {
    mode: "fee",
    unit: "traffic impact assessments & counts",
    rates: {
      small: [25_000, 90_000],
      medium: [90_000, 350_000],
      large: [350_000, 1_000_000],
    },
  },
  "town-regional-planning": {
    mode: "fee",
    unit: "planning applications & spatial frameworks",
    rates: {
      small: [40_000, 150_000],
      medium: [150_000, 550_000],
      large: [550_000, 1_800_000],
    },
  },
};

const sizes: { key: SizeKey; label: string; hint: string }[] = [
  { key: "small", label: "Small", hint: "Single site, straightforward scope" },
  { key: "medium", label: "Medium", hint: "Multi-stand or phased delivery" },
  { key: "large", label: "Large", hint: "Programme across multiple sites" },
];

const regions: { label: string; factor: number }[] = [
  { label: "Mpumalanga", factor: 1 },
  { label: "Gauteng", factor: 1.12 },
  { label: "KwaZulu-Natal", factor: 1.02 },
  { label: "Limpopo", factor: 1 },
  { label: "North West", factor: 0.97 },
  { label: "Free State", factor: 0.95 },
  { label: "Western Cape", factor: 1.15 },
  { label: "Eastern Cape", factor: 0.95 },
  { label: "Botswana", factor: 1.1 },
];

const formatRands = (value: number) => {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `R${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}m`;
  }
  if (value >= 1_000) return `R${Math.round(value / 1_000)}k`;
  return `R${Math.round(value)}`;
};

export function Estimator() {
  const [discipline, setDiscipline] = useState("municipal-engineering");
  const [size, setSize] = useState<SizeKey>("medium");
  const [region, setRegion] = useState("Mpumalanga");
  const [complex, setComplex] = useState(false);
  const [copied, setCopied] = useState(false);

  const service = services.find((s) => s.slug === discipline);
  const config = rates[discipline];

  const estimate = useMemo(() => {
    const factor =
      (regions.find((r) => r.label === region)?.factor ?? 1) * (complex ? 1.25 : 1);
    const [low, high] = config.rates[size];
    const lowAdj = Math.round((low * factor) / 1000) * 1000;
    const highAdj = Math.round((high * factor) / 1000) * 1000;
    const feeLow = Math.round((lowAdj * 0.08) / 1000) * 1000;
    const feeHigh = Math.round((highAdj * 0.12) / 1000) * 1000;
    return { low: lowAdj, high: highAdj, feeLow, feeHigh };
  }, [config, size, region, complex]);

  const summary = [
    "ABIDIA — INDICATIVE PROJECT ESTIMATE",
    `Service: ${service?.name}`,
    `Scope: ${config.unit}`,
    `Project size: ${sizes.find((s) => s.key === size)?.label}`,
    `Region: ${region}`,
    `Complexity: ${complex ? "Complex / constrained" : "Standard"}`,
    "",
    config.mode === "construction"
      ? `Indicative construction budget: ${formatRands(estimate.low)} – ${formatRands(estimate.high)}`
      : `Indicative professional fee range: ${formatRands(estimate.low)} – ${formatRands(estimate.high)}`,
    config.mode === "construction"
      ? `Professional fees (8–12%): ${formatRands(estimate.feeLow)} – ${formatRands(estimate.feeHigh)}`
      : "Excludes VAT and statutory authority fees.",
    "",
    "Indicative only — not a quotation. Final pricing follows a site visit.",
    `Contact: ${site.phone} · ${site.email}`,
  ].join("\n");

  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(summary)}`;
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Estimate request — ${service?.name}`
  )}&body=${encodeURIComponent(summary)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-7">
        <p className="eyebrow">1 · Discipline</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {services.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setDiscipline(item.slug)}
              className={
                discipline === item.slug
                  ? "rounded-xl border border-brand bg-brand px-3 py-2.5 text-left text-xs font-semibold text-brand-foreground"
                  : "rounded-xl border border-border bg-background px-3 py-2.5 text-left text-xs font-medium text-muted-foreground hover:border-brand/50 hover:text-foreground"
              }
            >
              {item.name}
            </button>
          ))}
        </div>

        <p className="mt-8 eyebrow">2 · Project size</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {sizes.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSize(item.key)}
              className={
                size === item.key
                  ? "rounded-xl border border-brand bg-brand-subtle px-4 py-3 text-left"
                  : "rounded-xl border border-border bg-background px-4 py-3 text-left hover:border-brand/50"
              }
            >
              <span
                className={
                  size === item.key
                    ? "block text-sm font-semibold text-brand-subtle-foreground"
                    : "block text-sm font-medium"
                }
              >
                {item.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="eyebrow">3 · Region</p>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              aria-label="Project region"
              className="mt-3 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {regions.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="eyebrow">4 · Complexity</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setComplex(false)}
                className={
                  !complex
                    ? "rounded-lg border border-brand bg-brand px-3 py-2.5 text-sm font-medium text-brand-foreground"
                    : "rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-muted-foreground hover:border-brand/50"
                }
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setComplex(true)}
                className={
                  complex
                    ? "rounded-lg border border-brand bg-brand px-3 py-2.5 text-sm font-medium text-brand-foreground"
                    : "rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-muted-foreground hover:border-brand/50"
                }
              >
                Complex +25%
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-[132px] rounded-3xl bg-[#141418] p-6 text-white sm:p-7">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            <Calculator className="size-4" /> Your estimate
          </div>

          <p className="mt-4 text-sm text-white/60">{service?.name}</p>

          <p className="mt-1 font-display text-3xl font-semibold sm:text-4xl">
            {formatRands(estimate.low)}{" "}
            <span className="text-white/40">–</span> {formatRands(estimate.high)}
          </p>
          <p className="mt-2 text-sm text-white/60">
            {config.mode === "construction"
              ? `Indicative construction budget for ${config.unit} in ${region}.`
              : `Indicative professional fee for ${config.unit} in ${region}.`}
          </p>

          <div className="mt-5 space-y-2 rounded-2xl bg-white/5 p-4 text-sm">
            {config.mode === "construction" ? (
              <div className="flex items-start justify-between gap-4">
                <span className="text-white/60">Professional fees (8–12%)</span>
                <span className="text-right font-medium">
                  {formatRands(estimate.feeLow)} – {formatRands(estimate.feeHigh)}
                </span>
              </div>
            ) : null}
            <div className="flex items-start justify-between gap-4">
              <span className="text-white/60">Region factor</span>
              <span className="font-medium">
                ×{(regions.find((r) => r.label === region)?.factor ?? 1).toFixed(2)}
              </span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-white/60">Complexity</span>
              <span className="font-medium">{complex ? "Complex (+25%)" : "Standard"}</span>
            </div>
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/50">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Indicative only — excludes land, VAT, authority fees and ground conditions. A formal
            quotation follows a site visit.
          </p>

          <div className="mt-5 grid gap-2">
            <Button
              className="bg-brand text-white hover:bg-brand/90"
              render={<a href={whatsapp} target="_blank" rel="noopener noreferrer" />}
            >
              <MessageCircle /> Send on WhatsApp
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white" render={<a href={mailto} />}>
                <Mail /> Email
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white" onClick={copy}>
                {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Button
              variant="ghost"
              className="text-white/70 hover:bg-white/10 hover:text-white"
              render={<a href={`/tools/brief?service=${discipline}`}/>}
            >
              Build a full brief <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
