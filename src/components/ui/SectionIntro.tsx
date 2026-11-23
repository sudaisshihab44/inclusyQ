import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
  introClassName?: string;
};

export function SectionIntro({
  title,
  intro,
  id,
  eyebrow,
  align = "left",
  className,
  introClassName,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <p className={cn("eyebrow-line", align === "center" && "justify-center")}>{eyebrow}</p> : null}
      <h2 id={id} className={cn("type-section text-mist-50", eyebrow && "mt-4")}>
        {title}
      </h2>
      {intro ? (
        <p className={cn("type-body-lg mt-5 max-w-2xl text-mist-300", align === "center" && "mx-auto", introClassName)}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
