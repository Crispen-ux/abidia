import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  FileDown,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/ui/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Abidia — Engineering Enquiries",
  description:
    "Contact Abidia Engineering: call 083 470 2027, email info@abidia.co.za or visit our head office in Nelspruit, Mpumalanga. Offices in Newcastle and Limpopo.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${site.name}`,
    description: "Talk to an Abidia engineer — response within one business day.",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  const whatsappText = encodeURIComponent(
    "Hello Abidia, I would like to enquire about engineering services for my project."
  );

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to an engineer, not a call centre."
        description="Send us your scope, drawings or a site address — our team responds within one business day with next steps and an indicative fee."
        breadcrumbs={[{ label: "Contact" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground hover:bg-brand/90"
          >
            <Phone className="size-4" /> {site.phone}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium hover:border-brand hover:text-brand"
          >
            <MessageCircle className="size-4" /> WhatsApp us
          </a>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Send an enquiry"
              title="Tell us what you need built."
              description="The more detail you share — scope, location, programme — the faster we can respond with a useful answer."
            />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="eyebrow">Direct lines</p>
              <div className="mt-4 grid gap-3">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 hover:border-brand"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground">
                    <Phone className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Phone</span>
                    <span className="block text-sm font-medium">{site.phone}</span>
                  </span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 hover:border-brand"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground">
                    <Mail className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Email</span>
                    <span className="block text-sm font-medium">{site.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground">
                    <Clock className="size-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Office hours</span>
                    <span className="block text-sm font-medium">{site.hours}</span>
                  </span>
                </div>
              </div>

              <a
                href="/downloads/abidia-company-profile-2024.pdf"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-brand bg-brand px-4 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90"
              >
                <FileDown className="size-4" /> Download company profile (PDF)
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-border">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/images/services/office.jpg"
                  alt="Abidia Engineering head office area"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Head office
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {site.offices[0].street}, {site.offices[0].city}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section border-t border-border bg-muted/30">
        <div className="container-site">
          <SectionHeading
            eyebrow="Offices"
            title="Three offices, one team."
            description="Visit us in Mpumalanga, KwaZulu-Natal or Limpopo — or send your enquiry and we will route it to the nearest office."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {site.offices.map((office) => (
              <div key={office.label} className="rounded-2xl border border-border bg-background p-6">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-brand" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {office.label}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed">
                  {office.street}
                  {office.suburb && <span className="block">{office.suburb}</span>}
                  <span className="block">
                    {office.city}, {office.province}
                  </span>
                  <span className="block text-muted-foreground">{office.country}</span>
                </p>
                <a
                  href={office.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
                >
                  <Navigation className="size-4" /> Get directions
                </a>
                {office.area && (
                  <Link
                    href={`/areas/${office.area}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand"
                  >
                    Services in this region <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Prefer messaging?"
        title="WhatsApp your drawings straight to our team."
        description={`Message us on WhatsApp at ${site.phone} and send photos, plans or location pins — we will pick it up during office hours.`}
      />
    </>
  );
}
