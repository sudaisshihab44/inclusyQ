"use client";

import { type AriaRole, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  role?: AriaRole;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  once = true,
  role,
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} data-reveal role={role}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal
      role={role}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.08, margin: "0px 0px -6% 0px" }}
      transition={{ duration: tokens.motion.reveal, delay, ease: tokens.motion.ease }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} data-reveal>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -4% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: tokens.motion.reveal, ease: tokens.motion.ease },
  },
};

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={revealItem}>
      {children}
    </motion.div>
  );
}
