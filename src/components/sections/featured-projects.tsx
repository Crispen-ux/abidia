import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  const projects = featuredProjects.slice(0, 6);

  return (
    <section className="section">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Flagship projects"
            title="Delivered across schools, hospitals, housing and bulk services."
            description="A selection from more than 45 flagship projects delivered for developers, consultants, municipalities and governments in South Africa and Botswana."
          />
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand hover:underline"
          >
            Full portfolio <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
