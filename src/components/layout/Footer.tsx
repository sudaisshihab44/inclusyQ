import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { footer, nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] text-mist-300 transition-colors hover:text-brand-200";

  if (href.startsWith("/#") || href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {label}
      {external ? (
        <ArrowUpRight size={14} aria-hidden="true" className="text-mist-500" />
      ) : null}
      {external ? <span className="sr-only"> ({nav.externalNote})</span> : null}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-mist-50/10 bg-ink-950">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
          <div>
            <Logo label={site.name + " home"} />
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-mist-300">
              {footer.blurb}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-mist-100 underline decoration-mist-50/25 underline-offset-4 transition-colors hover:text-brand-200 hover:decoration-brand-400/60"
            >
              <Mail size={16} aria-hidden="true" className="text-brand-400" />
              {site.email}
            </a>
            <p className="mt-4 flex w-fit items-center gap-2 text-[0.8125rem] text-mist-400">
              <span className="live-dot" aria-hidden="true" />
              {footer.statusLabel}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-display text-[0.8125rem] font-semibold text-mist-400">
                  {column.title}
                </h2>
                <ul className="mt-2">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <FooterLink
                        href={link.href}
                        label={link.label}
                        external={"external" in link ? link.external : undefined}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          className={cn(
            "mt-14 flex flex-col gap-4 border-t border-mist-50/10 pt-6",
            "sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <p className="text-[0.75rem] text-mist-500">{footer.copyright}</p>
          <div className="flex items-center gap-6">
            <p className="text-[0.75rem] text-mist-500">{footer.made}</p>
            <a
              href="#main"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg text-[0.75rem] text-mist-400 transition-colors hover:text-brand-200"
            >
              {footer.backToTop}
              <ArrowUp size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
