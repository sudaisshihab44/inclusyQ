# InclusyQ — landing page

A dark, clinical marketing site for **InclusyQ**, a hospital outpatient queue management and smart token system.

Built with Next.js (App Router), TypeScript, Tailwind CSS 4, Framer Motion and Lucide. Deploy-ready for Vercel.

---

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck   # TypeScript
npm run build       # production build
npm run start       # serve the production build
```

---

## What is here

- **Sticky nav** with scroll-aware blur, active section state, mobile menu and skip link.
- **Hero with live queue simulation**: tokens move from waiting to now serving, a patient SMS appears, hover pauses, and a visible pause/play control stops the loop. The queue is static under prefers-reduced-motion.
- **Trust strip** with capability statements and an honest pilot-programme placeholder.
- **Problem section** with a paper-token artifact and real-world waiting-hall questions.
- **How it works**: four-step scroll-linked stepper with a live sample token panel.
- **Bento feature grid** covering registration, tokens, display board, notifications, routing, priority and analytics.
- **Impact scorecard** with animated product-fact counters and clearly marked `[X]` pilot placeholders. No invented results.
- **Role views** tabs for Admin, Front desk and Patient, with keyboard support and sample UI.
- **Pilot section** with a reserved testimonial slot and a measurement plan.
- **Accessible FAQ accordion** with integration, security, smartphone, priority and pricing answers.
- **Demo form** with inline validation, focus management, a mailto fallback and a success state.
- **Privacy and terms pages**, footer, structured data, sitemap and robots.
- **Custom OG image** generated at request time.

---

## Where to edit

### All marketing copy

`src/lib/content.ts`

This is the single content source for headlines, section copy, features, FAQ answers, role-view copy, form labels and validation messages, legal copy and footer links. Components read from it; you should not need to edit components to change wording.

Sample product-UI labels are stored with their section data (for example `features.mock` and `roles.tabs`) so the mock screens can be edited too.

### Design tokens

- **CSS / Tailwind theme:** `src/app/globals.css` under `@theme`.
- **JavaScript values** (motion, colors, breakpoints): `src/lib/tokens.ts`.

Keep the two in sync when changing a color. The design uses an 8px spacing rhythm; use even Tailwind spacing steps (`2` = 8px, `4` = 16px, `6` = 24px, `8` = 32px).

### Sections and UI

```text
src/app/                     routes, metadata, OG image, sitemap, robots, demo API
src/components/layout/       Navbar, Footer, Logo
src/components/sections/     one file per page section
src/components/ui/           QueueDemo, mockups, Reveal, form, accordion, counters
src/lib/                     content, tokens, validation, motion helpers
docs/                        design direction and self-review
public/logo.png              brand icon used by JSON-LD
public/logo.svg              brand icon source
public/brand-icon.svg        app icon source
public/inclusyq-lockup-light.svg  header/footer lockup for dark surfaces
public/inclusyq-lockup-light.png  social-card lockup
src/app/icon.svg             favicon
src/app/apple-icon.png       Apple touch icon
```

### Brand assets

The site uses the supplied **Design 1** horizontal lockup in a light-wordmark variant so it stays readable on the dark background; the Q remains brand blue. **Design 4** is used for the favicon, Apple touch icon, JSON-LD logo and social card. Replace the files in `public/` and `src/app/` if the brand team issues updated artwork.

No stock photography is used. Product visuals are built in HTML/CSS/SVG. If real screenshots are added later, use `next/image` with explicit width/height to protect CLS.

---

## Demo form

The form posts to `src/app/api/demo/route.ts`, which validates server-side and then uses the first configured delivery method:

1. **`DEMO_WEBHOOK_URL`** — forwards the lead as JSON to your CRM or automation endpoint. Optional bearer token via `DEMO_WEBHOOK_TOKEN`.
2. **`RESEND_API_KEY`** — sends an email to `DEMO_TO_EMAIL` using `DEMO_FROM_EMAIL`.
3. **No delivery configured** — the request is validated but nothing is sent. The UI says so explicitly and offers a prefilled `mailto:` fallback. This keeps the preview honest and avoids a dead end.

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, OG URL and sitemap base. Use the final domain. |
| `DEMO_WEBHOOK_URL` | CRM/automation webhook. Takes precedence over email. |
| `DEMO_WEBHOOK_TOKEN` | Optional bearer token for the webhook. |
| `RESEND_API_KEY` | Resend API key for email delivery. |
| `DEMO_TO_EMAIL` | Where demo requests arrive. Defaults to `info@inclusyq.online`. |
| `DEMO_FROM_EMAIL` | Verified Resend sender, e.g. `InclusyQ Website <website@yourdomain.com>`. |

No demo data is stored in the app. If you add storage later, update `docs/SELF_REVIEW.md` and the privacy notice.

The public contact email is `info@inclusyq.online`; the LinkedIn URL comes from the existing site. Change them in `src/lib/content.ts` if they change. The default demo recipient in `.env.example` uses the same email.

---

## SEO and metadata

- Title, description, canonical, Open Graph and Twitter metadata live in `src/app/layout.tsx`.
- `Organization`, `WebSite`, `SoftwareApplication` and `FAQPage` JSON-LD live in `src/app/page.tsx`.
- `src/app/opengraph-image.tsx` generates a 1200×630 social card.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate the sitemap and robots file from `NEXT_PUBLIC_SITE_URL`.
- One H1; section H2s; card/FAQ H3s.

Set `NEXT_PUBLIC_SITE_URL` before deploying so canonical, OG image and sitemap URLs are absolute and correct.

---

## Deploy to Vercel

Production deploys run automatically from `.github/workflows/deploy-vercel.yml`
whenever a commit is pushed to `master`. The workflow installs dependencies,
runs the type-check and production build, then deploys the prebuilt output to
Vercel.

Add these GitHub Actions secrets before the first deployment:

| Secret | Purpose |
|---|---|
| `VERCEL_TOKEN` | Vercel access token |
| `VERCEL_ORG_ID` | Vercel team or account ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

Configure the application environment variables listed above in Vercel.

---

## Placeholders and data to replace

These are intentionally marked and must not be published as facts:

- Impact metrics: `[X]%`, `[Y]%`, `[Z] hrs` in `src/lib/content.ts` → `impact.metrics`.
- Pilot quote, hospital name, role and city in `pilot`.
- Partner/pilot logos: no logos are shown until approved; the trust strip explains this.
- Public contact phone: not displayed, because no verified number was supplied.
- The demo form backend is unconfigured until one of the delivery variables is set.

The queue and dashboard numbers are explicitly labelled sample data. Do not remove those labels unless you replace the mock data with real, approved screenshots.

---

## Quality checks run

See `docs/SELF_REVIEW.md` for the full checklist and measured results. Automated checks included:

- axe-core WCAG 2.0/2.1/2.2 A/AA: **0 violations** on home, privacy and terms.
- Lighthouse production audit (local, desktop): **98 performance, 100 accessibility, 100 best practices, 100 SEO**.
- 320 / 360 / 768 / 1024 / 1440px: **no horizontal overflow**.
- Keyboard path, tabs, accordion, mobile menu, pause/play queue and form validation tested with Playwright.
- Reduced-motion mode: queue static, counters final, pause control hidden.
- No-JS fallback: hero and section content remain visible through noscript styles.

## Legacy site

The previous Vite implementation remains in `InclusyQ-Web-master/` for reference and is excluded from this Next.js build (see `tsconfig.json` and `.gitignore`). It is not deployed by this project.
