"use client";

import { type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "li";
};

export function SpotlightCard({
  children,
  className,
  as: Tag = "article",
}: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      className={cn("spotlight-card", className)}
      onPointerMove={handlePointerMove}
    >
      {children}
    </Tag>
  );
}
