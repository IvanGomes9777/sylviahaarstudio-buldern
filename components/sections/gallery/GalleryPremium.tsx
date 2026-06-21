"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY } from "@/lib/media";

/**
 * PREMIUM-GALERIE-OPTIONEN (6–10) – High-End-Effekte:
 * scroll-getriebene Filmstrip, 3D-Coverflow, Cursor-Spotlight-Reveal,
 * filterbares Masonry (Layout-Animation), Parallax-Spalten.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function Head() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE }} className="text-center"
    >
      <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">GALERIE</span>
      <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Unsere Arbeiten</h2>
    </motion.div>
  );
}

/* Minimaler Lightbox */
function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const [i, setI] = useState(index);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/90 p-4 backdrop-blur-md">
      <button onClick={onClose} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-cream"><X size={22} /></button>
      <button onClick={(e) => { e.stopPropagation(); setI((p) => (p - 1 + GALLERY.length) % GALLERY.length); }} className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-cream md:left-8"><ChevronLeft size={24} /></button>
      <button onClick={(e) => { e.stopPropagation(); setI((p) => (p + 1) % GALLERY.length); }} className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-cream md:right-8"><ChevronRight size={24} /></button>
      <motion.div key={i} onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative h-[78vh] w-[92vw] max-w-4xl overflow-hidden rounded-2xl">
        <Image src={GALLERY[i].src} alt={GALLERY[i].alt} fill sizes="92vw" className="object-contain" />
      </motion.div>
    </motion.div>
  );
}

/* ───────────── OPTION 6 — Scroll-getriebene Filmstrip (pinned) ───────────── */
export function GalleryScrollX() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-78%"]);
  return (
    <section id="galerie" ref={ref} className="relative h-[320vh] bg-cream">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="px-6"><Head /></div>
        <motion.div style={{ x }} className="mt-10 flex gap-6 pl-[6vw]">
          {GALLERY.map((img, i) => (
            <figure key={i} className="relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-[1.75rem] shadow-2xl sm:w-[46vw] lg:w-[34vw]">
              <Image src={img.src} alt={img.alt} fill sizes="46vw" className="object-cover" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-1.5 text-sm font-medium text-walnut">{img.alt}</figcaption>
            </figure>
          ))}
        </motion.div>
        <p className="mt-6 text-center text-sm text-walnut/55">↓ Scrolle – die Galerie läuft seitwärts</p>
      </div>
    </section>
  );
}

