import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { serviceIcons } from "@/components/sections/services-section";
import { ProjectCard } from "@/components/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { services, getService } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/config/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };

  return {
    title: `${service.name} — ${service.summary}`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.summary,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.slug] ?? ArrowRight;
  const related = projects.filter((p) => p.discipline === service.slug).slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: ["South Africa", "Botswana"],
    serviceType: service.name,
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
        eyebrow="Services"
        title={service.name}
        description={service.summary}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          {service.sectors.map((sector) => (
            <span
              key={sector}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium"
            >
              {sector}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="grid size-12 place-items-center rounded-xl bg-brand text-brand-foreground">
              <Icon className="size-5.5" />
            </span>
            <p className="mt-6 leading-relaxed text-foreground/90 first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.85] first-letter:font-semibold first-letter:text-brand sm:text-lg">
              {service.intro}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-brand-subtle p-5">
                <p className="font-display text-2xl font-semibold text-brand-subtle-foreground">
                  {service.accentStat.value}
                </p>
                <p className="mt-1 text-sm text-brand-subtle-foreground/80">
                  {service.accentStat.label}
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Deliverables
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {service.deliverables.length}
                </p>
                <p className="text-sm text-muted-foreground">scoped outputs per engagement</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-semibold">What you receive</h2>
              <ul className="mt-4 grid gap-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-brand" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/brief"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90"
              >
                Scope this service <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium hover:border-brand hover:text-brand"
              >
                Talk to an engineer
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
              <Image
                src={service.image}
                alt={`${service.name} — Abidia Engineering`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-card p-6">
              <p className="eyebrow">Request a proposal</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Send us your scope, drawings or site location and we will respond within one
                business day with an indicative fee and programme.
              </p>
              <div className="mt-4 flex flex-col gap-2">
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
                  Call {site.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section border-y border-border bg-muted/30">
          <div className="container-site">
            <SectionHeading
              eyebrow="Related work"
              title={`${service.name} in the portfolio`}
              description="Recent Abidia projects delivered under this discipline."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {others.slice(0, 4).map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
                >
                  {other.name} <ArrowRight className="size-3.5" />
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <ArrowLeft className="size-4" /> All services
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow={`Get started — ${service.name}`}
        title="Ready to scope this service?"
        description="Use our project brief builder to capture everything our engineers need, or contact us directly."
      />
    </>
  );
}
