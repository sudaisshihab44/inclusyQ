import {
  Eye,
  HeartHandshake,
  Quote,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { pilot } from "@/lib/content";

const icons: Record<(typeof pilot.measures)[number]["icon"], LucideIcon> = {
  eye: Eye,
  users: Users,
  heart: HeartHandshake,
};

export function Pilot() {
  return (
    <section
      id="pilot"
      aria-labelledby="pilot-heading"
      className="border-y border-mist-50/10 bg-ink-900"
    >
      <div className="container-page section-pad">
        <Reveal>
          <SectionIntro
            id="pilot-heading"
            eyebrow="Pilot programme"
            title={pilot.title}
            intro={pilot.intro}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-brand-400/25 bg-forest/50 p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full glow-brand-soft"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.75rem] font-semibold text-mist-400">
                    {pilot.slotLabel}
                  </p>
                  <span className="inline-flex items-center gap-2 rounded-md border border-brand-400/25 bg-brand-400/8 px-2.5 py-1.5 text-[0.6875rem] font-semibold text-brand-200">
                    <span className="live-dot" aria-hidden="true" />
                    {pilot.status}
                  </span>
                </div>

                <Quote
                  size={40}
                  aria-hidden="true"
                  className="mt-8 text-brand-400/25"
                  strokeWidth={1.2}
                />

                <blockquote className="mt-2">
                  <p className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-medium italic leading-[1.15] tracking-[-0.035em] text-mist-200">
                    {pilot.quotePlaceholder}
                  </p>
                  <footer className="mt-6 border-t border-mist-50/10 pt-4">
                    <p className="text-[0.8125rem] text-mist-400">{pilot.attribution}</p>
                    <p className="mt-1 text-[0.75rem] text-mist-500">{pilot.slotNote}</p>
                  </footer>
                </blockquote>

                <div className="mt-auto flex items-center gap-2 pt-8">
                  <span className="h-px w-10 bg-brand-400/40" aria-hidden="true" />
                  <span className="text-[0.6875rem] text-mist-500">
                    {pilot.permissionNote}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="surface h-full p-6 sm:p-7">
                <h3 className="font-display text-[1.15rem] font-medium tracking-[-0.03em] text-mist-50">
                  {pilot.measuresTitle}
                </h3>
                <ul className="mt-5 border-t border-mist-50/10">
                  {pilot.measures.map((measure) => {
                    const Icon = icons[measure.icon];
                    return (
                      <li
                        key={measure.title}
                        className="flex gap-3.5 border-b border-mist-50/10 py-4 last:border-b-0 last:pb-0"
                      >
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-mist-50/10 bg-mist-50/[0.03] text-brand-300">
                          <Icon size={15} aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block text-[0.875rem] font-semibold text-mist-100">
                            {measure.title}
                          </span>
                          <span className="mt-1 block text-[0.8125rem] leading-relaxed text-mist-400">
                            {measure.copy}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-6">
                  <ButtonLink
                    href={pilot.cta.href}
                    variant="secondary"
                    className="w-full"
                    icon
                  >
                    {pilot.cta.label}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
