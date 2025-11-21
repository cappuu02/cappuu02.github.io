/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        "bg-elevated": "#0b1120",
        primary: "#a855f7",
        secondary: "#38bdf8",
        accent: "#f97316",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(168,85,247,0.45)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(168,85,247,0.25), transparent 55%)",
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#020617", // sfondo quasi nero (slate-950)
        "bg-elevated": "#020617",
        primary: "#22c55e", // neon green
        secondary: "#38bdf8", // cyan
        accent: "#f97316", // orange
        terminal: "#0f172a", // pannelli
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(34,197,94,0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
