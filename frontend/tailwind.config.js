/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: "var(--da-canvas)",
        surface: "var(--da-surface)",
        "surface-hover": "var(--da-surface-hover)",
        line: "var(--da-line)",
        ink: "var(--da-ink)",
        "ink-soft": "var(--da-ink-soft)",
        "ink-strong": "var(--da-ink-strong)",
        "ink-muted": "var(--da-ink-muted)",
        brand: "var(--da-brand)",
        "brand-dark": "var(--da-brand-dark)",
        "brand-text": "var(--da-brand-text)",
        "brand-hover": "var(--da-brand-hover)",
        good: "var(--da-good)",
        warn: "var(--da-warn)",
        bad: "var(--da-bad)",
        "good-bg": "var(--da-good-bg)",
        "warn-bg": "var(--da-warn-bg)",
        "bad-bg": "var(--da-bad-bg)",
        whatsapp: "#25D366",
        "whatsapp-dark": "#128C7E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        DEFAULT: "var(--da-radius)",
      },
      boxShadow: {
        card: "var(--da-shadow)",
      },
    },
  },
  plugins: [],
};
