"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/media";
import { SITE } from "@/lib/site";
import { InstagramButton } from "./GalleryRefined";

/**
 * GALERIE V2 – behält die geliebte Instagram-Profilzeile, bringt darunter aber
 * strukturell ganz unterschiedliche Layouts (kein generisches Hover-Raster):
 * Polaroid-Pinboard, Featured + Thumbnails, Swipe-Carousel, Editorial-Mosaik.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

/* Geliebte Instagram-Profilzeile (wiederverwendbar) */
function InstagramHeader() {
  return (
    <>
      <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
        <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">GALERIE</span>
        <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Unsere Arbeiten</h2>
      </motion.div>
      <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 rounded-[1.75rem] border border-walnut/10 bg-white/70 p-6 text-center sm:flex-row sm:text-left">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] p-[3px]">
          <span className="grid h-full w-full place-items-center rounded-full bg-cream">
            <Image src="/sylvialogo.png" alt="Sylvias Haarstudio" width={120} height={66} className="h-7 w-auto" />
          </span>
        </span>
        <div className="flex-1">
          <p className="font-semibold text-walnut">@sylvias.haarstudio</p>
          <p className="text-sm text-walnut/60">Aktuelle Looks & Inspiration aus dem Studio</p>
        </div>
        <InstagramButton />
      </motion.div>
    </>
  );
}

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

/* ───────────── OPTION E — Polaroid-Pinboard ───────────── */
export function GalleryPolaroid() {
  const [open, setOpen] = useState<number | null>(null);
  const rots = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1", "-rotate-3", "rotate-2"];
  const tops = ["mt-0", "mt-10", "mt-4", "mt-12", "mt-2", "mt-8", "mt-6", "mt-0"];
  return (
    <section id="galerie" className="scroll-mt-24 bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_60%)] bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <InstagramHeader />
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-6 gap-y-8">
          {GALLERY.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
              onClick={() => setOpen(i)}
              className={`${rots[i % rots.length]} ${tops[i % tops.length]} relative w-[clamp(8.5rem,22vw,12rem)] cursor-pointer rounded-sm bg-white p-2.5 pb-7 shadow-xl shadow-walnut/25 transition-transform`}
            >
              <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-terracotta/70 shadow" />
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={img.src} alt={img.alt} fill sizes="200px" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-center font-script text-lg text-walnut/70">{img.cat}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────── OPTION F — Großes Featured-Bild + Thumbnails ───────────── */
export function GalleryFeatured() {
  const [active, setActive] = useState(0);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <InstagramHeader />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-walnut/20">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="absolute inset-0">
                <Image src={GALLERY[active].src} alt={GALLERY[active].alt} fill sizes="60vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/55 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-apricot">{GALLERY[active].cat}</span>
                  <p className="font-script text-2xl text-cream">{GALLERY[active].alt}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-3">
            {GALLERY.map((img, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden rounded-xl transition-all duration-300 ${active === i ? "ring-2 ring-terracotta ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100"}`}>
                <Image src={img.src} alt={img.alt} fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION G — Horizontale Swipe-Carousel ───────────── */
export function GalleryCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section id="galerie" className="scroll-mt-24 overflow-hidden bg-cream py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl px-6"><InstagramHeader /></div>
      <div className="relative mt-12">
        <div ref={ref} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.5rem,calc((100vw-72rem)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GALLERY.map((img, i) => (
            <motion.figure
              key={i} {...reveal} transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
              className="group relative aspect-[3/4] w-[72vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] shadow-xl sm:w-[20rem]"
            >
              <Image src={img.src} alt={img.alt} fill sizes="20rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 font-script text-2xl text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">{img.cat}</figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full bg-walnut text-cream transition-colors hover:bg-terracotta"><ChevronLeft size={22} /></button>
          <button onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full bg-walnut text-cream transition-colors hover:bg-terracotta"><ChevronRight size={22} /></button>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION H — Editorial-Mosaik (asymmetrisch) ───────────── */
export function GalleryEditorial() {
  const [open, setOpen] = useState<number | null>(null);
  // bewusst unterschiedliche Kachelgrößen für ein redaktionelles Mosaik
  const spans = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <InstagramHeader />
        <div className="mt-12 grid auto-rows-[10rem] grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
          {GALLERY.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: EASE }}
              onClick={() => setOpen(i)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl shadow-md shadow-walnut/10 ${spans[i % spans.length]}`}
            >
              <Image src={img.src} alt={img.alt} fill sizes="50vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-walnut/65 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-script text-xl text-cream">{img.alt}</span>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
