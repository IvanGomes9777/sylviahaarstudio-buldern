"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MoveHorizontal, ZoomIn } from "lucide-react";
import { GALLERY, BEFORE_AFTER } from "@/lib/media";

/**
 * 5 Premium-Optionen für die Sektion "Galerie" – mit coolen Effekten.
 * Platzhalter-Bilder (Unsplash), später durch echte Arbeiten ersetzbar.
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
      <span className={`text-[0.7rem] font-semibold tracking-[0.35em] ${light ? "text-apricot" : "text-terracotta"}`}>GALERIE</span>
      <h2 className={`mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] ${light ? "text-cream" : "text-walnut"}`}>
        Unsere Arbeiten
      </h2>
      <p className={`mx-auto mt-4 max-w-md ${light ? "text-cream/70" : "text-walnut/65"}`}>
        Ein kleiner Einblick – Schnitte, Farben und Looks aus dem Studio.
      </p>
    </motion.div>
  );
}

/* ── Lightbox (geteilt) ── */
function Lightbox({ index, onClose }: { index: number; onClose: () => void }) {
  const [i, setI] = useState(index);
  const prev = () => setI((p) => (p - 1 + GALLERY.length) % GALLERY.length);
  const next = () => setI((p) => (p + 1) % GALLERY.length);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/90 p-4 backdrop-blur-md"
    >
      <button onClick={onClose} aria-label="Schließen" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20">
        <X size={22} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Zurück" className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20 md:left-8">
        <ChevronLeft size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Weiter" className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20 md:right-8">
        <ChevronRight size={24} />
      </button>
      <AnimatePresence mode="wait">
        <motion.div
          key={i} onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="relative h-[78vh] w-[92vw] max-w-4xl overflow-hidden rounded-2xl"
        >
          <Image src={GALLERY[i].src} alt={GALLERY[i].alt} fill sizes="92vw" className="object-contain" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ───────────── OPTION 1 — Masonry + Lightbox + Hover-Zoom ───────────── */
export function GalleryMasonry() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((img, idx) => (
            <motion.figure
              key={idx} {...reveal} transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: EASE }}
              onClick={() => setOpen(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid shadow-lg shadow-walnut/10"
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-110" />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-walnut/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-2 text-sm font-medium text-cream"><ZoomIn size={16} /> {img.alt}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────── OPTION 2 — Vorher/Nachher-Slider ───────────── */
function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [x, setX] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = (clientX: number) => {
    const r = ref.current!.getBoundingClientRect();
    setX(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div
      ref={ref}
      onPointerDown={(e) => move(e.clientX)}
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-[1.75rem] shadow-2xl shadow-walnut/20"
    >
      <Image src={after} alt="Nachher" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" draggable={false} />
      <span className="absolute right-4 top-4 rounded-full bg-walnut/80 px-3 py-1 text-xs font-semibold text-cream">Nachher</span>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <Image src={before} alt="Vorher" fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" draggable={false} />
        <span className="absolute left-4 top-4 rounded-full bg-cream/85 px-3 py-1 text-xs font-semibold text-walnut">Vorher</span>
      </div>
      <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-cream" style={{ left: `${x}%` }}>
        <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-walnut shadow-lg">
          <MoveHorizontal size={18} />
        </span>
      </div>
    </div>
  );
}
export function GalleryBeforeAfter() {
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-5xl">
        <Head />
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="mx-auto mt-12 max-w-3xl">
          <BeforeAfter before={BEFORE_AFTER[0].before} after={BEFORE_AFTER[0].after} />
          <p className="mt-4 text-center text-sm text-walnut/60">↔ Ziehen, um Vorher/Nachher zu vergleichen</p>
        </motion.div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {GALLERY.slice(0, 3).map((img, i) => (
            <motion.div key={i} {...reveal} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="relative aspect-square overflow-hidden rounded-2xl shadow-lg">
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 3 — Marquee (zwei Reihen) ───────────── */
export function GalleryMarquee() {
  const rowA = GALLERY.slice(0, 5);
  const rowB = GALLERY.slice(3).concat(GALLERY.slice(0, 2));
  const Row = ({ imgs, reverse = false }: { imgs: typeof GALLERY; reverse?: boolean }) => (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        className="flex shrink-0 gap-4 pr-4"
      >
        {[...imgs, ...imgs].map((img, i) => (
          <div key={i} className="relative h-56 w-72 shrink-0 overflow-hidden rounded-2xl shadow-lg md:h-64 md:w-80">
            <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
          </div>
        ))}
      </motion.div>
    </div>
  );
  return (
    <section id="galerie" className="scroll-mt-24 overflow-hidden bg-cream py-[clamp(4.5rem,10vw,8rem)]">
      <div className="px-6"><Head /></div>
      <div className="mt-12 space-y-4">
        <Row imgs={rowA} />
        <Row imgs={rowB} reverse />
      </div>
    </section>
  );
}

/* ───────────── OPTION 4 — Hover-Expand-Accordion ───────────── */
export function GalleryExpand() {
  const imgs = GALLERY.slice(0, 5);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="mt-12 flex h-[26rem] flex-col gap-3 md:flex-row">
          {imgs.map((img, i) => (
            <div
              key={i}
              className="group relative h-full flex-1 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hover:flex-[3.5]"
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-walnut/20 transition-opacity duration-500 group-hover:opacity-0" />
              <span className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-walnut opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {img.alt}
              </span>
            </div>
          ))}
        </motion.div>
        <p className="mt-4 text-center text-sm text-walnut/60">Fahre über die Bilder, um sie zu öffnen</p>
      </div>
    </section>
  );
}

/* ───────────── OPTION 5 — Bento-Grid + Tilt + Lightbox ───────────── */
function TiltImg({ src, alt, onClick, className }: { src: string; alt: string; onClick: () => void; className?: string }) {
  const [t, setT] = useState({ rx: 0, ry: 0 });
  return (
    <motion.div
      onClick={onClick}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setT({ rx: -((e.clientY - r.top) / r.height - 0.5) * 8, ry: ((e.clientX - r.left) / r.width - 0.5) * 8 });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0 })}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg shadow-walnut/15 ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-walnut/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
export function GalleryBento() {
  const [open, setOpen] = useState<number | null>(null);
  const spans = ["row-span-2", "", "", "col-span-2", "", "row-span-2", "", ""];
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 [perspective:1200px] md:grid-cols-4">
          {GALLERY.map((img, idx) => (
            <TiltImg key={idx} src={img.src} alt={img.alt} onClick={() => setOpen(idx)} className={spans[idx] || ""} />
          ))}
        </div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
