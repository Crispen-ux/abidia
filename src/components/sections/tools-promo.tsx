import Link from "next/link";
import { Calculator, Hammer, ClipboardList, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";

const tools = [
  {
    href: "/tools/estimate",
    icon: Calculator,
    title: "Project cost estimator",
    description:
      "Choose your discipline, scale and region to get an instant budget range based on Abidia's delivered project values.",
    cta: "Estimate my budget",
  },
  {
    href: "/tools/calculator",
    icon: Hammer,
    title: "Quantity calculator",
    description:
      "Instant concrete volumes, road areas, excavation quantities and reinforcement weights for your site measurements.",
    cta: "Calculate quantities",
  },
  {
    href: "/tools/brief",
    icon: ClipboardList,
    title: "Project brief builder",
    description:
      "Answer a few questions and generate a ready-to-send scope of works — then email it straight to our team.",
    cta: "Build my brief",
  },
];

export function ToolsPromo() {
  return (
    <section className="section border-y border-border bg-muted/30">
      <div className="container-site">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Free client tools"
            title="Plan your project before you call us."
            description="Practical, free tools built for developers, contractors and municipalities — get numbers, quantities and a scope of works in minutes."
          />
          <Button variant="outline" render={<Link href="/tools" />}>
            All client tools <ArrowRight />
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand text-brand-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-subtle px-2.5 py-1 text-[11px] font-semibold text-brand-subtle-foreground">
                    <Sparkles className="size-3" /> Free
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{tool.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  {tool.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
