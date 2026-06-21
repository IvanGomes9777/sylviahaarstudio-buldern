"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/content";
import { SITE } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

/* Google-„G" Logo (4-farbig) */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7C13.42 13.62 18.27 9.75 24 9.75z" />
    </svg>
  );
}

function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`flex text-amber-400 ${className}`}>
      {Array.from({ length: n }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
    </span>
  );
}

function initials(name: string) {
  return name.replace(/\(.*\)/, "").trim().split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
const AV_COLORS = ["bg-terracotta", "bg-walnut", "bg-apricot text-walnut", "bg-sage", "bg-grape"];

function Avatar({ name, i }: { name: string; i: number }) {
  return (
    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-cream ${AV_COLORS[i % AV_COLORS.length]}`}>
      {initials(name)}
    </span>
  );
}

function Head({ light = false }: { light?: boolean }) {
  return (
    <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
      <span className={`text-[0.7rem] font-semibold tracking-[0.35em] ${light ? "text-apricot" : "text-terracotta"}`}>BEWERTUNGEN</span>
      <h2 className={`mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] ${light ? "text-cream" : "text-walnut"}`}>Das sagen unsere Gäste</h2>
      <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${light ? "bg-cream/10 text-cream" : "bg-white/70 text-walnut ring-1 ring-walnut/10"}`}>
        <GoogleG /> <span className="font-semibold">{SITE.rating.value.toString().replace(".", ",")}</span>
        <Stars /> <span className={light ? "text-cream/70" : "text-walnut/60"}>· {SITE.rating.count} Rezensionen</span>
      </div>
    </motion.div>
  );
}

function GoogleLink({ className = "" }: { className?: string }) {
  return (
    <a href={SITE.contact.google} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full border border-walnut/25 px-6 py-3 text-sm font-semibold text-walnut transition-colors hover:bg-walnut hover:text-cream ${className}`}>
      <GoogleG /> Alle Bewertungen auf Google
    </a>
  );
}

/* ───────────── OPTION 1 — Slider/Carousel ───────────── */
export function ReviewsSlider() {
  const [i, setI] = useState(0);
  const n = REVIEWS.length;
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);
  const r = REVIEWS[i];
  return (
    <section id="bewertungen" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-3xl">
        <Head />
        <div className="relative mt-12 min-h-[16rem] rounded-[1.75rem] border border-walnut/10 bg-white/70 p-[clamp(1.75rem,5vw,3rem)] text-center shadow-xl shadow-walnut/10">
          <Quote className="mx-auto text-terracotta/30" size={40} />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4, ease: EASE }}>
              <p className="mt-4 text-[clamp(1.05rem,1rem+0.4vw,1.3rem)] leading-relaxed text-walnut/85">„{r.text}"</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <Avatar name={r.author} i={i} />
                <div className="text-left">
                  <p className="font-semibold text-walnut">{r.author}</p>
                  <Stars n={r.stars} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button onClick={() => setI((p) => (p - 1 + n) % n)} className="grid h-11 w-11 place-items-center rounded-full bg-walnut text-cream transition-colors hover:bg-terracotta"><ChevronLeft size={20} /></button>
          <div className="flex gap-1.5">
            {REVIEWS.map((_, k) => <button key={k} onClick={() => setI(k)} className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-terracotta" : "w-2 bg-walnut/25"}`} />)}
          </div>
          <button onClick={() => setI((p) => (p + 1) % n)} className="grid h-11 w-11 place-items-center rounded-full bg-walnut text-cream transition-colors hover:bg-terracotta"><ChevronRight size={20} /></button>
        </div>
        <div className="mt-8 flex justify-center"><GoogleLink /></div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 2 — Masonry-Karten ───────────── */
export function ReviewsCards() {
  return (
    <section id="bewertungen" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {REVIEWS.map((r, i) => (
            <motion.figure key={i} {...reveal} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              className="break-inside-avoid rounded-[1.5rem] border border-walnut/10 bg-white/70 p-6 shadow-lg shadow-walnut/10">
              <div className="flex items-center justify-between">
                <Stars n={r.stars} />
                <GoogleG />
              </div>
              <blockquote className="mt-3 leading-relaxed text-walnut/80">„{r.text}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <Avatar name={r.author} i={i} />
                <span className="font-semibold text-walnut">{r.author}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><GoogleLink /></div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 3 — Marquee (zwei Reihen) ───────────── */
export function ReviewsMarquee() {
  const rowA = REVIEWS.slice(0, 4);
  const rowB = REVIEWS.slice(4).concat(REVIEWS.slice(0, 2));
  const Card = ({ r, i }: { r: typeof REVIEWS[number]; i: number }) => (
    <div className="w-80 shrink-0 rounded-[1.5rem] border border-walnut/10 bg-white/80 p-6 shadow-lg">
      <div className="flex items-center justify-between"><Stars n={r.stars} /><GoogleG /></div>
      <p className="mt-3 line-clamp-4 leading-relaxed text-walnut/80">„{r.text}"</p>
      <div className="mt-4 flex items-center gap-3"><Avatar name={r.author} i={i} /><span className="font-semibold text-walnut">{r.author}</span></div>
    </div>
  );
  const Row = ({ items, reverse = false }: { items: typeof REVIEWS; reverse?: boolean }) => (
    <div className="flex overflow-hidden">
      <motion.div animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }} transition={{ duration: 36, ease: "linear", repeat: Infinity }} className="flex shrink-0 gap-5 pr-5">
        {[...items, ...items].map((r, i) => <Card key={i} r={r} i={i} />)}
      </motion.div>
    </div>
  );
  return (
    <section id="bewertungen" className="scroll-mt-24 overflow-hidden bg-cream py-[clamp(4.5rem,10vw,8rem)]">
      <div className="px-6"><Head /></div>
      <div className="mt-12 space-y-5">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
      <div className="mt-10 flex justify-center px-6"><GoogleLink /></div>
    </section>
  );
}

/* ───────────── OPTION 4 — Dunkel mit Summary + Grid ───────────── */
export function ReviewsDark() {
  return (
    <section id="bewertungen" className="relative scroll-mt-24 overflow-hidden bg-walnut px-6 py-[clamp(4.5rem,10vw,8rem)] text-cream">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-terracotta/20 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Head light />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <motion.figure key={i} {...reveal} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
              className="rounded-[1.5rem] border border-cream/10 bg-cream/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between"><Stars n={r.stars} /><GoogleG /></div>
              <blockquote className="mt-3 leading-relaxed text-cream/85">„{r.text}"</blockquote>
              <figcaption className="mt-4 flex items-center gap-3"><Avatar name={r.author} i={i} /><span className="font-semibold text-cream">{r.author}</span></figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href={SITE.contact.google} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-walnut transition-colors hover:bg-apricot">
            <GoogleG /> Alle Bewertungen auf Google
          </a>
        </div>
      </div>
    </section>
  );
}
