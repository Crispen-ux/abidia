import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { site } from "@/config/site";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg bg-white px-2 py-1.5 ring-1 ring-black/5 transition-shadow hover:shadow-sm",
        className
      )}
    >
      <Image
        src="/images/logos/Abidia logo.png"
        alt={`${site.legalName} logo`}
        width={329}
        height={74}
        priority
        className={cn("h-auto w-[104px] sm:w-[124px]", compact && "w-[92px]")}
      />
      {!compact && (
        <span className="hidden border-l border-black/10 pl-2.5 text-[10px] leading-[1.25] font-medium tracking-wide text-neutral-500 sm:block lg:max-w-[7.5rem]">
          {site.tagline}
        </span>
      )}
    </Link>
  );
}
