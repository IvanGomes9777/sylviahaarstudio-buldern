"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import {
  HeroFullBleed,
  HeroSplit,
  HeroCollage,
  HeroAiryStrip,
  HeroOrganic,
} from "@/components/heroes/Heroes";

const VARIANTS = [
  { id: "A", name: "Vollbild-Foto", tag: "Cinematic · Overlay", Hero: HeroFullBleed },
  { id: "B", name: "Split / Editorial", tag: "Asymmetrisch · modern", Hero: HeroSplit },
  { id: "C", name: "Polaroid-Collage", tag: "Authentisch · verspielt", Hero: HeroCollage },
  { id: "D", name: "Luftig + Bildstreifen", tag: "Minimal · großzügig", Hero: HeroAiryStrip },
  { id: "E", name: "Organische Form + Trust", tag: "Bewertung · Öffnungszeiten", Hero: HeroOrganic },
];

export default function HeroShowcase() {
  const [active, setActive] = useState("A");
  const current = VARIANTS.find((v) => v.id === active)!;
  const ActiveHero = current.Hero;

  return (
    <main className="relative">
      <NavbarWarmCozy key={`nav-${active}`} />
      <div key={active}>
        <ActiveHero />
      </div>

      {/* Control panel */}
      <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/85 p-2.5 shadow-2xl backdrop-blur-xl">
          <div className="mb-1 text-center text-[0.6rem] tracking-[0.3em] text-white/40">
            HERO – 5 OPTIONEN (WARM-COZY)
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActive(v.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative rounded-xl px-3.5 py-2 transition-colors ${
                  active === v.id ? "text-white" : "text-white/55 hover:text-white/80"
                }`}
              >
                {active === v.id && (
                  <motion.span
                    layoutId="hero-pill"
                    className="absolute inset-0 -z-0 rounded-xl bg-white/12 ring-1 ring-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 block text-[0.72rem] font-semibold">Option {v.id}</span>
                <span className="relative z-10 hidden text-[0.6rem] opacity-70 sm:block">{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
