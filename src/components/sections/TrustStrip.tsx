import {
  ClipboardCheck,
  MessageSquare,
  Monitor,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { trust } from "@/lib/content";

const icons: Record<(typeof trust.items)[number]["icon"], LucideIcon> = {
  clipboard: ClipboardCheck,
  monitor: Monitor,
  message: MessageSquare,
  shield: ShieldCheck,
};

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="border-y border-mist-50/10 bg-ink-900"
    >
      <div className="container-page section-pad-tight">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="trust-heading"
              className="font-display text-[1.05rem] font-medium tracking-[-0.02em] text-mist-200"
            >
              {trust.lead}
            </h2>
            <p className="text-[0.75rem] text-mist-500">
              {trust.note}
            </p>
          </div>
        </Reveal>

        <ul className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {trust.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.05} role="listitem">
                <div className="flex gap-3.5">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-mist-50/10 bg-mist-50/[0.035] text-brand-300">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.875rem] font-semibold text-mist-100">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-mist-400">
                      {item.copy}
                    </span>
                  </span>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.12}>
          <div className="mt-9 flex flex-col gap-4 rounded-xl border border-dashed border-brand-400/20 bg-brand-400/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 live-dot" aria-hidden="true" />
              <div>
                <p className="text-[0.8125rem] font-semibold text-brand-200">
                  {trust.pilot.label}
                </p>
                <p className="mt-1 max-w-2xl text-[0.8125rem] leading-relaxed text-mist-400">
                  {trust.pilot.copy}
                </p>
              </div>
            </div>
            <ButtonLink
              href={trust.pilot.cta.href}
              variant="text"
              className="shrink-0 self-start px-0 sm:self-center"
              icon
            >
              {trust.pilot.cta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
