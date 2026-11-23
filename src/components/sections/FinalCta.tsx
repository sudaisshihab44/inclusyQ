import { Clock3, Mail, Map, ShieldCheck, type LucideIcon } from "lucide-react";
import { DemoForm } from "@/components/ui/DemoForm";
import { Reveal } from "@/components/ui/Reveal";
import { demo, site } from "@/lib/content";

const pointIcons: Record<(typeof demo.points)[number]["icon"], LucideIcon> = {
  clock: Clock3,
  map: Map,
  shield: ShieldCheck,
};

export function FinalCta() {
  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative overflow-hidden border-t border-mist-50/10 bg-ink-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 left-1/4 h-[36rem] w-[36rem] rounded-full glow-brand-soft"
      />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="container-page section-pad relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow-line">{demo.eyebrow}</p>
              <h2 id="demo-heading" className="type-section mt-4 text-mist-50">
                {demo.title}
              </h2>
              <p className="type-body-lg mt-5 max-w-lg text-mist-300">{demo.intro}</p>

              <ul className="mt-8 border-t border-mist-50/10">
                {demo.points.map((point) => {
                  const Icon = pointIcons[point.icon];
                  return (
                    <li
                      key={point.label}
                      className="flex items-center gap-3 border-b border-mist-50/10 py-4 text-[0.875rem] text-mist-200"
                    >
                      <Icon size={15} aria-hidden="true" className="text-brand-400" />
                      {point.label}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <p className="text-[0.8125rem] text-mist-500">{demo.emailPrompt}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-mist-100 underline decoration-mist-50/25 underline-offset-4 transition-colors hover:text-brand-200 hover:decoration-brand-400/60"
                >
                  <Mail size={15} aria-hidden="true" className="text-brand-400" />
                  {site.email}
                </a>
                <p className="mt-2 text-[0.75rem] text-mist-500">{demo.responseNote}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <DemoForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
