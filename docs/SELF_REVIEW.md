# Self-review — InclusyQ landing page

Checked November 2026 against the production build (`npm run build` + `npm run start`) and the dev build.

## Automated results

| Check | Result |
|---|---|
| axe-core WCAG 2.0/2.1/2.2 A/AA — home | **0 violations** |
| axe-core — privacy page | **0 violations** |
| axe-core — terms page | **0 violations** |
| Lighthouse — performance | **98** |
| Lighthouse — accessibility | **100** |
| Lighthouse — best practices | **100** |
| Lighthouse — SEO | **100** |
| LCP (local desktop lab) | **1.9 s** |
| CLS | **0** |
| Total blocking time | **100 ms** |
| Speed index | **1.9 s** |

Lighthouse was run locally with headless Chrome against the production server. These are lab numbers, not field data, and they vary run to run (an earlier pass scored 99 performance with a 1.0 s LCP). Re-run on the deployed URL and on a throttled mobile profile before launch.

## Layout and responsive

- [x] Tested at **320, 360, 768, 1024, 1440 px**.
- [x] `scrollWidth === innerWidth` at every width; no horizontal scroll.
- [x] Mobile-first layout; the hero stacks and the queue console becomes full-width.
- [x] Bento grid collapses from 12 columns to 2 at tablet and 1 at mobile.
- [x] Touch targets: all tested interactive controls are at least 44×44px (17 controls checked at 360px).
- [x] Sticky nav does not cover anchored section headings (`scroll-margin-top: 6.5rem`).
- [x] No content depends on hover; hover only adds the spotlight/pause affordances.

## Keyboard and interaction

- [x] First Tab reveals a visible **Skip to content** link.
- [x] Nav links, footer links, CTAs and inputs are in a logical DOM order.
- [x] Mobile menu: focus moves into the panel, Escape closes it and returns focus to the trigger.
- [x] Role tabs: ArrowLeft/ArrowRight/Home/End move selection; roving tabindex; panel correctly labelled.
- [x] FAQ: native buttons, `aria-expanded` and `aria-controls`, Enter/Space work.
- [x] Queue demo: pause/play with `aria-pressed`; pauses on hover; auto-pauses offscreen; does not run under reduced motion.
- [x] Form: empty submit focuses the first invalid field; invalid email shows an inline error and returns focus; error space is reserved so controls never shift under the click.
- [x] Form success and preview states are announced with `role="status"` and receive focus.
- [x] Focus is always visible (2px brand-blue ring, 3px offset).

## Reduced motion

- [x] `prefers-reduced-motion: reduce` emulation: queue stays on a static "A-104 now serving" state, pause button is not rendered, counters render their final values, stepper shows the completed path.
- [x] CSS entrance animations and pulse dots are disabled.
- [x] Content remains complete and readable; no information is conveyed by motion alone.

## Contrast and readability

- [x] All text meets 4.5:1 minimum; large display text meets 3:1. axe reports no contrast failures.
- [x] Muted text token was raised to `#7F9187` (5.2–6.0:1 depending on surface).
- [x] Paper-token small text was darkened to pass 4.5:1.
- [x] Body line-height 1.65–1.7; line lengths generally under 80 characters.
- [x] No emoji used as icons; icons are Lucide SVGs and decorative icons are `aria-hidden`.
- [x] Sample data labels are visible and not hidden behind hover.

## Forms and no-dead-end behaviour

- [x] Client and server use the same validation module (`src/lib/demo.ts`).
- [x] Server returns 422 with per-field errors; invalid requests cannot send.
- [x] Honeypot field is hidden from users and assistive tech.
- [x] No delivery service configured: the UI clearly says nothing was sent and offers a prefilled mailto fallback.
- [x] Resend or webhook configured: normal success state.
- [x] Network/server failure: error message with a direct email fallback and retry path.

## Resilience

- [x] JavaScript disabled: hero and section content remain visible through the `noscript` reveal style.
- [x] No-JS: hero and section content remain visible through noscript styles.
- [x] No hydration errors or console errors in the final browser run.
- [x] No broken internal links; `/privacy` and `/terms` return 200; all hash targets exist.
- [x] `robots.txt`, `sitemap.xml` and the OG image return 200.

## SEO

- [x] One H1; logical H2/H3 order.
- [x] Title, description, canonical, Open Graph and Twitter metadata set.
- [x] `Organization`, `WebSite`, `SoftwareApplication` and `FAQPage` JSON-LD present (6 FAQ entries).
- [x] Semantic landmarks: banner, main, contentinfo, nav labels.
- [x] Social image is 1200×630 PNG.

## Still to verify with the client

- [ ] Real stats, pilot hospital names and approved quotes (currently bracketed placeholders).
- [ ] Verified public phone number and final contact email.
- [x] Final logo files applied: Design 1 header/footer lockup, Design 4 app icon.
- [x] Off-white wordmark variant used on dark surfaces; Q kept in brand blue.
- [ ] Real Resend sender domain or CRM webhook destination.
- [ ] Screen-reader pass with NVDA (Windows) and VoiceOver (macOS/iOS) on the final deployed build.
- [ ] Real-device pass on iOS Safari and Android Chrome.
- [ ] 200% browser zoom and Windows High Contrast mode. Reflow at 320 CSS px passes; text-only zoom has not been checked in a real browser.
- [ ] Throttled mobile Lighthouse run against the deployed URL.
