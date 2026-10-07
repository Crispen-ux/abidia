import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Estimator } from "@/components/tools/estimator";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Project Cost Estimator — Free Engineering Budget Tool",
  description:
    "Get an instant indicative construction budget or professional fee range for municipal, road, structural, water, traffic, planning and environmental projects in South Africa.",
  alternates: { canonical: "/tools/estimate" },
  openGraph: {
    title: `Project Cost Estimator | ${site.name}`,
    description: "Indicative construction budgets and professional fees in seconds.",
    url: `${site.url}/tools/estimate`,
  },
};

export default function EstimatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool 01 · Cost estimator"
        title="What will your project cost?"
        description="Select a discipline, size and region to get an indicative budget range based on Abidia's delivered project values and current South African construction rates."
        breadcrumbs={[
          { label: "Client Tools", href: "/tools" },
          { label: "Cost estimator" },
        ]}
      />

      <section className="section">
        <div className="container-site">
          <Estimator />
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Want a real number? Send us your brief."
        description="Estimates are a starting point. Share your scope and site — we will respond within one business day with an indicative fee and programme."
      />
    </>
  );
}
