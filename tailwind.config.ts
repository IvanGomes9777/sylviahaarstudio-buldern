import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // CSS-Variablen werden in app/layout.tsx via next/font gesetzt (self-hosted).
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        poppins: ["var(--font-poppins)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      colors: {
        // Variante 1 – Dark-Luxury
        ink: "#0F0F0F",
        charcoal: "#1A1A1A",
        gold: "#D4AF37",
        rosegold: "#B76E79",
        // Variante 2 – Minimalist
        beige: "#F5F1E8",
        espresso: "#3D2817",
        sage: "#9CAF88",
        // Variante 3 – Playful
        magenta: "#E91E63",
        teal: "#00BCD4",
        grape: "#5E35B1",
        lime: "#76FF03",
        // Variante 4 – Luxury-Gold
        champagne: "#E6D5A8",
        // Variante 5 – Warm-Cozy
        walnut: "#8B6F47",
        cream: "#F9F6F2",
        terracotta: "#CC7755",
        apricot: "#F4A460",
      },
    },
  },
  plugins: [],
};

export default config;
