import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, UserCheck, FileText, Mail, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "POPIA Notice — How We Handle Your Personal Information",
  description:
    "Abidia Engineering's POPIA notice: what personal information we collect, why we process it, how it is protected, and the rights of data subjects under South Africa's Protection of Personal Information Act.",
  alternates: { canonical: "/popia" },
  openGraph: {
    title: `POPIA Notice | ${site.legalName}`,
    description: "How Abidia Engineering collects, uses and safeguards personal information under POPIA.",
    url: `${site.url}/popia`,
  },
};

const rights = [
  {
    title: "Right of access",
    body: "Ask us whether we hold any of your personal information, and request a copy of it.",
  },
  {
    title: "Right to correction",
    body: "Request that inaccurate, incomplete, misleading or out-of-date information be corrected or deleted.",
  },
  {
    title: "Right to deletion",
    body: "Request that we delete your personal information where it is no longer needed for the purpose it was collected.",
  },
  {
    title: "Right to object",
    body: "Object to the processing of your personal information — including for direct marketing — on reasonable grounds.",
  },
  {
    title: "Right to withdraw consent",
    body: "Withdraw any consent you have given, at any time, without affecting the lawfulness of processing before withdrawal.",
  },
  {
    title: "Right to complain",
    body: "Lodge a complaint with the Information Regulator (South Africa) if you believe your rights have been infringed.",
  },
];

export default function PopiaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal · Protection of Personal Information Act"
        title="POPIA notice"
        description={`How ${site.legalName} collects, uses, protects and destroys your personal information — and how to exercise your rights as a data subject.`}
        breadcrumbs={[{ label: "POPIA notice" }]}
      />

      <section className="section">
        <div className="container-site max-w-3xl">
          <div className="rounded-2xl border border-border bg-brand-subtle p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-subtle-foreground">
              <ShieldCheck className="size-4.5" /> Information Officer
            </p>
            <p className="mt-2 text-sm leading-relaxed text-brand-subtle-foreground/85">
              Our Information Officer is the head of the practice, <strong>{site.founder}</strong>{" "}
              (founder &amp; managing director). All POPIA requests and complaints may be directed to{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              or <a href={`tel:${site.phoneHref}`} className="font-medium underline underline-offset-4">{site.phone}</a>.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            <section>
              <h2 className="text-lg font-semibold">Why we process your information</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Under the Protection of Personal Information Act 4 of 2013 (POPIA) we may only
                process personal information for a lawful purpose. We process yours to respond to
                enquiries, prepare fee proposals and project briefs, deliver the engineering
                services you appoint us for, meet statutory and professional obligations (including
                ECSA and tax records), and keep our website and communication secure.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our lawful bases are performance of a contract, compliance with a legal obligation,
                our legitimate interests in running a consultancy, and your consent where we ask
                for it (for example, subscribing to updates).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">What we collect</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>— Your name, organisation, email address, phone number and physical address.</li>
                <li>— Information you include in an enquiry, project brief, WhatsApp message or CV.</li>
                <li>— Project information needed to design, tender or supervise works (plans, site details, professional team details).</li>
                <li>— Basic technical data from your browser needed to serve the site; we do not use advertising trackers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Who we share it with</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We share personal information only where it is necessary: with Abidia staff working
                on your project, with our delivery partner Smart Plans where they are appointed,
                with professional team members and contractors you have agreed to, and with our
                service providers (email, hosting and document storage) under written confidentiality
                obligations. We do not sell your information.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Cross-border transfer: where a project requires it — for example in Botswana —
                information may be transferred outside South Africa, but only to a destination with
                an adequate level of protection or with your consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Security and retention</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We take reasonable technical and organisational measures to prevent loss, theft and
                unauthorised access: access-controlled accounts, secure cloud storage and encrypted
                transport. Information is kept only as long as it is needed for the purpose it was
                collected for, or as long as legislation requires — project and financial records are
                retained for the statutory periods, after which it is securely destroyed or
                de-identified.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Your rights as a data subject</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {rights.map((right) => (
                  <div key={right.title} className="rounded-xl border border-border bg-card p-4">
                    <p className="text-sm font-semibold">{right.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {right.body}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                To exercise any of these rights, email{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-brand hover:underline">
                  {site.email}
                </a>{" "}
                with enough detail for us to identify you. We will respond within a reasonable time
                and in any case within the period required by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Complaints</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Please contact us first so we can try to resolve it. If you are not satisfied, you
                may lodge a complaint with the Information Regulator (South Africa) at{" "}
                <a
                  href="mailto:complaints@inforegulator.org.za"
                  className="font-medium text-brand hover:underline"
                >
                  complaints@inforegulator.org.za
                </a>{" "}
                or on{" "}
                <a
                  href="https://www.inforegulator.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand hover:underline"
                >
                  www.inforegulator.org.za
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            <Link
              href="/privacy"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-brand"
            >
              <span className="flex items-center gap-2">
                <FileText className="size-4 text-brand" /> Privacy policy
              </span>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-brand" />
            </Link>
            <Link
              href="/terms"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-brand"
            >
              <span className="flex items-center gap-2">
                <FileText className="size-4 text-brand" /> Terms of use
              </span>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-brand" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium hover:border-brand"
            >
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-brand" /> Email the Information Officer
              </span>
              <ArrowRight className="size-4 text-muted-foreground group-hover:text-brand" />
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <UserCheck className="mt-0.5 size-3.5 shrink-0" />
            This notice is specific to {site.legalName} and should be read together with our
            privacy policy. It may be updated when our practices or the law change; the latest
            version is always published on this page.
          </p>
        </div>
      </section>
    </>
  );
}
