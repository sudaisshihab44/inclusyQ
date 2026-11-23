import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  href?: string;
  label?: string;
};

export function Logo({
  className,
  href = "/",
  label = "InclusyQ home",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group inline-flex min-h-11 items-center rounded-lg transition-opacity hover:opacity-90",
        className
      )}
    >
      {/* The supplied lockup has a navy wordmark; this is the approved light-wordmark
          variant for dark surfaces, with the Q kept in brand blue. */}
      <img
        src="/inclusyq-lockup-light.svg"
        alt=""
        width={163}
        height={44}
        loading="eager"
        decoding="async"
        className="h-9 w-auto sm:h-11"
      />
    </Link>
  );
}
