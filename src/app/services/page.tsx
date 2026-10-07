import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { serviceIcons } from "@/components/sections/services-section";
import { CtaBand } from "@/components/sections/cta-band";
import { services } from "@/data/services";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Engineering Services",
  description:
    "Eight multidisciplinary engineering services: municipal, road, structural, water & wastewater, environmental, traffic, town planning and construction management.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Engineering Services | ${site.name}`,
    description:
      "Municipal, road, structural, water, environmental, traffic, town planning and construction management services.",
    url: `${site.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Multidisciplinary engineering, end to end."
        description="Abidia delivers eight coordinated engineering disciplines — so your project moves from feasibility to handover with one accountable consultancy."
        breadcrumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-wrap gap-2">
          {["South Africa & Botswana", "ECSA-registered team", "Public & private sectors"].map(
            (chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium"
              >
                {chip}
              </span>
            )
          )}
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-site space-y-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.slug] ?? ArrowRight;
            return (
              <article
                key={service.slug}
                className="group grid gap-6 rounded-3xl border border-border bg-card p-6 transition-all hover:border-brand/40 sm:p-8 lg:grid-cols-12 lg:items-center"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-start gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground">
                      <Icon className="size-5.5" />
                    </span>
                    <div>
                      <p className="eyebrow">{service.sectors[0]}</p>
                      <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{service.name}</h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                  >
                    Service details <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div className="lg:col-span-7">
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {service.deliverables.slice(0, 6).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3">
                    <span className="font-display text-lg font-semibold text-brand">
                      {service.accentStat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {service.accentStat.label}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
