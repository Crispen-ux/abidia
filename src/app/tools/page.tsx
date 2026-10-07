import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  Hammer,
  ClipboardList,
  ArrowRight,
  Sparkles,
  FileDown,
  MessageCircle,
} from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Free Client Tools — Estimate, Calculate & Build a Brief",
  description:
    "Free engineering tools from Abidia: instant project cost estimates, quantity calculators for concrete and roads, and a project brief builder that sends your scope to our team.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: `Free Client Tools | ${site.name}`,
    description: "Estimate budgets, calculate quantities and build a project brief in minutes.",
    url: `${site.url}/tools`,
  },
};

const tools = [
  {
    href: "/tools/estimate",
    icon: Calculator,
    title: "Project cost estimator",
    description:
      "Pick a discipline, project size and region to get an indicative construction budget range — plus the professional fees you should plan for.",
    points: ["Indicative budget range", "Professional fee guidance", "Share results on WhatsApp"],
    cta: "Open estimator",
  },
  {
    href: "/tools/calculator",
    icon: Hammer,
    title: "Quantity calculator",
    description:
      "Turn site measurements into orderable quantities: concrete volumes, cement and aggregate, asphalt tonnage and excavation volumes.",
    points: ["Concrete & materials", "Road surface area", "Bulk earthworks"],
    cta: "Open calculator",
  },
  {
    href: "/tools/brief",
    icon: ClipboardList,
    title: "Project brief builder",
    description:
      "Answer six questions and generate a structured scope of works you can send to Abidia — email, WhatsApp or download as a text file.",
    points: ["Structured scope", "Instant handover", "No sign-up required"],
    cta: "Build my brief",
  },
];

const faqs = [
  {
    q: "Are these estimates accurate?",
    a: "They are indicative ranges based on Abidia's delivered project values and typical South African construction rates. Final costs depend on site conditions, design standards, market rates at the time of tender and statutory requirements — a formal quotation follows a site visit.",
  },
  {
    q: "Do I need an account to use the tools?",
    a: "No. Everything runs in your browser on this site — nothing is stored on our servers, and you can use the tools offline once the app is installed.",
  },
  {
    q: "Can I send my results to Abidia?",
    a: "Yes. Every tool produces a summary you can send by email or WhatsApp, or download as a file to attach to your own procurement process.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client tools"
        title="Get numbers before you get quotes."
        description="Three free tools that help developers, contractors, municipalities and homeowners plan engineering projects with confidence — no sign-up, no cost."
        breadcrumbs={[{ label: "Client Tools" }]}
      />

      <section className="section">
        <div className="container-site">
          <div className="grid gap-4 md:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.href}
                  className="flex flex-col rounded-3xl border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-brand text-brand-foreground">
                      <Icon className="size-5.5" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-subtle px-2.5 py-1 text-[11px] font-semibold text-brand-subtle-foreground">
                      <Sparkles className="size-3" /> Free
                    </span>
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">{tool.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {tool.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm">
                        <span className="size-1.5 rounded-full bg-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={tool.href}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
                  >
                    {tool.cta} <ArrowRight className="size-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section border-y border-border bg-muted/30">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="From estimate to appointment in three steps."
            />
            <ol className="mt-6 space-y-4">
              {[
                {
                  step: "01",
                  title: "Estimate your budget",
                  description: "Run the estimator to understand realistic budget bands for your discipline and region.",
                },
                {
                  step: "02",
                  title: "Build your brief",
                  description: "Capture scope, location, scale and programme in a structured project brief.",
                },
                {
                  step: "03",
                  title: "Send it to Abidia",
                  description: "We respond within one business day with next steps, questions and an indicative fee.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4 rounded-2xl border border-border bg-background p-5">
                  <span className="font-display text-xl font-bold text-brand/30">{item.step}</span>
                  <span>
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/estimate"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
              >
                <Calculator className="size-4" /> Start estimating
              </Link>
              <Link
                href="/tools/brief"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
              >
                <ClipboardList className="size-4" /> Build a brief
              </Link>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Questions" title="Frequently asked." />
            <div className="mt-6 space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-semibold">{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#141418] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Prefer to talk it through?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Call our engineers on {site.phone} or message us on WhatsApp during office hours.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand/90"
                >
                  <FileDown className="size-4" /> Contact us
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white/10"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
