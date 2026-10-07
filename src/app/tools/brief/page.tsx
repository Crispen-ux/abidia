import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { BriefBuilder } from "@/components/tools/brief-builder";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Brief Builder — Scope Your Engineering Project",
  description:
    "Answer four quick steps to build a structured engineering project brief and send it straight to Abidia's team via WhatsApp or email.",
  alternates: { canonical: "/tools/brief" },
  openGraph: {
    title: `Project Brief Builder | ${site.name}`,
    description: "Build a structured project brief in four steps and send it to our team.",
    url: `${site.url}/tools/brief`,
  },
};

export default async function BriefPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="Tool 03 · Brief builder"
        title="Scope your project in four steps"
        description="A structured brief helps us respond faster with a realistic fee and programme. Answer a few questions, review the summary and send it straight to our team."
        breadcrumbs={[
          { label: "Client Tools", href: "/tools" },
          { label: "Brief builder" },
        ]}
      />

      <section className="section">
        <div className="container-site">
          <BriefBuilder initialService={service} />
        </div>
      </section>

      <CtaBand
        eyebrow="Talk to a director"
        title="Prefer a conversation first?"
        description={`Call Abraham and the team on ${site.phone} — Mon to Fri, 08:00–17:00. We will help you scope it properly.`}
      />
    </>
  );
}
