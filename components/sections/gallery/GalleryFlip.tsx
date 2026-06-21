"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { GALLERY } from "@/lib/media";
import { InstagramButton } from "./GalleryRefined";

/**
 * Galerie mit GSAP-Flip: beim Filtern ordnen sich die Bilder flüssig um
 * (Flip-Technik). Behält die Instagram-Profilzeile als Kopf.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const FILTERS = [
  { label: "Alle", key: "all" },
  { label: "Schnitt", key: "Schnitt" },
  { label: "Farbe", key: "Farbe" },
  { label: "Styling", key: "Styling" },
  { label: "Salon", key: "Salon" },
];

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

export function GalleryFlip() {
  const [key, setKey] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="galerie" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        {/* Kopf */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">GALERIE</span>
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Unsere Arbeiten</h2>
        </motion.div>
        <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 rounded-[1.75rem] border border-walnut/10 bg-white/70 p-6 text-center sm:flex-row sm:text-left">
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
        </div>

        {/* Filter-Chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setKey(f.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${key === f.key ? "text-cream" : "text-walnut/70 hover:text-walnut"}`}
            >
              {key === f.key && (
                <motion.span layoutId="flip-filter" className="absolute inset-0 -z-0 rounded-full bg-walnut" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </div>

        {/* Flip-Galerie */}
        <FlipReveal
          keys={[key]}
          showClass="block"
          hideClass="hidden"
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {GALLERY.map((img, i) => (
            <FlipRevealItem key={i} flipKey={img.cat}>
              <button onClick={() => setOpen(i)} className="group relative block aspect-square w-full overflow-hidden rounded-2xl shadow-md shadow-walnut/10">
                <Image src={img.src} alt={img.alt} fill sizes="33vw" className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-walnut/65 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-cream">{img.alt}</span>
                </span>
                <span className="absolute right-2 top-2 rounded-full bg-cream/85 px-2.5 py-1 text-[0.65rem] font-semibold text-walnut opacity-0 transition-opacity duration-300 group-hover:opacity-100">{img.cat}</span>
              </button>
            </FlipRevealItem>
          ))}
        </FlipReveal>

        <div className="mt-10 flex justify-center"><InstagramButton /></div>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
