import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/page-header";
import { areas } from "@/data/areas";
import { site } from "@/config/site";

export function AreasSection() {
  return (
    <section className="section border-y border-border bg-muted/30">
      <div className="container-site">
        <SectionHeading
          eyebrow="Where we work"
          title="Three offices. Five regions. One team."
          description="From our base in Nelspruit we deliver across Mpumalanga, KwaZulu-Natal, Limpopo and Botswana — close enough to be on site when it matters."
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => {
            const office = site.offices.find((item) => item.label === area.officeLabel);
            return (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-brand/50"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand">
                    {area.province}
                  </span>
                  <span className="mt-1.5 block font-display text-lg font-semibold group-hover:text-brand">
                    {area.name}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {office ? `${office.street}, ${office.city}` : area.towns.slice(0, 3).join(" · ")}
                  </span>
                </span>
                <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
              </Link>
            );
          })}

          <Link
            href="/areas"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-dashed border-border bg-background p-5 transition-colors hover:border-brand/50"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Full coverage
              </span>
              <span className="mt-1.5 block font-display text-lg font-semibold group-hover:text-brand">
                All areas we serve
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Plus national projects across Southern Africa
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
          </Link>
        </div>
      </div>
    </section>
  );
}
