import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { faq, site } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-ink">
      <div className="container-page section-pad">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionIntro id="faq-heading" eyebrow="FAQ" title={faq.title} intro={faq.intro} />

                <div className="surface mt-8 p-5 sm:p-6">
                  <h3 className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-mist-50">
                    {faq.contactTitle}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.875rem] leading-relaxed text-mist-400">
                    {faq.contactCopy}
                  </p>
                  <a
                    href="/#demo"
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] font-semibold text-brand-300 transition-colors hover:text-brand-200"
                  >
                    {faq.contactCta}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                  <p className="mt-4 border-t border-mist-50/10 pt-4 text-[0.75rem] text-mist-500">
                    {faq.emailPrefix}{" "}
                    <a
                      href={`mailto:${site.email}`}
                      className="text-mist-300 underline decoration-mist-50/25 underline-offset-4 transition-colors hover:text-brand-200"
                    >
                      {site.email}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <Accordion />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
