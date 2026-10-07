"use client";

import { useMemo, useState } from "react";
import { Copy, Check, MessageCircle, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/config/site";
import { cn } from "cn";

type Tab = "concrete" | "road" | "earthworks";

const tabs: { key: Tab; label: string; hint: string }[] = [
  { key: "concrete", label: "Concrete", hint: "Slabs, footings, columns" },
  { key: "road", label: "Road surface", hint: "Asphalt, base & area" },
  { key: "earthworks", label: "Earthworks", hint: "Bulk excavation & cartaway" },
];

const num = (value: string) => {
  const parsed = parseFloat(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const fmt = (value: number, digits = 1) =>
  value.toLocaleString("en-ZA", { maximumFractionDigits: digits, minimumFractionDigits: 0 });

const fmtRands = (value: number) =>
  `R${Math.round(value).toLocaleString("en-ZA")}`;

function Field({
  label,
  unit,
  value,
  onChange,
  placeholder,
  step,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  step?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      <span className="relative">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode="decimal"
          step={step}
          className="h-11 pr-14"
        />
        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
          {unit}
        </span>
      </span>
    </label>
  );
}

function ResultRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className={strong ? "text-sm font-medium" : "text-sm text-muted-foreground"}>{label}</span>
      <span
        className={cn(
          "text-right text-sm",
          strong ? "font-display font-semibold text-brand" : "font-medium"
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function QuantityCalculator() {
  const [tab, setTab] = useState<Tab>("concrete");

  const [cLength, setCLength] = useState("10");
  const [cWidth, setCWidth] = useState("5");
  const [cThickness, setCThickness] = useState("100");

  const [rLength, setRLength] = useState("100");
  const [rWidth, setRWidth] = useState("6.5");
  const [rAsphalt, setRAsphalt] = useState("50");
  const [rBase, setRBase] = useState("150");

  const [eLength, setELength] = useState("50");
  const [eWidth, setEWidth] = useState("8");
  const [eDepth, setEDepth] = useState("1.2");

  const [copied, setCopied] = useState(false);

  const concrete = useMemo(() => {
    const volume = num(cLength) * num(cWidth) * (num(cThickness) / 1000);
    const withWaste = volume * 1.05;
    return {
      volume,
      withWaste,
      cement: Math.ceil(withWaste * 6.5),
      sand: withWaste * 0.6,
      stone: withWaste * 0.95,
      rebar: withWaste * 100,
      low: withWaste * 1400,
      high: withWaste * 2300,
    };
  }, [cLength, cWidth, cThickness]);

  const road = useMemo(() => {
    const area = num(rLength) * num(rWidth);
    const asphaltTons = area * (num(rAsphalt) / 1000) * 2.3;
    const baseTons = area * (num(rBase) / 1000) * 2.1;
    return {
      area,
      asphaltTons,
      baseTons,
      low: asphaltTons * 1100 + baseTons * 450,
      high: asphaltTons * 1650 + baseTons * 750,
    };
  }, [rLength, rWidth, rAsphalt, rBase]);

  const earth = useMemo(() => {
    const volume = num(eLength) * num(eWidth) * num(eDepth);
    const loose = volume * 1.25;
    return {
      volume,
      loose,
      trucks: Math.ceil(loose / 10),
      low: volume * 150,
      high: volume * 450,
    };
  }, [eLength, eWidth, eDepth]);

  const summary = useMemo(() => {
    if (tab === "concrete") {
      return [
        "ABIDIA — QUANTITY CALCULATOR (CONCRETE)",
        `Slab/element: ${cLength} m × ${cWidth} m × ${cThickness} mm`,
        `Volume: ${fmt(concrete.volume)} m³ (incl. 5% waste: ${fmt(concrete.withWaste)} m³)`,
        `Cement (50 kg bags): ~${concrete.cement}`,
        `Sand: ${fmt(concrete.sand)} m³ · 19 mm stone: ${fmt(concrete.stone)} m³`,
        `Reinforcement: ~${fmt(concrete.rebar, 0)} kg`,
        `Indicative material cost: ${fmtRands(concrete.low)} – ${fmtRands(concrete.high)}`,
        "",
        `Indicative only. Contact ${site.phone} · ${site.email}`,
      ].join("\n");
    }
    if (tab === "road") {
      return [
        "ABIDIA — QUANTITY CALCULATOR (ROAD SURFACE)",
        `Road: ${rLength} m × ${rWidth} m`,
        `Surface area: ${fmt(road.area)} m²`,
        `Asphalt (${rAsphalt} mm): ${fmt(road.asphaltTons)} t`,
        `Base layer (${rBase} mm): ${fmt(road.baseTons)} t`,
        `Indicative cost: ${fmtRands(road.low)} – ${fmtRands(road.high)}`,
        "",
        `Indicative only. Contact ${site.phone} · ${site.email}`,
      ].join("\n");
    }
    return [
      "ABIDIA — QUANTITY CALCULATOR (EARTHWORKS)",
      `Area: ${eLength} m × ${eWidth} m × ${eDepth} m deep`,
      `In-situ (bank) volume: ${fmt(earth.volume)} m³`,
      `Loose volume: ${fmt(earth.loose)} m³`,
      `Truck loads (10 m³): ~${earth.trucks}`,
      `Indicative cost: ${fmtRands(earth.low)} – ${fmtRands(earth.high)}`,
      "",
      `Indicative only. Contact ${site.phone} · ${site.email}`,
    ].join("\n");
  }, [tab, concrete, road, earth, cLength, cWidth, cThickness, rLength, rWidth, rAsphalt, rBase, eLength, eWidth, eDepth]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const reset = () => {
    setCLength("10");
    setCWidth("5");
    setCThickness("100");
    setRLength("100");
    setRWidth("6.5");
    setRAsphalt("50");
    setRBase("150");
    setELength("50");
    setEWidth("8");
    setEDepth("1.2");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:col-span-7">
        <div className="grid gap-2 sm:grid-cols-3">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left transition-colors",
                tab === item.key
                  ? "border-brand bg-brand-subtle"
                  : "border-border bg-background hover:border-brand/50"
              )}
            >
              <span
                className={cn(
                  "block text-sm font-semibold",
                  tab === item.key ? "text-brand-subtle-foreground" : ""
                )}
              >
                {item.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{item.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {tab === "concrete" && (
            <>
              <Field label="Length" unit="m" value={cLength} onChange={setCLength} placeholder="10" />
              <Field label="Width" unit="m" value={cWidth} onChange={setCWidth} placeholder="5" />
              <Field label="Thickness" unit="mm" value={cThickness} onChange={setCThickness} placeholder="100" />
            </>
          )}
          {tab === "road" && (
            <>
              <Field label="Length" unit="m" value={rLength} onChange={setRLength} placeholder="100" />
              <Field label="Width" unit="m" value={rWidth} onChange={setRWidth} placeholder="6.5" />
              <Field label="Asphalt layer" unit="mm" value={rAsphalt} onChange={setRAsphalt} placeholder="50" />
              <Field label="Base layer" unit="mm" value={rBase} onChange={setRBase} placeholder="150" />
            </>
          )}
          {tab === "earthworks" && (
            <>
              <Field label="Length" unit="m" value={eLength} onChange={setELength} placeholder="50" />
              <Field label="Width" unit="m" value={eWidth} onChange={setEWidth} placeholder="8" />
              <Field label="Depth" unit="m" value={eDepth} onChange={setEDepth} placeholder="1.2" />
            </>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Assumes 5% concrete waste, 6.5 × 50 kg bags per m³, asphalt density 2.3 t/m³ and base
            density 2.1 t/m³.
          </p>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-[132px] rounded-3xl bg-[#141418] p-6 text-white sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Order quantities
          </p>

          <div className="mt-4 divide-y divide-white/10">
            {tab === "concrete" && (
              <>
                <ResultRow label="Volume" value={`${fmt(concrete.volume)} m³`} strong />
                <ResultRow label="Order (incl. 5% waste)" value={`${fmt(concrete.withWaste)} m³`} />
                <ResultRow label="Cement (50 kg bags)" value={`~${concrete.cement}`} />
                <ResultRow label="Sand" value={`${fmt(concrete.sand)} m³`} />
                <ResultRow label="19 mm stone" value={`${fmt(concrete.stone)} m³`} />
                <ResultRow label="Reinforcement" value={`~${fmt(concrete.rebar, 0)} kg`} />
                <ResultRow
                  label="Indicative material cost"
                  value={`${fmtRands(concrete.low)} – ${fmtRands(concrete.high)}`}
                  strong
                />
              </>
            )}
            {tab === "road" && (
              <>
                <ResultRow label="Surface area" value={`${fmt(road.area)} m²`} strong />
                <ResultRow label={`Asphalt (${rAsphalt} mm)`} value={`${fmt(road.asphaltTons)} t`} />
                <ResultRow label={`Base (${rBase} mm)`} value={`${fmt(road.baseTons)} t`} />
                <ResultRow label="Road marking area" value={`${fmt(road.area)} m²`} />
                <ResultRow
                  label="Indicative cost"
                  value={`${fmtRands(road.low)} – ${fmtRands(road.high)}`}
                  strong
                />
              </>
            )}
            {tab === "earthworks" && (
              <>
                <ResultRow label="In-situ volume" value={`${fmt(earth.volume)} m³`} strong />
                <ResultRow label="Loose volume" value={`${fmt(earth.loose)} m³`} />
                <ResultRow label="Truck loads (10 m³)" value={`~${earth.trucks}`} />
                <ResultRow
                  label="Indicative cost"
                  value={`${fmtRands(earth.low)} – ${fmtRands(earth.high)}`}
                  strong
                />
              </>
            )}
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/50">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Quantities are calculated from your inputs. Costs are indicative ranges for planning
            only and exclude VAT, haulage and site constraints.
          </p>

          <div className="mt-5 grid gap-2">
            <Button
              className="bg-brand text-white hover:bg-brand/90"
              render={
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(summary)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle /> Send quantities
            </Button>
            <Button
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              onClick={copy}
            >
              {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy summary"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
