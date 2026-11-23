import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
  className?: string;
  icon?: boolean;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon = false,
  external,
}: ButtonLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:)/.test(href);

  return (
    <a
      href={href}
      className={cn(
        "btn",
        variant === "primary" && "btn-primary",
        variant === "secondary" && "btn-secondary",
        variant === "text" && "btn-text",
        className
      )}
      target={isExternal && href.startsWith("http") ? "_blank" : undefined}
      rel={isExternal && href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
      {icon ? <ArrowRight size={16} aria-hidden="true" /> : null}
      {isExternal && href.startsWith("http") ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
