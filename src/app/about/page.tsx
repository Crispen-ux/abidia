import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, Eye, Handshake, MapPin } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";
import { services } from "@/data/services";
import { projects, clients } from "@/data/projects";

export const metadata: Metadata = {
  title: "About Abidia — Engineering Excellence Since 2010",
  description:
    "Founded in 2010 by Abraham Mukokanduku, Abidia is a multidisciplinary civil and structural engineering consultancy with offices in Mpumalanga, KwaZulu-Natal and Limpopo.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${site.name}`,
    description: site.shortDescription,
    url: `${site.url}/about`,
  },
};

const timeline = [
  {
    year: "2010",
    title: "Abidia is founded",
    description:
      "Abraham Mukokanduku establishes Abidia with a commitment to integrity, innovation and client focus.",
  },
  {
    year: "2010s",
    title: "Schools & sanitation programme",
    description:
      "A sustained programme of primary school upgrades, sanitation projects and bulk services for developers across Mpumalanga.",
  },
  {
    year: "Regional",
    title: "Southern Africa expansion",
    description:
      "Structural, road and water projects delivered for BHC Botswana, the Ministry of Works & Transport and Botswana College of Agriculture.",
  },
  {
    year: "Today",
    title: "Eight disciplines, three offices",
    description:
      "A multidisciplinary consultancy with offices in Nelspruit, Newcastle and Limpopo delivering projects up to R1.8 billion in value.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Abidia"
        title="Engineers who care about what happens after handover."
        description="Established in 2010, Abidia has been a leading provider of innovative engineering solutions — a trusted partner for clients seeking excellence in engineering services."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Company history"
              title="From humble beginnings to a trusted engineering partner."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Founded by <strong className="font-medium text-foreground">{site.founder}</strong>,
                Abidia has grown from humble beginnings to become a trusted partner for clients
                seeking excellence in engineering services. Our firm combines contemporary design
                principles, current technology and a commitment to excellence to bring a fresh
                perspective to every project we undertake.
              </p>
              <p>
                Today we operate as a multidisciplinary consultancy covering municipal, road,
                structural, water, environmental, traffic, town planning and construction
                management services — for municipalities, developers, mining houses, government
                departments and institutions across South Africa and Botswana.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5">
                <CalendarDays className="size-5 text-brand" />
                <p className="mt-3 font-display text-2xl font-semibold">{site.founded}</p>
                <p className="text-sm text-muted-foreground">Year established</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <Compass className="size-5 text-brand" />
                <p className="mt-3 font-display text-2xl font-semibold">{services.length}</p>
                <p className="text-sm text-muted-foreground">Engineering disciplines</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <Handshake className="size-5 text-brand" />
                <p className="mt-3 font-display text-2xl font-semibold">{clients.length}+</p>
                <p className="text-sm text-muted-foreground">Clients served</p>
              </div>
            </div>

            <div id="vision" className="mt-10 rounded-3xl border border-border bg-brand-subtle p-6 sm:p-8">
              <p className="eyebrow flex items-center gap-2">
                <Eye className="size-4" /> Our vision
              </p>
              <p className="mt-4 text-lg leading-relaxed text-brand-subtle-foreground sm:text-xl">
                “As we look to the future, Abidia remains committed to our core values of
                integrity, innovation and client focus. We are dedicated to staying at the
                forefront of technological advancements and industry trends, ensuring that we
                continue to deliver best-in-class engineering solutions to our clients.”
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-border">
              <Image
                src="/images/services/about.jpg"
                alt="Abidia Engineering team at work"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 rounded-3xl border border-border bg-card p-6">
              <p className="eyebrow">Accreditations</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {site.credentials.map((cred) => (
                  <div
                    key={cred.short}
                    className="flex items-center justify-center rounded-xl border border-border bg-background p-3"
                  >
                    <Image
                      src={cred.logo}
                      alt={cred.label}
                      width={140}
                      height={56}
                      className="h-11 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section border-y border-border bg-muted/30">
        <div className="container-site">
          <SectionHeading
            eyebrow="Milestones"
            title="A track record built project by project."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <li key={item.title} className="rounded-2xl border border-border bg-background p-5">
                <span className="font-display text-sm font-semibold text-brand">{item.year}</span>
                <h3 className="mt-2 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Our partners"
                title="Collaborations that extend our reach."
                description="We work alongside specialist partners and consultant engineers — including Smart Plans — to deliver coordinated multidisciplinary outcomes on complex projects."
              />
              <div className="mt-6 rounded-2xl border border-border bg-card p-6">
                <p className="text-sm font-semibold">Smart Plans</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Drafting and design partner supporting Abidia on drawing production, plans
                  preparation and documentation across our project portfolio.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Selected clients"
                title="Who we work with."
              />
              <div className="mt-6 flex flex-wrap gap-2">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    {client}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
                <MapPin className="size-5 shrink-0 text-brand" />
                <p className="text-sm text-muted-foreground">
                  Head office at {site.offices[0].street}, {site.offices[0].city} — with satellite
                  offices in Newcastle and Limpopo.
                </p>
              </div>

              <Link
                href="/projects"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
              >
                Explore {projects.length} flagship projects <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
