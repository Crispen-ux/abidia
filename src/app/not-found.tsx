import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export default function NotFound() {
  return (
    <section className="section flex min-h-[70vh] items-center">
      <div className="container-site max-w-2xl">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
          This route was never surveyed.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist or has moved. Try one of the links below, or
          get in touch and we will point you in the right direction.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="bg-brand text-brand-foreground hover:bg-brand/90" render={<Link href="/" />}>
            <Compass /> Back to home
          </Button>
          <Button variant="outline" render={<Link href="/projects" />}>
            View projects <ArrowRight />
          </Button>
          <Button variant="outline" render={<Link href="/contact" />}>
            Contact us <ArrowRight />
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Or call{" "}
          <a href={`tel:${site.phoneHref}`} className="font-medium text-brand underline-offset-4 hover:underline">
            {site.phone}
          </a>{" "}
          · Mon–Fri 08:00–17:00
        </p>
      </div>
    </section>
  );
}