/* ───────────── OPTION 7 — 3D-Coverflow ───────────── */
export function GalleryCoverflow() {
  const [active, setActive] = useState(2);
  const n = GALLERY.length;
  return (
    <section id="galerie" className="overflow-hidden bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <Head />
      <div className="relative mx-auto mt-12 h-[24rem] max-w-5xl [perspective:1600px] sm:h-[28rem]">
        {GALLERY.map((img, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          return (
            <motion.figure
              key={i}
              onClick={() => setActive(i)}
              animate={{
                x: `${off * 42}%`,
                rotateY: off * -32,
                scale: abs === 0 ? 1 : 0.82,
                zIndex: 50 - abs,
                opacity: abs > 2.5 ? 0 : 1,
                filter: abs === 0 ? "brightness(1)" : "brightness(0.7)",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
              className="absolute left-1/2 top-1/2 h-[20rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[1.5rem] shadow-2xl sm:h-[24rem] sm:w-[18rem]"
            >
              <Image src={img.src} alt={img.alt} fill sizes="18rem" className="object-cover" />
            </motion.figure>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={() => setActive((p) => (p - 1 + n) % n)} className="grid h-12 w-12 place-items-center rounded-full bg-walnut text-cream transition-colors hover:bg-terracotta"><ChevronLeft size={22} /></button>
        <div className="flex gap-1.5">
          {GALLERY.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-terracotta" : "w-2 bg-walnut/30"}`} />
          ))}
        </div>
        <button onClick={() => setActive((p) => (p + 1) % n)} className="grid h-12 w-12 place-items-center rounded-full bg-walnut text-cream transition-colors hover:bg-terracotta"><ChevronRight size={22} /></button>
      </div>
    </section>
  );
}

/* ───────────── OPTION 8 — Cursor-Spotlight-Reveal (Graustufen → Farbe) ───────────── */
export function GallerySpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  const grid = (color: boolean) =>
    GALLERY.slice(0, 6).map((img, i) => (
      <div key={i} className="relative aspect-square overflow-hidden rounded-2xl">
        <Image src={img.src} alt={img.alt} fill sizes="33vw" className={`object-cover ${color ? "" : "grayscale"}`} />
      </div>
    ));
  return (
    <section id="galerie" className="bg-walnut px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="text-center">
        <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-apricot">GALERIE</span>
        <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-cream">Unsere Arbeiten</h2>
        <p className="mx-auto mt-4 max-w-md text-cream/60">Beweg die Maus über die Bilder – das Licht bringt Farbe hinein.</p>
      </div>
      <div ref={ref} onMouseMove={move} className="group relative mx-auto mt-12 max-w-5xl"
        style={{ ["--x" as string]: "50%", ["--y" as string]: "50%" }}>
        <div className="grid grid-cols-2 gap-4 opacity-70 sm:grid-cols-3">{grid(false)}</div>
        <div
          className="pointer-events-none absolute inset-0 grid grid-cols-2 gap-4 sm:grid-cols-3"
          style={{
            WebkitMaskImage: "radial-gradient(circle 150px at var(--x) var(--y), #000 0%, #000 55%, transparent 100%)",
            maskImage: "radial-gradient(circle 150px at var(--x) var(--y), #000 0%, #000 55%, transparent 100%)",
          }}
        >
          {grid(true)}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 9 — Filterbares Masonry (Layout-Animation) ───────────── */
export function GalleryFilter() {
  const cats = ["Alle", ...Array.from(new Set(GALLERY.map((g) => g.cat)))];
  const [filter, setFilter] = useState("Alle");
  const [open, setOpen] = useState<number | null>(null);
  const items = GALLERY.map((g, i) => ({ ...g, i })).filter((g) => filter === "Alle" || g.cat === filter);
  return (
    <section id="galerie" className="bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${filter === c ? "text-cream" : "text-walnut/70 hover:text-walnut"}`}>
              {filter === c && <motion.span layoutId="gal-filter" className="absolute inset-0 -z-0 rounded-full bg-walnut" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              <span className="relative z-10">{c}</span>
            </button>
          ))}
        </div>
        <motion.div layout className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          <AnimatePresence>
            {items.map((img) => (
              <motion.figure
                key={img.i} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: EASE }}
                onClick={() => setOpen(img.i)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid shadow-lg"
              >
                <Image src={img.src} alt={img.alt} width={800} height={600} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute bottom-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-walnut opacity-0 transition-opacity group-hover:opacity-100">{img.cat}</span>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────── OPTION 10 — Parallax-Spalten ───────────── */
export function GalleryParallaxColumns() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const cols = [
    { y: y1, imgs: [GALLERY[0], GALLERY[3], GALLERY[6]] },
    { y: y2, imgs: [GALLERY[1], GALLERY[4], GALLERY[7]] },
    { y: y3, imgs: [GALLERY[2], GALLERY[5], GALLERY[0]] },
  ];
  return (
    <section id="galerie" ref={ref} className="overflow-hidden bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {cols.map((col, ci) => (
            <motion.div key={ci} style={{ y: col.y }} className={`flex flex-col gap-4 ${ci === 2 ? "hidden md:flex" : ""}`}>
              {col.imgs.map((img, ii) => (
                <div key={ii} className="group relative overflow-hidden rounded-2xl shadow-lg">
                  <Image src={img.src} alt={img.alt} width={800} height={1000} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
