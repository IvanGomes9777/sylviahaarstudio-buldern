"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircleHeart, Palette, Sparkles, Sun, Check } from "lucide-react";
import { ABOUT, ABOUT_FEATURES } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PLACEHOLDER_IMAGES as IMG } from "@/lib/media";

/**
 * 5 Optionen für die Sektion "Über uns" – Warm-Welcoming-Cozy-Marke,
 * echter Text der bestehenden Website. Bilder = Unsplash-Platzhalter.
 */

const ease = [0.22, 1, 0.36, 1] as const;
const ICONS = { consult: MessageCircleHeart, color: Palette, occasion: Sparkles, cozy: Sun };

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Eyebrow() {
  return (
    <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">
      {ABOUT.eyebrow.toUpperCase()}
    </span>
  );
}

/* ───────────── OPTION 1 — Bild-Text-Split mit Häkchen-Liste ───────────── */
export function AboutSplit() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-walnut/20">
          <Image src={IMG.salonInterior} alt="Im Sylvias Haarstudio" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
        </motion.div>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease }}>
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.5rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
          <p className="mt-5 text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-walnut/75">{ABOUT.intro}</p>
          <ul className="mt-7 space-y-3">
            {ABOUT.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-walnut/80">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-terracotta/15 text-terracotta">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 2 — Zentriert + 4 USP-Karten ───────────── */
export function AboutCards() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="mx-auto max-w-2xl text-center">
        <Eyebrow />
        <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.5rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
        <p className="mt-5 text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-walnut/75">{ABOUT.intro}</p>
      </motion.div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT_FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon];
          return (
            <motion.div
              key={f.title} {...reveal} transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -6 }}
              className="rounded-[1.5rem] bg-white/70 p-6 shadow-lg shadow-walnut/10 ring-1 ring-walnut/5 transition-shadow hover:shadow-xl"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/12 text-terracotta">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-semibold text-walnut">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-walnut/65">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────── OPTION 3 — Statement + nummerierte Werte ───────────── */
export function AboutStatement() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-walnut px-6 py-[clamp(4rem,9vw,7rem)] text-cream">
      <div className="mx-auto max-w-5xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease }}>
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-apricot">{ABOUT.eyebrow.toUpperCase()}</span>
          <p className="mt-5 max-w-3xl font-script text-[clamp(1.9rem,1rem+4vw,3.25rem)] leading-[1.15] text-cream">
            {ABOUT.intro}
          </p>
        </motion.div>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {ABOUT_FEATURES.map((f, i) => (
            <motion.div key={f.title} {...reveal} transition={{ duration: 0.6, delay: i * 0.1, ease }} className="flex gap-4">
              <span className="font-script text-3xl text-apricot">0{i + 1}</span>
              <div>
                <h3 className="font-semibold text-cream">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-cream/70">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 4 — Foto-Collage + Story + Stat ───────────── */
export function AboutCollage() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="relative h-[26rem]">
          <div className="absolute left-0 top-0 h-56 w-44 overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-cream sm:h-64 sm:w-52">
            <Image src={IMG.cutting} alt="Schnitt" fill sizes="220px" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-2 h-60 w-48 overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-cream sm:h-72 sm:w-60">
            <Image src={IMG.hairDetail} alt="Farbe & Pflege" fill sizes="240px" className="object-cover" />
          </div>
          <div className="absolute bottom-6 left-2 rounded-2xl bg-terracotta px-5 py-4 text-cream shadow-lg">
            <span className="block font-script text-3xl leading-none">{SITE.rating.value.toString().replace(".", ",")}★</span>
            <span className="text-xs text-cream/85">{SITE.rating.count} Bewertungen</span>
          </div>
        </motion.div>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease }}>
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.5rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
          <p className="mt-5 leading-relaxed text-walnut/75">{ABOUT.intro}</p>
          <p className="mt-4 leading-relaxed text-walnut/75">
            Ob Schnitt, Farbe oder Pflege – unser Team nimmt sich Zeit für dich. {ABOUT.points[3]}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 5 — Zickzack (alternierende Reihen) ───────────── */
export function AboutZigzag() {
  const imgs = [IMG.salonInterior, IMG.washCut, IMG.hairDetail, IMG.cutting];
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="mx-auto max-w-2xl text-center">
        <Eyebrow />
        <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.5rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
        <p className="mt-5 leading-relaxed text-walnut/75">{ABOUT.intro}</p>
      </motion.div>
      <div className="mx-auto mt-14 max-w-5xl space-y-12">
        {ABOUT_FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon];
          const flip = i % 2 === 1;
          return (
            <motion.div
              key={f.title} {...reveal} transition={{ duration: 0.7, delay: 0.05 * i, ease }}
              className={`grid items-center gap-8 md:grid-cols-2 ${flip ? "md:[direction:rtl]" : ""}`}
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] shadow-xl shadow-walnut/15 [direction:ltr]">
                <Image src={imgs[i]} alt={f.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="[direction:ltr]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/12 text-terracotta">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-script text-2xl text-walnut">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-walnut/70">{f.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
