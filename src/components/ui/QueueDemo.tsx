"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { MessageSquare, Pause, Play } from "lucide-react";
import { hero } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type QueueItem = (typeof hero.board.frames)[number]["next"][number];

function StateChip({ state }: { state: QueueItem["state"] }) {
  const styles = {
    next: "border-brand-400/30 bg-brand-400/10 text-brand-200",
    waiting: "border-mist-50/10 bg-mist-50/5 text-mist-300",
    priority: "border-amber/30 bg-amber/10 text-amber",
  } as const;

  const labels = hero.board.stateLabels;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[0.6875rem] font-semibold leading-none",
        styles[state]
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          state === "next" && "bg-brand-400",
          state === "waiting" && "bg-mist-400",
          state === "priority" && "bg-amber"
        )}
      />
      {labels[state]}
    </span>
  );
}

export function QueueDemo() {
  const boardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const inView = useInView(boardRef, { amount: 0.3 });
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [forceRun, setForceRun] = useState(false);

  const shouldRun =
    inView && !paused && !reduceMotion && (!hovered || forceRun);
  const staticStep = 2;
  const activeStep = reduceMotion ? staticStep : step;
  const frame = hero.board.frames[activeStep];

  function togglePlayback() {
    if (paused) {
      setPaused(false);
      setForceRun(true);
    } else {
      setPaused(true);
      setForceRun(false);
    }
  }

  useEffect(() => {
    if (!shouldRun) return;
    const interval = window.setInterval(() => {
      setStep((current) => (current + 1) % hero.board.frames.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [shouldRun]);

  const statusLabel = reduceMotion
    ? hero.board.static
    : paused || (hovered && !forceRun)
      ? hero.board.paused
      : hero.board.live;

  return (
    <div
      ref={boardRef}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setForceRun(false);
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-x-8 -top-10 -z-10 h-64 rounded-full glow-brand"
      />

      <div className="queue-shell overflow-hidden">
        <div className="flex flex-col items-start gap-3 border-b border-mist-50/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold tracking-[0.02em] text-mist-400">
              {hero.board.kicker}
            </p>
            <p className="mt-0.5 font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-mist-50">
              {hero.board.title}
              <span className="mt-0.5 block text-[0.75rem] font-normal tracking-normal text-mist-400 sm:ml-2 sm:mt-0 sm:inline">
                {hero.board.subtitle}
              </span>
            </p>
          </div>

          <div className="flex w-full items-center justify-between gap-2.5 sm:w-auto sm:shrink-0 sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-md border border-mist-50/10 bg-mist-50/5 px-2.5 py-2 text-[0.6875rem] font-semibold text-mist-300">
              <span
                className={cn("live-dot", reduceMotion && "opacity-60")}
                aria-hidden="true"
              />
              {statusLabel}
            </span>

            {!reduceMotion ? (
              <button
                type="button"
                onClick={togglePlayback}
                aria-pressed={paused}
                aria-label={paused ? hero.board.play : hero.board.pause}
                className="grid h-11 w-11 place-items-center rounded-md border border-mist-50/15 text-mist-200 transition-colors hover:border-brand-400/45 hover:text-brand-200"
              >
                {paused ? (
                  <Play size={15} aria-hidden="true" />
                ) : (
                  <Pause size={15} aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        <p className="sr-only">{hero.board.accessibleSummary}</p>

        <div aria-hidden="true" className="p-4 sm:p-5">
          <div className="queue-inner overflow-hidden">
            <div className="flex flex-col items-start gap-3 border-b border-mist-50/8 px-5 py-5 sm:flex-row sm:justify-between sm:gap-6 sm:px-6">
              <div className="min-w-0">
                <p className="text-[0.75rem] font-medium text-mist-400">
                  {hero.board.nowServing}
                </p>
                <div className="mt-2 h-[4.3rem] overflow-hidden sm:h-[5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={frame.now}
                      className="whitespace-nowrap font-display text-[clamp(3.4rem,5.6vw,5.4rem)] font-medium leading-none tracking-[-0.06em] text-brand-300 tabular"
                      initial={reduceMotion ? false : { y: 28, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={reduceMotion ? undefined : { y: -28, opacity: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : tokens.motion.base,
                        ease: tokens.motion.ease,
                      }}
                    >
                      {frame.now}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <p className="mt-2 text-[0.8125rem] font-medium text-mist-200">
                  {frame.doctor} <span className="text-mist-500">·</span>{" "}
                  <span className="text-brand-300">{frame.room}</span>
                </p>
              </div>

              <div className="w-full text-left sm:w-auto sm:text-right">
                <p className="text-[0.6875rem] font-medium text-mist-500">
                  {frame.clock}
                </p>
                <p className="mt-3 whitespace-nowrap text-[0.8125rem] font-medium text-mist-200">
                  {frame.queue}
                </p>
                <div className="mt-3 flex justify-start gap-1 sm:justify-end" aria-hidden="true">
                  {hero.board.frames.map((item, index) => (
                    <span
                      key={item.clock}
                      className={cn(
                        "h-1 w-4 rounded-full transition-colors duration-300",
                        index === activeStep ? "bg-brand-400" : "bg-mist-50/15"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="h-1 bg-mist-50/8">
              <motion.div
                className="h-full bg-brand-400"
                animate={{ width: `${frame.progress}%` }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: tokens.motion.ease,
                }}
              />
            </div>

            <div className="px-5 py-5 sm:px-6">
              <p className="text-[0.75rem] font-medium text-mist-400">
                {hero.board.upNext}
              </p>
              <ol className="mt-3 space-y-2">
                {frame.next.map((item) => (
                  <li
                    key={item.token}
                    className="flex min-h-11 items-center gap-3 rounded-lg border border-mist-50/8 bg-mist-50/[0.025] px-3 py-2.5"
                  >
                    <span className="font-display text-[1.0625rem] font-semibold tabular tracking-[-0.03em] text-mist-50">
                      {item.token}
                    </span>
                    <span className="text-[0.75rem] text-mist-400">
                      {item.meta}
                    </span>
                    <span className="ml-auto">
                      <StateChip state={item.state} />
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border-t border-mist-50/8 px-5 py-4 sm:px-6">
              <div className="relative min-h-[4.5rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={frame.notification}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{
                      duration: reduceMotion ? 0 : tokens.motion.base,
                      ease: tokens.motion.ease,
                    }}
                    className="flex items-start gap-3 rounded-lg border border-brand-400/20 bg-brand-400/[0.055] px-3.5 py-3"
                  >
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-brand-400/12 text-brand-300">
                      <MessageSquare size={15} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-[0.6875rem] font-semibold text-brand-200">
                          {hero.board.notificationLabel}
                        </span>
                        <span className="text-[0.625rem] text-mist-500">
                          {hero.board.notificationType}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[0.8125rem] leading-snug text-mist-200">
                        {frame.notification}
                      </span>
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-1 text-[0.6875rem] text-mist-500">
                {hero.board.sampleNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
