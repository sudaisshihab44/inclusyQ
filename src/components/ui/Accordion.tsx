"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { tokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function Accordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="border-t border-mist-50/10">
      {faq.items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div key={item.id} className="border-b border-mist-50/10">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className={cn(
                  "flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200",
                  isOpen ? "text-mist-50" : "text-mist-100 hover:text-brand-200"
                )}
              >
                <span className="text-[1rem] font-semibold leading-snug">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200",
                    isOpen
                      ? "border-brand-400/40 bg-brand-400/10 text-brand-300"
                      : "border-mist-50/15 text-mist-300"
                  )}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : tokens.motion.fast, ease: tokens.motion.ease }}
                  >
                    <Plus size={15} />
                  </motion.span>
                </span>
              </button>
            </h3>

            {reduceMotion ? (
              isOpen ? (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="pb-6 pr-12"
                >
                  <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-mist-300">
                    {item.a}
                  </p>
                </div>
              ) : null
            ) : (
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: tokens.motion.base, ease: tokens.motion.ease }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-6 pr-12 text-[0.9375rem] leading-relaxed text-mist-300">
                      {item.a}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
