"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import {
  AdminPanel,
  FrontDeskPanel,
  PatientPhone,
} from "@/components/ui/ProductMockups";
import { roles } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const visuals = [AdminPanel, FrontDeskPanel, PatientPhone];

export function RoleViews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeRole = roles.tabs[activeIndex];
  const Visual = visuals[activeIndex];

  function selectTab(index: number) {
    setActiveIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = roles.tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") nextIndex = index === 0 ? last : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = last;

    if (nextIndex !== null) {
      event.preventDefault();
      selectTab(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <section id="roles" aria-labelledby="roles-heading" className="bg-ink">
      <div className="container-page section-pad">
        <Reveal>
          <SectionIntro
            id="roles-heading"
            eyebrow="Role views"
            title={roles.title}
            intro={roles.intro}
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div
            role="tablist"
            aria-label={roles.tablistLabel}
            className="mt-8 inline-flex w-full gap-1 rounded-xl border border-mist-50/10 bg-ink-900 p-1 sm:w-auto"
          >
            {roles.tabs.map((tab, index) => {
              const selected = activeIndex === index;
              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`role-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="role-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    "relative min-h-11 flex-1 whitespace-nowrap rounded-lg px-2 text-[0.8125rem] font-semibold transition-colors duration-200 sm:flex-none sm:px-4 sm:text-[0.875rem]",
                    selected ? "text-ink" : "text-mist-300 hover:text-mist-50"
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="role-tab-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-brand-400"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: tokens.motion.base, ease: tokens.motion.ease }
                      }
                    />
                  ) : null}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-4 rounded-2xl border border-mist-50/10 bg-ink-900 p-4 sm:p-6 lg:p-8">
          <div
            role="tabpanel"
            id="role-panel"
            aria-labelledby={`role-tab-${activeRole.id}`}
            tabIndex={0}
            className="min-h-[30rem] rounded-xl focus-visible:outline-offset-4 lg:min-h-[28rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeRole.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{
                  duration: reduceMotion ? 0 : tokens.motion.base,
                  ease: tokens.motion.ease,
                }}
                className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <p className="inline-flex items-center gap-2 rounded-md border border-mist-50/10 bg-mist-50/[0.03] px-2.5 py-1.5 text-[0.6875rem] font-semibold text-mist-400">
                    <span className="live-dot" aria-hidden="true" />
                    {roles.sample}
                  </p>
                  <h3 className="type-subsection mt-4 text-mist-50">
                    {activeRole.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist-300">
                    {activeRole.body}
                  </p>
                  <ul className="mt-6 border-t border-mist-50/10">
                    {activeRole.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 border-b border-mist-50/10 py-3.5 text-[0.875rem] text-mist-200"
                      >
                        <Check size={14} aria-hidden="true" className="shrink-0 text-brand-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-7">
                  <div
                    className={cn(
                      "rounded-xl border border-mist-50/8 bg-ink p-3 sm:p-4",
                      activeRole.id === "patient" && "flex items-center justify-center"
                    )}
                  >
                    <div className="w-full">
                      <Visual />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
