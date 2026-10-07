import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function CtaBand({
  eyebrow = "Start your project",
  title = "Tell us what you need built. We'll engineer it.",
  description = "Share your scope, drawings or simply a site address — our team responds within one business day with next steps and an indicative fee.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="section">
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#141418] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(70% 70% at 80% 20%, black, transparent)",
            }}
            aria-hidden
          />
          <div className="absolute -top-24 -right-16 size-72 rounded-full bg-brand/30 blur-3xl" aria-hidden />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
              <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{description}</p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button
                size="lg"
                className="h-12 bg-brand text-white hover:bg-brand/90"
                render={<Link href="/contact" />}
              >
                Request a quote <ArrowRight />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                render={<a href={`tel:${site.phoneHref}`} />}
              >
                <Phone /> {site.phone}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
