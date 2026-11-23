import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { legal, site } from "@/lib/content";

export const metadata: Metadata = {
  title: legal.terms.title,
  description: "The terms that apply to the InclusyQ marketing website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const content = legal.terms;

  return (
    <div className="container-page section-pad">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-[0.875rem] text-mist-400 transition-colors hover:text-brand-200"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {legal.backToHome}
        </Link>
        <h1 className="type-section mt-6 text-mist-50">{content.title}</h1>
        <p className="mt-4 text-[0.8125rem] text-mist-500">{content.updated}</p>
        <p className="type-body-lg mt-8 max-w-2xl text-mist-300">{content.intro}</p>

        <div className="prose-legal mt-6">
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-mist-50/10 pt-6">
          <p className="text-[0.875rem] text-mist-400">
            {content.contactPrompt}{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-mist-100 underline decoration-mist-50/25 underline-offset-4 transition-colors hover:text-brand-200"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
