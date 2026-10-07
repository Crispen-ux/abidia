import Link from "next/link";
import { ArrowRight, ClipboardCheck, PencilRuler, FileCheck2, Gavel, HardHat } from "lucide-react";
import { SectionHeading } from "@/components/ui/page-header";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Consult & assess",
    description: "Site visit, constraints review and a clear scope with an indicative fee and programme.",
  },
  {
    icon: PencilRuler,
    title: "Design",
    description: "Multidisciplinary concept and detailed design coordinated across all eight services.",
  },
  {
    icon: FileCheck2,
    title: "Approve & package",
    description: "Authorisations, municipal approvals, bills of quantities and tender documentation.",
  },
  {
    icon: Gavel,
    title: "Tender & appoint",
    description: "Bid evaluation, contractor appointment support and a construction-ready contract package.",
  },
  {
    icon: HardHat,
    title: "Supervise & hand over",
    description: "Site supervision, quality assurance, payments certification and snag-free handover.",
  },
];

export function ProcessSection() {
  return (
    <section className="section border-y border-border bg-muted/30">
      <div className="container-site">
        <SectionHeading
          eyebrow="How we work"
          title="A delivery process built for approvals and accountability."
          description="Every Abidia engagement follows a five-stage process that keeps funders, municipalities and site teams aligned."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative flex flex-col rounded-2xl border border-border bg-background p-5"
              >
                <span className="absolute top-4 right-4 font-display text-3xl font-bold text-brand/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground">
                  <Icon className="size-4.5" />
                </span>
                <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium hover:border-brand hover:text-brand"
          >
            Start at stage one <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
