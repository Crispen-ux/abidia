import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { QuantityCalculator } from "@/components/tools/quantity-calculator";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Quantity Calculator — Concrete, Asphalt & Earthworks",
  description:
    "Free construction quantity calculator: concrete volumes, cement and aggregate requirements, asphalt tonnage, bulk excavation volumes and indicative material costs.",
  alternates: { canonical: "/tools/calculator" },
  openGraph: {
    title: `Quantity Calculator | ${site.name}`,
    description: "Concrete, road surface and earthworks quantities in seconds.",
    url: `${site.url}/tools/calculator`,
  },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool 02 · Quantities"
        title="Measure once. Order right."
        description="Enter your site dimensions and get orderable quantities for concrete, road surfacing and bulk earthworks — with indicative material costs."
        breadcrumbs={[
          { label: "Client Tools", href: "/tools" },
          { label: "Quantity calculator" },
        ]}
      />

      <section className="section">
        <div className="container-site">
          <QuantityCalculator />
        </div>
      </section>

      <CtaBand
        eyebrow="Design support"
        title="Need the design behind the quantities?"
        description="Our engineers size the structure, pavement or network properly — then certify quantities for tender and payment."
      />
    </>
  );
}
