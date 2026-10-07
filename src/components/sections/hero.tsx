import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { services } from "@/data/services";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#141418] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-building.jpg"
          alt="Structural frame of a multi-storey building designed by Abidia Engineering"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 contrast-125 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141418]/85 via-[#141418]/70 to-[#141418]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,rgba(155,57,58,0.35),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 80%)",
          }}
          aria-hidden
        />
      </div>

      <div className="container-site relative pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
            <span className="size-1.5 rounded-full bg-brand" />
            Est. {site.founded} · Civil &amp; Structural Engineers ɛ Project Managers
          </p>

          <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Engineering that keeps{" "}
            <span className="text-brand">communities</span> moving.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            From municipal infrastructure and roads to structures, water, traffic and town
            planning — Abidia delivers multidisciplinary engineering across South Africa and
            Botswana, on time and to specification.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 w-full bg-brand text-white hover:bg-brand/90 sm:w-auto"
              render={<Link href="/tools/brief" />}
            >
              Build your project brief <ArrowRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
              render={<Link href="/services" />}
            >
              Explore services
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 w-full text-white/80 hover:bg-white/10 hover:text-white sm:w-auto"
              render={<a href={`tel:${site.phoneHref}`} />}
            >
              <Phone /> {site.phone}
            </Button>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label} className="bg-[#141418]/80 px-4 py-4 backdrop-blur">
                <dt className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {site.offices.map((office) => (
            <a
              key={office.label}
              href={office.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-colors hover:border-brand/60"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="text-sm">
                <span className="block font-medium text-white">{office.label}</span>
                <span className="block text-white/60 group-hover:text-white/80">
                  {office.street}, {office.city}
                </span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-white/40">
            {services.length} disciplines, one team
          </span>
          <div className="hidden h-px flex-1 bg-white/10 sm:block" />
        </div>
      </div>
    </section>
  );
}
