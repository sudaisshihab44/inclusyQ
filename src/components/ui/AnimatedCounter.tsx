"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { tokens } from "@/lib/tokens";

type AnimatedCounterProps = {
  value: number;
  pad?: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

export function AnimatedCounter({
  value,
  pad = 0,
  duration = 0.9,
  suffix,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: tokens.motion.ease,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [duration, inView, reduceMotion, value]);

  const finalValue = String(value).padStart(pad, "0");

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{finalValue}{suffix ?? ""}</span>
      <span aria-hidden="true">
        {String(display).padStart(pad, "0")}
        {suffix}
      </span>
    </span>
  );
}
