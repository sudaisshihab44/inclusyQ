"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  Activity,
  ClipboardCheck,
  Megaphone,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { how } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const stepIcons: Record<(typeof how.steps)[number]["icon"], LucideIcon> = {
  clipboard: ClipboardCheck,
  ticket: Ticket,
  activity: Activity,
  megaphone: Megaphone,
};

export function HowItWorks() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 62%", "end 55%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduceMotion) return;
    const next = Math.min(
      how.steps.length - 1,
      Math.max(0, Math.floor(latest * how.steps.length))
    );
    setActive((current) => (current === next ? current : next));
  });

  const activeIndex = reduceMotion ? how.steps.length - 1 : active;
  const current = how.steps[activeIndex];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative border-y border-mist-50/10 bg-ink-900"
    >
      <div className="container-page section-pad">
        <Reveal>
          <SectionIntro
            id="how-heading"
            eyebrow="How it works"
            title={how.title}
            intro={how.intro}
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute bottom-3 left-[1.375rem] top-3 w-px bg-mist-50/10"
              />
              <motion.div
                aria-hidden="true"
                className="absolute bottom-3 left-[1.375rem] top-3 w-px origin-top bg-brand-400"
                style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
              />

              <ol ref={stepsRef} className="space-y-0">
                {how.steps.map((step, index) => {
                  const Icon = stepIcons[step.icon];
                  const isActive = index === activeIndex;
                  const isPast = index < activeIndex;
                  return (
                    <li
                      key={step.n}
                      aria-current={isActive ? "step" : undefined}
                      className="relative pb-12 pl-16 last:pb-0 sm:pl-20"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-0 top-0 z-10 grid h-11 w-11 place-items-center rounded-full border font-display text-[0.75rem] font-semibold transition-colors duration-300",
                          isActive
                            ? "border-brand-400 bg-brand-400 text-ink"
                            : isPast
                              ? "border-brand-400/40 bg-ink text-brand-300"
                              : "border-mist-50/15 bg-ink text-mist-400"
                        )}
                      >
                        {step.n}
                      </span>

                      <div className="flex items-center gap-2">
                        <Icon
                          size={14}
                          aria-hidden="true"
                          className={isActive ? "text-brand-300" : "text-mist-500"}
                        />
                        <p className="text-[0.75rem] font-medium text-mist-500">
                          {how.stepPrefix} {step.n}
                        </p>
                      </div>
                      <h3 className="type-subsection mt-2 text-mist-50">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[34rem] text-[1rem] leading-relaxed text-mist-200">
                        {step.copy}
                      </p>
                      <p className="mt-2 max-w-[34rem] text-[0.875rem] leading-relaxed text-mist-400">
                        {step.detail}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-2.5 rounded-md border border-mist-50/10 bg-mist-50/[0.03] px-3 py-2 lg:hidden">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isActive ? "bg-brand-400" : "bg-mist-500"
                          )}
                        />
                        <span className="text-[0.75rem] font-semibold text-mist-200">
                          {step.state}
                        </span>
                        <span className="text-[0.6875rem] text-mist-500">
                          {step.meta}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <div
                  aria-hidden="true"
                  className="surface relative overflow-hidden p-6"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full glow-brand"
                  />
                  <div className="flex items-center justify-between gap-4">
                    <p className="type-label">{how.tokenLabel}</p>
                    <span className="inline-flex items-center gap-2 rounded-md border border-brand-400/25 bg-brand-400/8 px-2.5 py-1.5 text-[0.6875rem] font-semibold text-brand-200">
                      <span className="live-dot" />
                      {how.liveState}
                    </span>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-[0.8125rem] text-mist-400">{how.sampleDepartment}</p>
                    <p className="type-token mt-2">{how.tokenId}</p>
                    <p className="mt-2 text-[0.75rem] text-mist-500">
                      {how.sampleDoctorRoom}
                    </p>
                  </div>

                  <div className="relative my-6 border-t border-dashed border-mist-50/15">
                    <span className="absolute -left-8 -top-2 h-4 w-4 rounded-full bg-ink-900" />
                    <span className="absolute -right-8 -top-2 h-4 w-4 rounded-full bg-ink-900" />
                  </div>

                  <ol className="space-y-3">
                    {how.stages.map((stage, index) => {
                      const complete = index < activeIndex;
                      const currentStage = index === activeIndex;
                      return (
                        <li
                          key={stage}
                          className={cn(
                            "flex items-center gap-3 text-[0.8125rem] transition-colors duration-300",
                            currentStage
                              ? "font-semibold text-brand-200"
                              : complete
                                ? "text-mist-300"
                                : "text-mist-500"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "grid h-4 w-4 place-items-center rounded-full border",
                              currentStage
                                ? "border-brand-400 bg-brand-400"
                                : complete
                                  ? "border-brand-400/50 bg-brand-400/20"
                                  : "border-mist-50/15"
                            )}
                          >
                            {currentStage ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                            ) : null}
                          </span>
                          {stage}
                        </li>
                      );
                    })}
                  </ol>

                  <div className="mt-6 min-h-[6rem] rounded-lg border border-mist-50/10 bg-ink px-4 py-3.5">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeIndex}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={{
                          duration: reduceMotion ? 0 : tokens.motion.fast,
                          ease: tokens.motion.ease,
                        }}
                      >
                        <p className="text-[0.6875rem] text-mist-500">{how.currentState}</p>
                        <p className="mt-1 font-display text-[1.5rem] font-medium tracking-[-0.03em] text-mist-50">
                          {current.state}
                        </p>
                        <p className="mt-0.5 text-[0.75rem] text-mist-400">
                          {current.meta}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p className="mt-4 text-[0.75rem] leading-relaxed text-mist-500">
                    {how.tokenNote}
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
