import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { areas } from "@/data/areas";
import { projects } from "@/data/projects";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Where We Work — Engineering Services Across Southern Africa",
  description:
    "Abidia Engineering delivers civil and structural engineering in Nelspruit, across Mpumalanga, in Newcastle KwaZulu-Natal, Limpopo and Botswana.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: `Where We Work | ${site.name}`,
    description:
      "Engineering services in Nelspruit, Mpumalanga, Newcastle, Limpopo and Botswana.",
    url: `${site.url}/areas`,
  },
};

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        title="Engineering on the ground, not on a map."
        description="Three offices and a delivery footprint across Mpumalanga, KwaZulu-Natal, Limpopo and Botswana — close enough to be on site when it matters."
        breadcrumbs={[{ label: "Areas we serve" }]}
      />

      <section className="section">
        <div className="container-site">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => {
              const localProjects = projects.filter(
                (project) =>
                  (area.projectRegions.includes(project.region ?? "") &&
                    area.projectRegions.length > 0) ||
                  area.projectKeywords.some((keyword) =>
                    project.name.toLowerCase().includes(keyword.toLowerCase())
                  )
              ).length;
              const office = site.offices.find((office) => office.label === area.officeLabel);

              return (
                <Link
                  key={area.slug}
                  href={`/areas/${area.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={area.image}
                      alt={`${area.name} — Abidia Engineering`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow">{area.province}</p>
                    <h2 className="mt-2 text-lg leading-snug font-semibold group-hover:text-brand">
                      {area.name}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {area.summary}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-brand" />
                        {office ? office.city : area.towns.length} towns served
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-brand">
                        {localProjects} project{localProjects === 1 ? "" : "s"}
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-muted/40 p-6 sm:p-8">
            <SectionHeading
              eyebrow="Not listed?"
              title="We deliver nationally."
              description="Our engineers travel to site across South Africa and the wider region. If your project is outside these areas, tell us where it is — we will confirm feasibility and a fee."
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90"
              >
                Ask about your location <ArrowRight className="size-4" />
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium hover:border-brand hover:text-brand"
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
