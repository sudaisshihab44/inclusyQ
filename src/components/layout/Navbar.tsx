"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const next = window.scrollY > 8;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setScrolled(next);
      }
      if (window.scrollY < 120) {
        setActive((current) => (current === null ? current : null));
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }

    const navSections = new Set<string>(nav.links.map((link) => link.section));
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(
              navSections.has(entry.target.id) ? entry.target.id : null
            );
          }
        }
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    lastFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const getMenuItems = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const items = getMenuItems();
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      } else if (!panelRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const firstLink = panelRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (lastFocusRef.current?.isConnected) lastFocusRef.current.focus();
      lastFocusRef.current = null;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-mist-50/10 bg-ink/92 backdrop-blur-md supports-[backdrop-filter]:bg-ink/85"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-page flex min-h-18 items-center justify-between gap-6">
        <Logo label={nav.home} />

        <nav aria-label={nav.menu.label} className="hidden items-center gap-1 lg:flex">
          {nav.links.map((link) => {
            const isCurrent = active === link.section;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "location" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-lg px-3 text-[0.875rem] font-medium transition-colors duration-200",
                  isCurrent
                    ? "text-mist-50"
                    : "text-mist-300 hover:text-mist-50"
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 bottom-1 h-px origin-left bg-brand-400 transition-transform duration-300",
                    isCurrent ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={nav.cta.href} className="btn btn-primary">
            {nav.cta.label}
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="mobile-menu"
          aria-label={open ? nav.menu.close : nav.menu.open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-mist-50/15 text-mist-100 transition-colors hover:border-brand-400/50 hover:text-brand-200 lg:hidden"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="region"
          aria-label={nav.menu.mobileLabel}
          className="border-t border-mist-50/10 bg-ink/95 backdrop-blur-md lg:hidden"
        >
          <nav aria-label={nav.menu.mobileLabel} className="container-page py-5">
            <ul className="flex flex-col">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-lg px-2 text-base font-medium text-mist-200 transition-colors hover:bg-mist-50/5 hover:text-mist-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-4 w-full"
            >
              {nav.cta.label}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
