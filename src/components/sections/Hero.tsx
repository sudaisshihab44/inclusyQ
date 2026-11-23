import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { QueueDemo } from "@/components/ui/QueueDemo";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-ink"
    >
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full glow-brand-soft"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mist-50/10 to-transparent"
      />

      <div className="container-page relative pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-12 xl:gap-10">
          <div className="min-w-0 max-w-[42rem] xl:col-span-7">
            <p className="hero-fade inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-mist-300">
              <span className="live-dot" aria-hidden="true" />
              {hero.status}
            </p>

            <h1 id="hero-heading" className="type-hero mt-6 text-mist-50">
              <span className="sr-only">{hero.headline.join(" ")}</span>
              {hero.headline.map((line, index) => (
                <span key={line} aria-hidden="true" className="hero-line-mask">
                  <span className="hero-line">
                    <span className="hero-line-wide">{hero.headlineWide[index]}</span>
                    <span className="hero-line-compact">{line}</span>
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-fade hero-delay-1 type-body-lg mt-6 max-w-[35rem] text-mist-300">
              {hero.intro}
            </p>

            <div className="hero-fade hero-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={hero.primaryCta.href} icon>
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            <ul className="hero-fade hero-delay-3 mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-mist-50/10 pt-6 sm:mt-12">
              {hero.meta.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[0.8125rem] text-mist-300"
                >
                  <Check size={14} aria-hidden="true" className="text-brand-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-board w-full min-w-0 max-w-[38rem] xl:col-span-5 xl:ml-auto">
            <QueueDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
