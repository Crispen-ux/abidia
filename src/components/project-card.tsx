import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "cn";

export function formatValue(project: Project) {
  if (project.currency === "UNDISCLOSED") return project.value;
  if (project.currency === "BWP") return `${project.value} (BWP)`;
  if (project.currency === "NAD") return `${project.value} (NAD)`;
  return project.value;
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const undisclosed = project.currency === "UNDISCLOSED";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.category} project by Abidia Engineering`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
          {project.category}
        </span>
        {project.region && (
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            <MapPin className="size-3" /> {project.region}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base leading-snug font-semibold group-hover:text-brand">
          {project.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{project.client}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-semibold",
              undisclosed ? "text-muted-foreground" : "text-brand"
            )}
          >
            {undisclosed && <Lock className="size-3.5" />}
            {formatValue(project)}
          </span>
          <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
      </div>
    </Link>
  );
}
