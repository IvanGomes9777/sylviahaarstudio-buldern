"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/media";
import { SITE } from "@/lib/site";

/**
 * VERFEINERTE GALERIE-OPTIONEN – elegant & markengerecht (Warm-Cozy),
 * nach Web-Recherche: Slide-up-Captions, sanfte Gradient-Overlays, dezenter
 * Zoom, Sweep-Reveal, Clip-Path. Plus Instagram-Anbindung (Folgen-Button).
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const IG_HANDLE = "@sylvias.haarstudio";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Head() {
  return (
    <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
      <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">GALERIE</span>
      <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Unsere Arbeiten</h2>
    </motion.div>
  );
}

export function InstagramButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.contact.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-magenta/20 transition-transform hover:scale-105 ${className}`}
    >
      <Instagram size={18} /> Auf Instagram folgen
    </a>
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

/* ───────────── OPTION A — Instagram-Feed (empfohlen) ───────────── */
export function GalleryInstagram() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-5xl">
        <Head />

        {/* IG-Profilzeile */}
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-4 rounded-[1.75rem] border border-walnut/10 bg-white/70 p-6 text-center sm:flex-row sm:text-left">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] p-[3px]">
            <span className="grid h-full w-full place-items-center rounded-full bg-cream">
              <Image src="/sylvialogo.png" alt="Sylvias Haarstudio" width={120} height={66} className="h-7 w-auto" />
            </span>
          </span>
          <div className="flex-1">
            <p className="font-semibold text-walnut">{IG_HANDLE}</p>
            <p className="text-sm text-walnut/60">Aktuelle Looks & Inspiration aus dem Studio</p>
          </div>
          <InstagramButton />
        </motion.div>

        {/* Feed-Grid */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {GALLERY.map((img, i) => (
            <motion.button
              key={i} {...reveal} transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-walnut/45 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 font-semibold text-cream"><Heart size={18} fill="currentColor" /> ansehen</span>
              </div>
              <Instagram size={16} className="absolute right-2 top-2 text-cream opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>

        <div className="mt-9 flex justify-center"><InstagramButton /></div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────── OPTION B — Masonry + Slide-up-Caption + Sweep ───────────── */
export function GalleryMasonryRefined() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {GALLERY.map((img, i) => (
            <motion.figure
              key={i} {...reveal} transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: EASE }}
              onClick={() => setOpen(i)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid shadow-md shadow-walnut/10"
            >
              <Image src={img.src} alt={img.alt} width={800} height={600} className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
              {/* Sweep-Overlay */}
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-walnut/80 via-walnut/20 to-transparent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" />
              {/* Slide-up Caption */}
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-apricot">{img.cat}</span>
                <p className="font-medium text-cream">{img.alt}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><InstagramButton /></div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────── OPTION C — Cleaner Zoom/Fade-Grid ───────────── */
export function GalleryClean() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALLERY.map((img, i) => (
            <motion.button
              key={i} {...reveal} transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: EASE }}
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md shadow-walnut/10"
            >
              <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover grayscale-[0.15] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:grayscale-0" />
              <span className="absolute inset-0 bg-gradient-to-t from-walnut/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-medium text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{img.alt}</span>
            </motion.button>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><InstagramButton /></div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

/* ───────────── OPTION D — Clip-Path-Reveal beim Scrollen ───────────── */
export function GalleryClipReveal() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((img, i) => (
            <motion.figure
              key={i}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: EASE }}
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl shadow-md shadow-walnut/10"
            >
              <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105" />
              <span className="absolute inset-0 bg-walnut/0 transition-colors duration-300 group-hover:bg-walnut/15" />
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><InstagramButton /></div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
