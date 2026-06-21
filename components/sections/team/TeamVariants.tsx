"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEAM } from "@/lib/content";

/**
 * 5 Optionen für die Sektion "Team" – Warm-Welcoming-Cozy-Marke.
 * Porträts = geprüfte Unsplash-Platzhalter (später echte Team-Fotos).
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Head({ light = false }: { light?: boolean }) {
  return (
    <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
      <span className={`text-[0.7rem] font-semibold tracking-[0.35em] ${light ? "text-apricot" : "text-terracotta"}`}>UNSER TEAM</span>
      <h2 className={`mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] ${light ? "text-cream" : "text-walnut"}`}>
        Die Hände hinter deinem Look
      </h2>
      <p className={`mx-auto mt-4 max-w-md ${light ? "text-cream/70" : "text-walnut/65"}`}>
        Ein eingespieltes Team, das sich Zeit für dich nimmt.
      </p>
    </motion.div>
  );
}

/* ───────────── OPTION 1 — Karten mit Hover-Zoom ───────────── */
export function TeamCards() {
  return (
    <section id="team" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} {...reveal} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group overflow-hidden rounded-[1.5rem] bg-white/70 shadow-lg shadow-walnut/10 ring-1 ring-walnut/5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={m.img} alt={m.name} fill sizes="(max-width:1024px) 50vw, 20vw" className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
              </div>
              <div className="p-4 text-center">
                <p className="font-script text-2xl text-walnut">{m.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">{m.role}</p>
                <p className="mt-1 text-sm text-walnut/60">{m.specialty}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 2 — Kreis-Porträts (IG-Story-Stil) ───────────── */
export function TeamCircles() {
  return (
    <section id="team" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-5xl">
        <Head />
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-10">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} {...reveal} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group flex w-36 flex-col items-center text-center">
              <span className="rounded-full bg-gradient-to-tr from-terracotta via-apricot to-terracotta p-[3px] transition-transform duration-300 group-hover:scale-105">
                <span className="block rounded-full bg-cream p-1">
                  <span className="relative block h-28 w-28 overflow-hidden rounded-full">
                    <Image src={m.img} alt={m.name} fill sizes="120px" className="object-cover" />
                  </span>
                </span>
              </span>
              <p className="mt-4 font-script text-2xl text-walnut">{m.name}</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">{m.role}</p>
              <p className="mt-0.5 text-sm text-walnut/60">{m.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 3 — Hover-Reveal (Graustufe → Farbe + Info) ───────────── */
export function TeamHoverReveal() {
  return (
    <section id="team" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} {...reveal} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg shadow-walnut/10">
              <Image src={m.img} alt={m.name} fill sizes="(max-width:1024px) 50vw, 20vw" className="object-cover grayscale transition-all duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/85 via-walnut/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-script text-2xl text-cream">{m.name}</p>
                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:max-h-20 group-hover:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-apricot">{m.role}</p>
                  <p className="text-sm text-cream/85">{m.specialty}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 4 — Editorial (alternierende Reihen) ───────────── */
export function TeamEditorial() {
  return (
    <section id="team" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-4xl">
        <Head />
        <div className="mt-14 space-y-10">
          {TEAM.map((m, i) => (
            <motion.div key={m.name} {...reveal} transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE }}
              className={`flex items-center gap-6 ${i % 2 ? "flex-row-reverse" : ""}`}>
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-[1.5rem] shadow-xl shadow-walnut/15 sm:h-40 sm:w-40">
                <Image src={m.img} alt={m.name} fill sizes="160px" className="object-cover" />
              </div>
              <div className={i % 2 ? "text-right" : ""}>
                <p className="font-script text-3xl text-walnut">{m.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">{m.role}</p>
                <p className="mt-2 max-w-sm text-walnut/65">
                  Spezialisiert auf {m.specialty.toLowerCase()} – mit Liebe zum Detail und einem offenen Ohr für deine Wünsche.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 5 — Polaroid-Team (cozy, dunkel) ───────────── */
export function TeamPolaroid() {
  const rots = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3", "-rotate-1"];
  return (
    <section id="team" className="relative scroll-mt-24 overflow-hidden bg-walnut px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-terracotta/20 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Head light />
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-6 gap-y-10">
          {TEAM.map((m, i) => (
            <motion.figure key={m.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
              className={`${rots[i % rots.length]} w-[clamp(9rem,40vw,12rem)] rounded-sm bg-cream p-3 pb-5 shadow-2xl transition-transform`}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={m.img} alt={m.name} fill sizes="200px" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-center">
                <p className="font-script text-2xl text-walnut">{m.name}</p>
                <p className="text-xs text-walnut/55">{m.specialty}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
