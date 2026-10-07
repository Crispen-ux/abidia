import Link from "next/link";
import {
  Building2,
  Route,
  Layers,
  Droplets,
  Leaf,
  TrafficCone,
  Map,
  HardHat,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/page-header";

export const serviceIcons: Record<string, LucideIcon> = {
  "municipal-engineering": Building2,
  "road-engineering": Route,
  "structural-engineering": Layers,
  "water-wastewater-engineering": Droplets,
  "environmental-management": Leaf,
  "traffic-management": TrafficCone,
  "town-regional-planning": Map,
  "construction-management": HardHat,
};

export function ServicesSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="section">
      <div className="container-site">
        {showHeading && (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="What we do"
              title="Eight disciplines. One accountable team."
              description="Abidia covers the full project lifecycle — assessment, design, approval, procurement and construction supervision — so you deal with one consultancy from feasibility to handover."
            />
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                <span className="grid size-11 place-items-center rounded-xl bg-brand-subtle text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{service.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                  View service <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
