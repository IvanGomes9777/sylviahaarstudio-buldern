"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, animate, useInView } from "framer-motion";
import { MessageCircleHeart, Palette, Sparkles, Sun, Check, Star, Users, CalendarDays } from "lucide-react";
import { ABOUT, ABOUT_FEATURES } from "@/lib/content";
import { SITE } from "@/lib/site";
import { TEAM } from "@/lib/content";
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

/* ═══════════════════════════════════════════════════════════════════════════
   WEITERE 5 OPTIONEN (6–10) – mit Animation & Illustration
   ═══════════════════════════════════════════════════════════════════════════ */

/* Animierter Zähler (zählt hoch, sobald sichtbar) */
function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [inView, to]);
  const txt = decimals ? val.toFixed(decimals).replace(".", ",") : Math.round(val).toString();
  return <span ref={ref}>{txt}{suffix}</span>;
}

/* ───────────── OPTION 6 — Animiertes Wort-Laufband (Marquee) ───────────── */
export function AboutMarquee() {
  const words = ["Schnitt", "Farbe", "Pflege", "Beratung", "Styling", "Wohlfühlen", "für jeden Anlass"];
  const Band = ({ reverse = false }: { reverse?: boolean }) => (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="flex shrink-0 gap-8 pr-8"
      >
        {[...words, ...words].map((w, i) => (
          <span key={i} className="font-script text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-walnut/10">
            {w} ·
          </span>
        ))}
      </motion.div>
    </div>
  );
  return (
    <section id="ueber-uns" className="relative scroll-mt-24 overflow-hidden bg-cream py-[clamp(4rem,9vw,7rem)]">
      <div className="pointer-events-none absolute inset-x-0 top-8 -z-0"><Band /></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-8 -z-0"><Band reverse /></div>
      <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <Eyebrow />
        <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.75rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
        <p className="mt-5 text-[clamp(1rem,0.95rem+0.3vw,1.15rem)] leading-relaxed text-walnut/75">{ABOUT.intro}</p>
        <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
          {ABOUT_FEATURES.map((f) => (
            <span key={f.title} className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-walnut shadow-sm ring-1 ring-walnut/10">
              {f.title}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────── OPTION 7 — Handgezeichnete Illustrationen (draw-in) ───────────── */
export function AboutIllustrated() {
  const draw = {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true },
  };
  return (
    <section id="ueber-uns" className="relative scroll-mt-24 overflow-hidden bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      {/* dekorative, sich zeichnende Linien */}
      <motion.svg viewBox="0 0 200 120" className="pointer-events-none absolute left-[6%] top-[18%] hidden w-40 text-terracotta/40 md:block" fill="none">
        <motion.path d="M10 100 C 40 20, 90 20, 110 70 S 180 110, 190 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...draw} transition={{ duration: 1.6, ease }} />
      </motion.svg>
      <motion.svg viewBox="0 0 80 80" className="pointer-events-none absolute right-[8%] top-[22%] hidden w-16 text-apricot md:block" fill="none">
        <motion.path d="M40 8 L46 32 L70 38 L46 44 L40 70 L34 44 L10 38 L34 32 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" {...draw} transition={{ duration: 1.4, delay: 0.3, ease }} />
      </motion.svg>
      <motion.svg viewBox="0 0 120 60" className="pointer-events-none absolute bottom-[12%] right-[14%] hidden w-28 text-sage md:block" fill="none">
        <motion.path d="M5 30 Q 30 5, 55 30 T 115 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...draw} transition={{ duration: 1.5, delay: 0.5, ease }} />
      </motion.svg>

      <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-terracotta/12 text-terracotta">
          <Sparkles size={28} />
        </span>
        <Eyebrow />
        <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.75rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
        <p className="mt-5 text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)] leading-relaxed text-walnut/80">{ABOUT.intro}</p>
        <div className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-walnut/70">
          {ABOUT_FEATURES.map((f) => (
            <span key={f.title} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-terracotta" /> {f.title}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────── OPTION 8 — Animierte Zahlen / Stats ───────────── */
export function AboutStats() {
  const stats = [
    { icon: Star, value: <Counter to={4.5} decimals={1} />, label: "Google-Bewertung" },
    { icon: MessageCircleHeart, value: <Counter to={SITE.rating.count} suffix="+" />, label: "echte Rezensionen" },
    { icon: Users, value: <Counter to={TEAM.length} />, label: "Stylistinnen im Team" },
    { icon: CalendarDays, value: <Counter to={6} />, label: "Tage die Woche für dich da" },
  ];
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="mx-auto max-w-2xl text-center">
        <Eyebrow />
        <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.5rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
        <p className="mt-5 leading-relaxed text-walnut/75">{ABOUT.intro}</p>
      </motion.div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} {...reveal} transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className="rounded-[1.5rem] bg-white/70 p-6 text-center shadow-lg ring-1 ring-walnut/5">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/12 text-terracotta">
                <Icon size={22} />
              </span>
              <div className="mt-4 font-script text-[clamp(2.5rem,6vw,3.25rem)] leading-none text-walnut">{s.value}</div>
              <p className="mt-2 text-sm text-walnut/65">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────────── OPTION 9 — Vertikale Timeline mit animierter Linie ───────────── */
export function AboutTimeline() {
  const ICONS = { consult: MessageCircleHeart, color: Palette, occasion: Sparkles, cozy: Sun };
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <motion.div {...reveal} transition={{ duration: 0.7, ease }} className="mx-auto max-w-2xl text-center">
        <Eyebrow />
        <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.5rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
        <p className="mt-5 leading-relaxed text-walnut/75">{ABOUT.intro}</p>
      </motion.div>
      <div ref={ref} className="relative mx-auto mt-12 max-w-2xl pl-12">
        {/* animierte Linie */}
        <motion.span
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.1, ease }}
          className="absolute left-[1.35rem] top-2 h-[calc(100%-1rem)] w-0.5 origin-top bg-terracotta/30"
        />
        <div className="space-y-9">
          {ABOUT_FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.18, ease }}
                className="relative"
              >
                <span className="absolute -left-[2.6rem] grid h-9 w-9 place-items-center rounded-full bg-terracotta text-cream shadow-md ring-4 ring-cream">
                  <Icon size={16} />
                </span>
                <h3 className="font-semibold text-walnut">{f.title}</h3>
                <p className="mt-1 leading-relaxed text-walnut/70">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 10 — Schwebende Blobs + Kreisbild ───────────── */
export function AboutBlobs() {
  const float = (d: number) => ({
    animate: { y: [0, -18, 0], x: [0, 8, 0] },
    transition: { duration: d, ease: "easeInOut" as const, repeat: Infinity },
  });
  return (
    <section id="ueber-uns" className="relative scroll-mt-24 overflow-hidden bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <motion.span {...float(9)} className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rounded-full bg-terracotta/15 blur-2xl" />
      <motion.span {...float(11)} className="pointer-events-none absolute right-0 top-1/3 h-56 w-56 rounded-full bg-apricot/20 blur-3xl" />
      <motion.span {...float(13)} className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-sage/20 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div {...reveal} transition={{ duration: 0.7, ease }}>
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.75rem)] leading-[1.05] text-walnut">{ABOUT.headline}</h2>
          <p className="mt-5 leading-relaxed text-walnut/75">{ABOUT.intro}</p>
          <ul className="mt-7 space-y-3">
            {ABOUT.points.slice(0, 3).map((p) => (
              <li key={p} className="flex items-start gap-3 text-walnut/80">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-terracotta/15 text-terracotta">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...reveal} transition={{ duration: 0.8, delay: 0.1, ease }} className="relative mx-auto aspect-square w-full max-w-sm">
          <motion.div {...float(10)} className="relative h-full w-full overflow-hidden rounded-full shadow-2xl shadow-walnut/25 ring-8 ring-white/60">
            <Image src={IMG.salonInterior} alt="Im Sylvias Haarstudio" fill sizes="(max-width:1024px) 80vw, 24rem" className="object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
