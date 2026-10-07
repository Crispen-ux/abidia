import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyAbidia } from "@/components/sections/why-abidia";
import { AreasSection } from "@/components/sections/areas-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ToolsPromo } from "@/components/sections/tools-promo";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FeaturedProjects />
      <WhyAbidia />
      <AreasSection />
      <ProcessSection />
      <ToolsPromo />
      <CtaBand />
    </>
  );
}
