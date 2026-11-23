import { ArrowDownRight, Clock3 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative overflow-hidden bg-ink"
    >
      <div className="container-page section-pad">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionIntro
                id="problem-heading"
                eyebrow="The problem"
                title={problem.title}
                intro={problem.intro}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mt-10 max-w-[19rem]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 -z-10 rotate-2 rounded-2xl border border-mist-50/10 bg-mist-50/[0.03]"
                />
                <div className="relative -rotate-2 rounded-md bg-[#E9E1D2] px-5 py-5 text-[#171512] shadow-[0_28px_60px_-24px_rgba(0,0,0,0.9)]">
                  <div className="flex items-center justify-between border-b border-[#171512]/15 pb-2">
                    <span className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[#171512]/70">
                      {problem.artifact.heading}
                    </span>
                    <span className="text-[0.625rem] font-bold text-[#171512]/70">
                      {problem.artifact.serial}
                    </span>
                  </div>
                  <p className="mt-4 font-display text-[3.4rem] font-medium leading-none tracking-[-0.06em]">
                    {problem.artifact.token}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-block -rotate-6 rounded-sm border-2 border-[#9E2F24] px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#9E2F24]">
                      {problem.artifact.status}
                    </span>
                    <span className="text-[0.625rem] text-[#171512]/70">
                      {problem.artifact.handWritten}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1 border-t border-dashed border-[#171512]/20 pt-3">
                    {problem.artifact.lines.map((line) => (
                      <li
                        key={line}
                        className="flex items-center justify-between text-[0.75rem] text-[#171512]/70"
                      >
                        <span>{line}</span>
                        <span aria-hidden="true">—</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <div className="surface overflow-hidden">
                <div className="flex items-center justify-between gap-4 border-b border-mist-50/10 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                    <p className="text-[0.8125rem] font-medium text-mist-200">
                      {problem.sceneLabel}
                    </p>
                  </div>
                  <p className="hidden text-[0.75rem] text-mist-500 sm:block">
                    {problem.sceneNote}
                  </p>
                </div>

                <ol className="divide-y divide-mist-50/8">
                  {problem.questions.map((item, index) => (
                    <li key={item.quote} className="px-5 py-5 sm:px-6">
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 text-[0.6875rem] tabular text-mist-500">
                          <Clock3 size={12} aria-hidden="true" />
                          {item.time}
                        </span>
                        <div>
                          <p className="font-display text-[1.15rem] font-medium italic leading-snug tracking-[-0.02em] text-mist-50 sm:text-[1.25rem]">
                            &ldquo;{item.quote}&rdquo;
                          </p>
                          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-mist-400">
                            {item.detail}
                          </p>
                        </div>
                        <span
                          aria-hidden="true"
                          className="ml-auto hidden text-[0.6875rem] tabular text-mist-500 sm:block"
                        >
                          0{index + 1}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="border-t border-mist-50/8 bg-mist-50/[0.025] px-5 py-4 sm:px-6">
                  <p className="flex items-center gap-2 text-[0.8125rem] text-mist-400">
                    <ArrowDownRight size={15} aria-hidden="true" className="text-amber" />
                    {problem.closing}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
