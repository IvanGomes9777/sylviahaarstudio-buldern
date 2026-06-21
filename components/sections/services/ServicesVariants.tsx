"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { SERVICES, type Service } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PLACEHOLDER_IMAGES as IMG } from "@/lib/media";

/**
 * 5 Premium-Optionen für die Sektion "Leistungen" – echte Services & Preise.
 * Warm-Welcoming-Cozy-Marke. Bilder = Unsplash-Platzhalter.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const EYEBROW = "Leistungen";
const HEADLINE = "Schnitt, Farbe & Pflege";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Eyebrow() {
  return <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">{EYEBROW.toUpperCase()}</span>;
}

function BookButton({ light = false }: { light?: boolean }) {
  return (
    <a
      href={SITE.contact.booking}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition-colors ${
        light ? "bg-cream text-walnut hover:bg-apricot" : "bg-terracotta text-cream shadow-terracotta/30 hover:bg-walnut"
      }`}
    >
      {SITE.cta} <ArrowUpRight size={16} />
    </a>
  );
}

/* Preiszeile mit „dotted leader" (Speisekarten-Stil) */
function PriceRow({ item, darker = false }: { item: Service; darker?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 py-2.5">
      <span className={darker ? "text-cream" : "text-walnut"}>
        {item.name}
        {item.duration && (
          <span className={`ml-2 text-xs ${darker ? "text-cream/50" : "text-walnut/45"}`}>{item.duration}</span>
        )}
      </span>
      <span className={`flex-1 translate-y-[-0.35rem] border-b border-dotted ${darker ? "border-cream/25" : "border-walnut/25"}`} />
      <span className={`whitespace-nowrap font-semibold ${darker ? "text-apricot" : "text-walnut"}`}>{item.price}</span>
    </div>
  );
}

/* ───────────── OPTION 1 — Editorial mit Kategorie-Tabs ───────────── */
export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const cat = SERVICES[active];
  return (
    <section id="leistungen" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-4xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">{HEADLINE}</h2>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {SERVICES.map((c, i) => (
            <button
              key={c.category}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active === i ? "text-cream" : "text-walnut/70 hover:text-walnut"
              }`}
            >
              {active === i && (
                <motion.span layoutId="svc-tab" className="absolute inset-0 -z-0 rounded-full bg-walnut" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10">{c.category}</span>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-[1.75rem] bg-white/70 p-[clamp(1.5rem,4vw,2.5rem)] shadow-xl shadow-walnut/10 ring-1 ring-walnut/5">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: EASE }}>
              {cat.items.map((it) => (
                <PriceRow key={it.name} item={it} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-9 flex justify-center"><BookButton /></div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 2 — Karten-Raster pro Kategorie ───────────── */
export function ServicesCards() {
  return (
    <section id="leistungen" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">{HEADLINE}</h2>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((c, i) => (
            <motion.div
              key={c.category} {...reveal} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="rounded-[1.75rem] border border-walnut/10 bg-white/70 p-7 shadow-lg shadow-walnut/10 transition-shadow hover:shadow-2xl hover:shadow-walnut/15"
            >
              <h3 className="font-script text-3xl text-walnut">{c.category}</h3>
              <div className="mt-4 divide-y divide-walnut/10">
                {c.items.map((it) => (
                  <PriceRow key={it.name} item={it} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex justify-center"><BookButton /></div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 3 — Elegante Accordions ───────────── */
export function ServicesAccordion() {
  const [open, setOpen] = useState(0);
  return (
    <section id="leistungen" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-3xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">{HEADLINE}</h2>
        </motion.div>
        <div className="mt-10 space-y-3">
          {SERVICES.map((c, i) => {
            const isOpen = open === i;
            return (
              <div key={c.category} className="overflow-hidden rounded-[1.5rem] border border-walnut/10 bg-white/70 shadow-sm">
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between px-6 py-5 text-left">
                  <span className="font-script text-2xl text-walnut">{c.category}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-terracotta">
                    <ChevronDown size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="divide-y divide-walnut/10 border-t border-walnut/10">
                          {c.items.map((it) => (
                            <PriceRow key={it.name} item={it} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="mt-9 flex justify-center"><BookButton /></div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 4 — Sticky-Bild + Preisliste ───────────── */
export function ServicesSplit() {
  return (
    <section id="leistungen" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Eyebrow />
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">{HEADLINE}</h2>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-xl shadow-walnut/20">
            <Image src={IMG.cutting} alt="Leistungen im Sylvias Haarstudio" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <div className="mt-6"><BookButton /></div>
        </div>
        <div className="space-y-9">
          {SERVICES.map((c, i) => (
            <motion.div key={c.category} {...reveal} transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}>
              <h3 className="font-script text-2xl text-walnut">{c.category}</h3>
              <div className="mt-2 divide-y divide-walnut/10">
                {c.items.map((it) => (
                  <PriceRow key={it.name} item={it} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 5 — Premium-„Speisekarte" (dunkel) ───────────── */
export function ServicesMenu() {
  return (
    <section id="leistungen" className="relative scroll-mt-24 overflow-hidden bg-walnut px-6 py-[clamp(4.5rem,10vw,8rem)] text-cream">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-terracotta/20 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-apricot">{EYEBROW.toUpperCase()}</span>
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.5rem)] leading-[0.95]">{HEADLINE}</h2>
          <p className="mx-auto mt-4 max-w-md text-cream/70">Faire Preise, ehrliche Beratung – für die ganze Familie.</p>
        </motion.div>
        <div className="mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {SERVICES.map((c, i) => (
            <motion.div key={c.category} {...reveal} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
              <h3 className="flex items-center gap-3 font-script text-3xl text-apricot">
                {c.category}
                <span className="h-px flex-1 bg-cream/20" />
              </h3>
              <div className="mt-3">
                {c.items.map((it) => (
                  <PriceRow key={it.name} item={it} darker />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex justify-center"><BookButton light /></div>
      </div>
    </section>
  );
}
