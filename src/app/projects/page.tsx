import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { CtaBand } from "@/components/sections/cta-band";
import { projects, clients } from "@/data/projects";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects Portfolio — 45+ Flagship Engineering Projects",
  description:
    "Explore Abidia's flagship projects: schools, hospitals, housing, roads, water and sanitation, traffic assessments and structures across South Africa and Botswana.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects Portfolio | ${site.name}`,
    description:
      "45+ flagship engineering projects across education, healthcare, housing, water and roads.",
    url: `${site.url}/projects`,
  },
};

export default function ProjectsPage() {
  const stats = [
    { value: String(projects.length), label: "Flagship projects" },
    { value: new Set(projects.map((p) => p.client)).size, label: "Clients served" },
    { value: "2", label: "Countries" },
    { value: "R1.8bn", label: "Largest project value" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Flagship projects that speak for themselves."
        description="A selection of work delivered for developers, consultants, municipalities and governments — from R6.5 million school upgrades to a R1.8 billion hospital upgrade."
        breadcrumbs={[{ label: "Projects" }]}
      >
        <dl className="grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-background px-4 py-3"
            >
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-0.5 font-display text-lg font-semibold text-brand">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section className="section">
        <div className="container-site">
          <ProjectBrowser projects={projects} />
        </div>
      </section>

      <CtaBand
        eyebrow="Your project next"
        title="Join a portfolio of delivered infrastructure."
        description={`Trusted by ${clients.length}+ clients including Zwelihle Holdings, Denzhe Engineers, Amulet Group, BHC Botswana and the Ministry of Works & Transport.`}
      />
    </>
  );
}
