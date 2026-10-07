import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, MapPin, Building, Lock, BadgeCheck } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/project-card";
import { CtaBand } from "@/components/sections/cta-band";
import { projects, getProject } from "@/data/projects";
import { getService } from "@/data/services";
import { site } from "@/config/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const description = `${project.name} for ${project.client} — ${project.category} project by ${site.legalName}. Contract value: ${project.value}.`;

  return {
    title: `${project.name} — ${project.value} ${project.category} Project`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${site.name}`,
      description,
      url: `${site.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const service = getService(project.discipline);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;
  const related = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);
  const undisclosed = project.currency === "UNDISCLOSED";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "Project"],
    name: project.name,
    description: project.summary,
    client: { "@type": "Organization", name: project.client },
    location: project.region ? { "@type": "Place", name: project.region } : undefined,
    creator: { "@id": `${site.url}/#organization` },
    image: `${site.url}${project.image}`,
    url: `${site.url}/projects/${project.slug}`,
    category: project.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd, (_, value) => (value === undefined ? undefined : value)),
        }}
      />

      <PageHeader
        eyebrow={project.category}
        title={project.name}
        description={project.summary}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
              <Image
                src={project.image}
                alt={`${project.name} — delivered by Abidia Engineering for ${project.client}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-card p-6">
              <p className="leading-relaxed text-foreground/90 sm:text-lg">{project.summary}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Delivered as part of Abidia&apos;s {project.category.toLowerCase()} portfolio for{" "}
                {project.client}. The scope was executed by our multidisciplinary team and
                supervised to completion under our standard quality assurance process.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-6">
              <dl className="divide-y divide-border">
                <div className="flex items-start justify-between gap-4 py-3 first:pt-0">
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="size-4 text-brand" /> Client
                  </dt>
                  <dd className="text-right text-sm font-medium">{project.client}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3">
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BadgeCheck className="size-4 text-brand" /> Value
                  </dt>
                  <dd className="text-right font-display font-semibold text-brand">
                    {project.value}
                    {undisclosed && <Lock className="ml-1.5 inline size-3.5 text-muted-foreground" />}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3">
                  <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-4 text-brand" /> Region
                  </dt>
                  <dd className="text-right text-sm font-medium">{project.region ?? "South Africa"}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3">
                  <dt className="text-sm text-muted-foreground">Discipline</dt>
                  <dd className="text-right text-sm font-medium">
                    {service ? (
                      <Link href={`/services/${service.slug}`} className="text-brand hover:underline">
                        {service.name}
                      </Link>
                    ) : (
                      project.discipline
                    )}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-3 last:pb-0">
                  <dt className="text-sm text-muted-foreground">Category</dt>
                  <dd className="text-right text-sm font-medium">{project.category}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 rounded-3xl bg-[#141418] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Similar project?
              </p>
              <h2 className="mt-2 text-lg font-semibold">
                Get an indicative fee for work like this.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Use our estimator for a budget range, or build a brief and send it to our team.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/tools/estimate"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand/90"
                >
                  Open estimator <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white/10"
                >
                  Contact Abidia
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <nav className="container-site mt-10 flex items-center justify-between gap-4" aria-label="Project pagination">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group inline-flex max-w-[45%] flex-col gap-1 rounded-xl border border-border px-4 py-3 hover:border-brand"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3.5" /> Previous
              </span>
              <span className="truncate text-sm font-medium group-hover:text-brand">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex max-w-[45%] flex-col items-end gap-1 rounded-xl border border-border px-4 py-3 text-right hover:border-brand"
            >
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                Next <ArrowRight className="size-3.5" />
              </span>
              <span className="truncate text-sm font-medium group-hover:text-brand">{next.name}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>

      {related.length > 0 && (
        <section className="section border-y border-border bg-muted/30">
          <div className="container-site">
            <SectionHeading eyebrow="More like this" title={`Other ${project.category.toLowerCase()} projects`} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                <ArrowLeft className="size-4" /> Back to all projects
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
