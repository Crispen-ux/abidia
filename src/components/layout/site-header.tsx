"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, Mail, ArrowRight, Calculator, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/config/site";
import { services } from "@/data/services";
import { cn } from "cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(true);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 w-full">
      {promoOpen && (
        <div className="relative bg-brand text-brand-foreground">
          <div className="container-site flex min-h-9 items-center justify-center gap-2 py-1.5 pr-8 text-center text-xs font-medium">
            <Calculator className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">
              Free client tools — estimate your project cost in seconds.
            </span>
            <Link
              href="/tools/estimate"
              className="hidden shrink-0 items-center gap-1 underline underline-offset-2 hover:opacity-80 sm:inline-flex"
            >
              Open estimator <ArrowRight className="size-3" />
            </Link>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setPromoOpen(false)}
              className="absolute right-1 rounded p-1 hover:bg-black/10"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="hidden border-b border-border/60 bg-muted/40 lg:block">
        <div className="container-site flex h-9 items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phoneHref}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Phone className="size-3.5" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Mail className="size-3.5" /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span>{site.hours}</span>
            <span className="text-brand">3 offices · Mpumalanga · KZN · Limpopo</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
        <div className="container-site flex h-16 items-center justify-between gap-3 sm:h-[68px]">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              aria-label={`Call ${site.phone}`}
              render={<a href={`tel:${site.phoneHref}`} />}
            >
              <Phone />
            </Button>
            <Button
              size="sm"
              className="hidden bg-brand text-brand-foreground hover:bg-brand/90 sm:inline-flex"
              render={<Link href="/contact" />}
            >
              Request a quote
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label="Open menu" />
                }
              >
                <Menu />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-sm gap-0 p-0 sm:max-w-sm"
                showCloseButton={false}
              >
                <SheetHeader className="border-b border-border px-4 py-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <Logo compact />
                    <SheetClose
                      render={
                        <Button variant="ghost" size="icon-sm" aria-label="Close menu" />
                      }
                    >
                      <X />
                    </SheetClose>
                  </div>
                </SheetHeader>

                <nav aria-label="Mobile" className="flex flex-col overflow-y-auto px-3 py-3">
                  {nav.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium",
                            isActive(item.href)
                              ? "bg-brand-subtle text-brand-subtle-foreground"
                              : "text-foreground hover:bg-muted"
                          )}
                        />
                      }
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-muted-foreground" />
                    </SheetClose>
                  ))}

                  <p className="eyebrow mt-5 px-3">Services</p>
                  <div className="mt-1 grid grid-cols-1 gap-0.5">
                    {services.map((service) => (
                      <SheetClose
                        key={service.slug}
                        render={
                          <Link
                            href={`/services/${service.slug}`}
                            className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                          />
                        }
                      >
                        {service.name}
                      </SheetClose>
                    ))}
                  </div>
                </nav>

                <div className="mt-auto border-t border-border p-4">
                  <div className="grid gap-2">
                    <Button
                      className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                      size="lg"
                      render={<Link href="/contact" />}
                    >
                      Request a quote
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      render={<a href={`tel:${site.phoneHref}`} />}
                    >
                      <Phone /> {site.phone}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
