import { Check, Info, Ruler } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { impact } from "@/lib/content";

export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="relative overflow-hidden border-y border-mist-50/10 bg-forest"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full glow-brand-soft"
      />
      <div className="container-page section-pad relative">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
            <SectionIntro
              id="impact-heading"
              eyebrow="Impact"
              title={impact.title}
              intro={impact.intro}
            />
            <div className="lg:text-right">
              <ButtonLink href={impact.cta.href} icon>
                {impact.cta.label}
              </ButtonLink>
              <p className="mt-3 text-[0.75rem] text-mist-500">
                {impact.asideNote}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-mist-50/10 bg-mist-50/10 sm:grid-cols-3">
          {impact.facts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 0.06}>
              <div className="h-full bg-forest px-6 py-6 sm:px-7 sm:py-7">
                <div className="flex items-baseline gap-2">
                  <AnimatedCounter
                    value={fact.value}
                    pad={fact.pad}
                    className="font-display text-[clamp(3rem,5vw,4.4rem)] font-medium leading-none tracking-[-0.055em] text-brand-300 tabular"
                  />
                  <span className="text-[0.75rem] font-medium text-mist-500">
                    {fact.unit}
                  </span>
                </div>
                <p className="mt-3 font-display text-[1rem] font-medium tracking-[-0.02em] text-mist-100">
                  {fact.label}
                </p>
                <p className="mt-1.5 max-w-xs text-[0.8125rem] leading-relaxed text-mist-400">
                  {fact.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {impact.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-dashed border-mist-50/18 bg-forest-soft/60 p-5 sm:p-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-amber/20 bg-amber/8 px-2 py-1 text-[0.625rem] font-semibold text-amber">
                  <span className="h-1 w-1 rounded-full bg-amber" aria-hidden="true" />
                  {impact.awaiting}
                </span>
                <p className="mt-5 font-display text-[clamp(2.4rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.055em] text-mist-200 tabular">
                  {metric.placeholder}
                </p>
                <p className="mt-3 text-[0.875rem] font-semibold text-mist-100">
                  {metric.label}
                </p>
                <p className="mt-1.5 text-[0.75rem] leading-relaxed text-mist-500">
                  {metric.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-mist-50/10 bg-ink/40 px-5 py-4">
            <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-amber" />
            <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-mist-300">
              {impact.disclaimer}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 border-t border-mist-50/10 pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-2 text-[0.75rem] font-semibold text-brand-300">
                <Ruler size={14} aria-hidden="true" />
                {impact.measureTitle}
              </p>
              <p className="mt-4 max-w-sm text-[1.05rem] leading-relaxed text-mist-200">
                {impact.measureCopy}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ol className="border-t border-mist-50/10">
              {impact.measure.map((item, index) => (
                <Reveal key={item} delay={index * 0.04} role="listitem">
                  <div className="flex items-center gap-4 border-b border-mist-50/10 py-4">
                    <span className="font-display text-[0.75rem] font-semibold tabular text-brand-300">
                      0{index + 1}
                    </span>
                    <span className="text-[0.9375rem] text-mist-200">{item}</span>
                    <Check
                      size={14}
                      aria-hidden="true"
                      className="ml-auto text-mist-500"
                    />
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
