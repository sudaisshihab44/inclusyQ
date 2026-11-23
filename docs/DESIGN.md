# InclusyQ landing page — design direction

## The idea

A quiet control room. The page should feel like the moment a busy OPD finally has one source of truth: dark, still, legible, and quietly confident. The signature object is a live queue console — oversized token type, a calm "now serving" state and a patient update sliding in. Everything else stays disciplined around it.

## Palette

| Role | Token | Value |
|---|---|---|
| Page base | `ink` | `#080808` |
| Raised surface | `ink-900` | `#0B0E0D` |
| Secondary surface | `ink-800` | `#101512` |
| Deep measured band | `forest` | `#08121A` |
| Primary text | `mist-50` | `#F3F8F5` |
| Secondary text | `mist-300` | `#A9B8AF` |
| Muted text | `mist-500` | `#7F9187` |
| Signal / CTA | `brand-400` | `#6CC8FF` |
| Signal hover | `brand-300` | `#9BDCFF` |
| Brand mark | `brand-500` | `#3BAEFD` |
| Waiting | `amber` | `#F2C14E` |
| Served | `signal-green` | `#8BD8A2` |
| Urgent | `signal-red` | `#FF8A7A` |

One accent, used for action and live state. Amber/green/red are reserved for queue states and never used as decoration. All body text was checked at 4.5:1 or better against every surface it appears on.

## Type

- **Display:** Schibsted Grotesk, 500 weight. Tight tracking, short line-height, large sizes. Used for headlines, tokens and metrics.
- **Body/UI:** Atkinson Hyperlegible, 400/700. Chosen for low-vision legibility; it is a real accessibility decision, not a stylistic shortcut.
- **Scale:** hero `clamp(3rem, 3.6vw, 3.5rem)`; section `clamp(2.2rem, 4.2vw, 3.6rem)`; body 16–19px at 1.65–1.7 line-height; labels 13px; meta 12px. No body text below 12px.
- **Rhythm:** sentence case, no all-caps section labels, no ornamental eyebrow on every block. Numbering is used only where content is a sequence (the four steps, measurement list).

## Layout

- 1200px content container, 12-column grid, `clamp(1.25rem, 4vw, 2.5rem)` gutters.
- 8px spacing system. Section padding `clamp(4.5rem, 9vw, 8rem)`.
- Asymmetric hero: copy on the left, queue console on the right at ≥1280px; full-width console stacked below on smaller screens.
- Bento feature grid with intentionally unequal spans (7/5, 4/4/4, 4/8) rather than a wall of identical cards.
- Alternating surface depths (`ink`, `ink-900`, `forest`, `ink-950`) create section rhythm without light-mode interruptions.
- Borders are 1px at 8–18% opacity. Glows are low-opacity blue radials, never purple.

## Motion

- One orchestrated page-load moment: the headline lines rise behind a clip mask, then copy, CTAs and the queue console fade in. Implemented in CSS so it runs before hydration and never blocks LCP.
- The queue loop is the other signature motion: 3.6s per state, hover pause, explicit pause/play, offscreen pause, static state under reduced motion.
- Scroll-linked stepper progress and active token state.
- Reveals are a restrained 14px translate + fade, once, with a small stagger on grouped cards.
- Micro-interactions: 150–260ms button/card states, cursor spotlight on bento cards, accordion height, tab underline/pill. No animation blocks reading or interaction.
- `prefers-reduced-motion` is handled in CSS and in every Framer component; the page remains complete and meaningful without motion.

## Content rules

- Product truth only: outpatient registration, tokens, live queues, patient communication, priority handling, role-based access, audit logging.
- No invented hospital names, certifications, statistics or testimonials. Pilot results are bracketed placeholders with a visible explanation.
- Sample product numbers are labelled as sample data.
- Plain, short sentences. Benefit-led. No jargon or hype.
- Marketing copy lives in `src/lib/content.ts`; sample UI copy lives with its section data. Components should not become the place where wording is edited.

## Distinctive decisions

- The hero centerpiece is a working queue board, not a stock photo or a generic dashboard.
- The problem section uses a physical paper-token artifact to make the "before" tangible.
- The impact section refuses to animate fake numbers; only product facts count up. The pilot metrics stay bracketed.
- Inclusivity is expressed through legibility, keyboard access, reduced motion, phone-free patient paths and a multilingual preview in the patient view.
