import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Download, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
import { Logo } from "@/components/logo";
import { footerNav, site } from "@/config/site";
import { clients } from "@/data/projects";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="container-site grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.shortDescription} Established in {site.founded} by {site.founder}.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={`tel:${site.phoneHref}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:border-brand hover:text-brand"
            >
              <Phone className="size-4 text-brand" /> {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium hover:border-brand hover:text-brand"
            >
              <Mail className="size-4 text-brand" /> {site.email}
            </a>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-9 place-items-center rounded-lg border border-border bg-background hover:border-brand hover:text-brand"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-9 place-items-center rounded-lg border border-border bg-background hover:border-brand hover:text-brand"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href="/downloads/abidia-company-profile-2024.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand bg-brand px-3 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90"
            >
              <Download className="size-4" /> Company profile
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold">Offices</h3>
          <ul className="mt-3 space-y-4">
            {site.offices.map((office) => (
              <li key={office.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  <Link href={`/areas/${office.area}`} className="hover:underline">
                    {office.label}
                  </Link>
                </p>
                <a
                  href={office.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>
                    {office.street}
                    {office.suburb ? `, ${office.suburb}` : ""}
                    <br />
                    {office.city}, {office.province}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4 text-brand" /> {site.hours}
          </p>
        </div>
      </div>

      <div className="border-t border-border/70 bg-background">
        <div className="container-site py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pb-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Accredited &amp; trusted by
            </span>
            {site.credentials.map((cred) => (
              <div key={cred.short} className="flex items-center gap-2">
                <Image src={cred.logo} alt={cred.label} width={120} height={40} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {new Date().getFullYear()} {site.legalName}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy policy
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
              <a
                href="/downloads/abidia-company-profile-2024.pdf"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                Profile PDF <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground/70">
            Selected clients: {clients.slice(0, 12).join(" · ")} and others.
          </p>
        </div>
      </div>
    </footer>
  );
}

