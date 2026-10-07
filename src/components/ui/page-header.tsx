import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-2xl leading-[1.12] font-semibold sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
      <Link href="/" className="hover:text-brand">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight className="size-3" />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; item?: string }[] }) {
  const list = [
    { "@type": "ListItem", position: 1, name: "Home", item: "/" },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.name,
      ...(item.item ? { item: item.item } : {}),
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: list,
        }),
      }}
    />
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string; jsonLdName?: string; jsonLdItem?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/40">
      <div className="absolute inset-0 grain opacity-60" aria-hidden />
      <div className="container-site relative py-10 sm:py-14 lg:py-16">
        {breadcrumbs && (
          <div className="mb-5">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 max-w-4xl text-3xl leading-[1.08] font-semibold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
      {breadcrumbs && (
        <BreadcrumbJsonLd
          items={breadcrumbs.map((b) => ({
            name: b.jsonLdName ?? b.label,
            item: b.jsonLdItem ?? b.href,
          }))}
        />
      )}
    </section>
  );
}
