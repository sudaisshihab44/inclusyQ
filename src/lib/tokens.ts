/**
 * Shared design tokens for JavaScript-driven UI (motion, charts, canvas).
 * The CSS equivalents live in src/app/globals.css.
 *
 * Spacing follows an 8px rhythm. Use even Tailwind spacing steps:
 * 2 = 8px, 4 = 16px, 6 = 24px, 8 = 32px, 10 = 40px, 12 = 48px, 16 = 64px.
 */

export const tokens = {
  color: {
    ink: "#080808",
    ink900: "#0B0E0D",
    ink800: "#101512",
    ink700: "#161C19",
    forest: "#08121A",
    forestSoft: "#0B1A24",
    mist50: "#F3F8F5",
    mist100: "#E7EFEA",
    mist200: "#CBD8D1",
    mist300: "#A9B8AF",
    mist400: "#8A9A91",
    mist500: "#7F9187",
    brand100: "#EAF7FF",
    brand200: "#C9ECFF",
    brand300: "#9BDCFF",
    brand400: "#6CC8FF",
    brand500: "#3BAEFD",
    brand600: "#1C8BDC",
    brand700: "#146BAA",
    amber: "#F2C14E",
    signalGreen: "#8BD8A2",
    signalRed: "#FF8A7A",
  },
  container: "1200px",
  motion: {
    fast: 0.16,
    base: 0.24,
    slow: 0.4,
    reveal: 0.38,
    ease: [0.22, 1, 0.36, 1] as const,
    easeInOut: [0.65, 0, 0.35, 1] as const,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
} as const;
