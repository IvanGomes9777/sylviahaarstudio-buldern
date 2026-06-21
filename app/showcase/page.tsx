"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavbarDarkLuxury from "@/components/navbars/NavbarDarkLuxury";
import NavbarMinimalist from "@/components/navbars/NavbarMinimalist";
import NavbarPlayful from "@/components/navbars/NavbarPlayful";
import NavbarLuxuryGold from "@/components/navbars/NavbarLuxuryGold";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";

type Variant = {
  id: number;
  name: string;
  tag: string;
  Navbar: () => JSX.Element;
  stageClass: string;
  textClass: string;
  badgeClass: string;
};

const VARIANTS: Variant[] = [
  {
    id: 1,
    name: "Dark-Luxury Cinematic",
    tag: "Glassmorphism · Gold · Serif",
    Navbar: NavbarDarkLuxury,
    stageClass:
      "bg-[radial-gradient(120%_120%_at_50%_0%,#1a1a1a_0%,#0f0f0f_60%,#000_100%)]",
    textClass: "text-white",
    badgeClass: "border-gold/40 text-gold",
  },
  {
    id: 2,
    name: "Minimalist Clean & Elegant",
    tag: "Whitespace · Beige · Hairline",
    Navbar: NavbarMinimalist,
    stageClass: "bg-[linear-gradient(180deg,#F5F1E8_0%,#ECE6D8_100%)]",
    textClass: "text-espresso",
    badgeClass: "border-espresso/30 text-espresso",
  },
  {
    id: 3,
    name: "Playful Vibrant Modern",
    tag: "Floating Pill · Gradient · Bounce",
    Navbar: NavbarPlayful,
    stageClass:
      "bg-[radial-gradient(110%_90%_at_85%_-10%,#fde4ef_0%,#FAFAFA_45%),radial-gradient(90%_80%_at_0%_10%,#d6f7fb_0%,transparent_55%)]",
    textClass: "text-grape",
    badgeClass: "border-magenta/40 text-magenta",
  },
  {
    id: 4,
    name: "Luxury-Gold Glamorous",
    tag: "Monogramm · Champagne · Symmetrie",
    Navbar: NavbarLuxuryGold,
    stageClass:
      "bg-[radial-gradient(120%_120%_at_50%_-10%,#1d1a14_0%,#0d0d0d_70%,#000_100%)]",
    textClass: "text-champagne",
    badgeClass: "border-champagne/40 text-champagne",
  },
  {
    id: 5,
    name: "Warm-Welcoming Cozy",
    tag: "Script-Logo · Walnut · Soft",
    Navbar: NavbarWarmCozy,
    stageClass: "bg-[linear-gradient(180deg,#F9F6F2_0%,#F0E7DC_100%)]",
    textClass: "text-walnut",
    badgeClass: "border-terracotta/40 text-terracotta",
  },
];

export default function Showcase() {
  const [active, setActive] = useState(1);
  const current = VARIANTS.find((v) => v.id === active)!;
  const ActiveNavbar = current.Navbar;

  return (
    <main className="relative min-h-[100svh]">
      {/* Active navbar (remount on switch so entry-animations replay) */}
      <ActiveNavbar key={active} />

      {/* Themed stage – tall enough to scroll & reveal scroll-triggered states */}
      <section className={`relative min-h-[220vh] ${current.stageClass}`}>
        <div className="sticky top-0 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span
                className={`mb-6 inline-block rounded-full border px-4 py-1.5 text-[0.7rem] tracking-[0.25em] ${current.badgeClass}`}
              >
                OPTION {current.id} / 5
              </span>
              <h1
                className={`text-[clamp(2rem,1rem+6vw,4.5rem)] font-light leading-[1.05] ${current.textClass}`}
              >
                {current.name}
              </h1>
              <p className={`mt-5 text-sm tracking-[0.2em] opacity-70 ${current.textClass}`}>
                {current.tag.toUpperCase()}
              </p>
              <p className={`mt-10 text-sm opacity-60 ${current.textClass}`}>
                ↓ Scrolle, um das Scroll-Verhalten der Navbar live zu sehen
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* second screen to demonstrate scrolled state */}
        <div className="flex min-h-[100svh] items-center justify-center px-6">
          <p className={`max-w-md text-center text-2xl font-light opacity-50 ${current.textClass}`}>
            Hier verdichtet sich die Navbar oben — Glassmorphism, Hairline oder
            Schatten setzen ein. Genau das, was bei einem echten Hero passiert.
          </p>
        </div>
      </section>

      {/* Floating control panel */}
      <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-black/80 p-2.5 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActive(v.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                  active === v.id ? "text-white" : "text-white/55 hover:text-white/80"
                }`}
              >
                {active === v.id && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 -z-0 rounded-xl bg-white/12 ring-1 ring-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 block text-[0.7rem] font-semibold tracking-wide">
                  Option {v.id}
                </span>
                <span className="relative z-10 hidden text-[0.62rem] opacity-70 sm:block">
                  {v.name.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
