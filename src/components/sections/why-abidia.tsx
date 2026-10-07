import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lightbulb, Users, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/page-header";
import { site } from "@/config/site";
import { clients } from "@/data/projects";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Transparent fees, honest programme advice and documentation that stands up to audit, funder and regulator review.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Contemporary design principles and current technology applied to deliver best-in-class engineering solutions.",
  },
  {
    icon: Users,
    title: "Client focus",
    description:
      "One accountable team, clear communication and site presence — from feasibility through to defects liability.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "A fresh perspective on every project we undertake, with quality controlled at each stage of delivery.",
  },
];

export function WhyAbidia() {
  return (
    <section className="section">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Why Abidia"
              title="A trusted partner since 2010."
              description="Founded by Abraham Mukokanduku, Abidia has grown from humble beginnings into a trusted partner for clients seeking excellence in engineering services — across South Africa and Botswana."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="rounded-2xl border border-border bg-card p-5">
                    <span className="grid size-9 place-items-center rounded-lg bg-brand-subtle text-brand">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold">{value.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
              >
                Our story <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/downloads/abidia-company-profile-2024.pdf"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
              >
                Download company profile
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
              <Image
                src="/images/services/overview.jpg"
                alt="Abidia Engineering project team reviewing construction drawings on site"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="relative -mt-10 ml-4 mr-4 rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/5 sm:ml-10">
              <p className="eyebrow">Accreditations</p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {site.credentials.map((cred) => (
                  <Image
                    key={cred.short}
                    src={cred.logo}
                    alt={cred.label}
                    width={140}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Selected clients
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {clients.slice(0, 10).join(" · ")}…
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
