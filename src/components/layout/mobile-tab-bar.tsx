"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Wrench, Briefcase, MessageSquare } from "lucide-react";
import { cn } from "cn";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: LayoutGrid },
  { href: "/tools", label: "Tools", icon: Wrench, accent: true },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/contact", label: "Contact", icon: MessageSquare },
];

export function MobileTabBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-[10px] font-medium transition-colors",
                  active ? "text-brand" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-full transition-colors",
                    tab.accent && "bg-brand text-brand-foreground",
                    tab.accent && active && "ring-2 ring-brand/30 ring-offset-2 ring-offset-background",
                    !tab.accent && active && "bg-brand-subtle"
                  )}
                >
                  <Icon className="size-4" />
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
