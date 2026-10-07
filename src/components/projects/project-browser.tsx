"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { projectCategories, type Project } from "@/data/projects";
import { cn } from "cn";

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        (project.region ?? "").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, category]);

  return (
    <div>
      <div className="sticky top-[104px] z-20 -mx-4 mb-6 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:top-[132px] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, clients or regions…"
              className="h-11 pl-9"
              aria-label="Search projects"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
            <SlidersHorizontal className="size-3.5" />
            {filtered.length} of {projects.length} projects
          </div>
        </div>

        <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                category === item
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-brand/50 hover:text-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 hidden text-sm text-muted-foreground sm:block">
        Showing {filtered.length} of {projects.length} projects
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <FolderOpen className="mx-auto size-8 text-muted-foreground" />
          <p className="mt-4 font-medium">No projects match that search.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another keyword or reset the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
