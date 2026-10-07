import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { serviceIcons } from "@/components/sections/services-section";
import { areas, getArea } from "@/data/areas";
import { projects, featuredProjects } from "@/data/projects";
import { services, getService } from "@/data/services";
import { site } from "@/config/site";

export function generateStaticParams() {
  return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return { title: "Area not found" };

  return {
    title: area.title,
    description: area.summary,
    alternates: { canonical: `/areas/${area.slug}` },
    keywords: [
      `${area.name} engineers`,
      `civil engineers ${area.province}`,
      `structural engineers ${area.name}`,
      `engineering consultancy ${area.name}`,
      ...area.towns.slice(0, 4).map((town) => `engineers in ${town}`),
    ],
    openGraph: {
      title: `${area.title} | ${site.name}`,
      description: area.summary,
      url: `${site.url}/areas/${area.slug}`,
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const office = site.offices.find((item) => item.label === area.officeLabel);
  const areaProjects = projects.filter(
    (project) =>
      area.projectRegions.includes(project.region ?? "") ||
      area.projectKeywords.some((keyword) =>
        project.name.toLowerCase().includes(keyword.toLowerCase())
      )
  );
  const shownProjects = areaProjects.length > 0 ? areaProjects.slice(0, 6) : featuredProjects.slice(0, 3);
  const areaServices = area.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
  const otherAreas = areas.filter((item) => item.slug !== area.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Engineering services in ${area.name}`,
    description: area.summary,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: {
      "@type": area.province === "Botswana" ? "Country" : "AdministrativeArea",
      name: area.name,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: site.phoneHref },
      serviceUrl: `${site.url}/contact`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow={`Where we work · ${area.province}`}
        title={area.title}
        description={area.summary}
        breadcrumbs={[{ label: "Areas we serve", href: "/areas" }, { label: area.name }]}
      >
        <div className="flex flex-wrap gap-2">
          {area.towns.map((town) => (
            <span
              key={town}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium"
            >
              {town}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="leading-relaxed text-foreground/90 first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.85] first-letter:font-semibold first-letter:text-brand sm:text-lg">
              {area.intro}
            </p>

            <ul className="mt-8 grid gap-3">
              {area.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">Services we provide in {area.name}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {areaServices.map((service) => {
                  const Icon = serviceIcons[service.slug] ?? ArrowRight;
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand/50"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-subtle text-brand">
                        <Icon className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold group-hover:text-brand">
                          {service.name}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                          {service.short}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-5">
            {office ? (
              <div className="rounded-3xl border border-border bg-card p-6">
                <p className="eyebrow">{office.label}</p>
                <p className="mt-3 flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span>
                    {office.street}
                    {office.suburb ? `, ${office.suburb}` : ""}
                    <br />
                    {office.city}, {office.province}
                  </span>
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4 text-brand" /> {site.hours}
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
                  >
                    Request a quote <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
                  >
                    <Phone className="size-4" /> {site.phone}
                  </a>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-[#141418] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Serving {area.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Our engineers travel to site across {area.name}. Call us to confirm availability,
                  programme and an indicative fee.
                </p>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="mt-4 block font-display text-2xl font-semibold hover:text-brand"
                >
                  {site.phone}
                </a>
                <p className="mt-1 text-xs text-white/50">{site.hours}</p>
              </div>
            )}

            <div className="mt-6 rounded-3xl border border-border bg-brand-subtle p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-subtle-foreground/80">
                Need an estimate?
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-brand-subtle-foreground">
                Get a budget range in 30 seconds.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/tools/estimate"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
                >
                  Open estimator <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/tools/brief"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
                >
                  Build a brief
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section border-y border-border bg-muted/30">
        <div className="container-site">
          <SectionHeading
            eyebrow="Related work"
            title={areaProjects.length > 0 ? `Projects delivered in ${area.name}` : "Selected work"}
            description={
              areaProjects.length > 0
                ? `A sample of the ${area.name} portfolio across our disciplines.`
                : "Selected projects from our wider portfolio — ask us for references in your region."
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shownProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              View all {projects.length} projects <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow="Other areas" title="Where else we work" />
          <div className="mt-6 flex flex-wrap gap-3">
            {otherAreas.map((item) => (
              <Link
                key={item.slug}
                href={`/areas/${item.slug}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
              >
                {item.name} <ArrowRight className="size-3.5" />
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Disciplines available: {services.map((service) => service.short).join(" · ")}.
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow={`Get started — ${area.name}`}
        title="Ready to start in your area?"
        description="Send your scope and site location — we will respond within one business day with an indicative fee and programme."
      />
    </>
  );
}
