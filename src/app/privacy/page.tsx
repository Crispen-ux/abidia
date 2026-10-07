import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Abidia Engineering collects, uses and protects the personal information you share through this website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you submit a contact form, build a project brief or send us a message on WhatsApp, we receive the details you choose to share — your name, email address, phone number, organisation and information about your project.",
      "The website also records standard technical data such as browser type and pages visited, used only to keep the site running reliably.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use your information to respond to your enquiry, prepare a fee proposal or estimate, and deliver the services you engage us for.",
      "We do not sell, rent or trade your personal information, and we do not use it for unrelated marketing without your consent.",
    ],
  },
  {
    heading: "Sharing and storage",
    body: [
      "Your details are shared only with Abidia staff working on your enquiry and, where a project requires it, with our delivery partner Smart Plans.",
      "Records are retained for as long as needed to serve you and to meet professional and statutory record-keeping obligations.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You may ask what personal information we hold about you, request a correction, or ask us to delete it where we are not required to keep it. Email us at info@abidia.co.za and we will respond within a reasonable period.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This site does not use advertising cookies. The only browser storage used is to remember your light/dark theme preference and whether you have dismissed the app install prompt.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this policy can be sent to ${site.email} or ${site.phone}, or by post to 10 Cedarwood Circle, West Acres, Nelspruit, Mpumalanga.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        description="Last updated October 2026. This policy explains what we do with the information you share through this website."
        breadcrumbs={[{ label: "Privacy policy" }]}
      />

      <section className="section">
        <div className="container-site max-w-3xl">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold">{section.heading}</h2>
                <div className="mt-2 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              This policy sits alongside our{" "}
              <Link href="/popia" className="font-medium text-brand underline-offset-4 hover:underline">
                POPIA notice
              </Link>
              , which sets out your rights as a data subject under South African law, and our{" "}
              <Link href="/terms" className="font-medium text-brand underline-offset-4 hover:underline">
                terms of use
              </Link>
              .
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Need a copy of your data or want to raise a concern? Email{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-brand underline-offset-4 hover:underline">
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${site.phoneHref}`} className="font-medium text-brand underline-offset-4 hover:underline">
                {site.phone}
              </a>
              .
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              Or use the contact form →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
