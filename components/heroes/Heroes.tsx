"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { PLACEHOLDER_IMAGES as IMG } from "@/lib/media";

/**
 * 5 Hero-Optionen für Sylvias Haarstudio – alle in der freigegebenen
 * Warm-Welcoming-Cozy-Marke (Walnut/Creme/Terracotta), aber bewusst sehr
 * unterschiedliche Layouts & Stimmungen ("Überrasch mich").
 * Bilder = Unsplash-Platzhalter, später durch echte Fotos ersetzbar.
 */

const ease = [0.22, 1, 0.36, 1] as const;

function CTAs({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <motion.a
        href={SITE.contact.booking}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30 transition-colors hover:bg-walnut"
      >
        {SITE.cta} <ArrowRight size={16} />
      </motion.a>
      <a
        href={`tel:${SITE.contact.phoneHref}`}
        className={`inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold transition-colors ${
          dark
            ? "border-cream/40 text-cream hover:bg-cream hover:text-walnut"
            : "border-walnut/30 text-walnut hover:bg-walnut hover:text-cream"
        }`}
      >
        {SITE.contact.phone}
      </a>
    </div>
  );
}

function RatingBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-cream/80 px-4 py-2 text-sm text-walnut shadow-sm ring-1 ring-walnut/10 backdrop-blur">
      <span className="flex text-apricot">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span className="font-semibold">{SITE.rating.value.toString().replace(".", ",")}</span>
      <span className="text-walnut/60">· {SITE.rating.count} Google-Bewertungen</span>
    </div>
  );
}

/* ───────────────────────── OPTION A — Vollbild-Foto + Overlay ───────────────────────── */
export function HeroFullBleed() {
  return (
    <section id="start" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <Image src={IMG.salonStyling} alt="Styling im Sylvias Haarstudio" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-walnut/70 via-walnut/45 to-walnut/80" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 text-center text-cream">
        <motion.span
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          className="mb-5 inline-block rounded-full border border-cream/40 px-4 py-1.5 text-[0.7rem] tracking-[0.25em]"
        >
          {SITE.brandLine}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-script text-[clamp(3rem,1rem+11vw,6.5rem)] leading-[0.95]"
        >
          {SITE.slogan}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mx-auto mt-5 max-w-xl text-cream/85"
        >
          Persönliche Beratung, ehrliches Handwerk und Zeit für dich – mitten in Dülmen-Buldern.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}
          className="mt-9 flex justify-center"
        >
          <CTAs dark />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION B — Split / Editorial ───────────────────────── */
export function HeroSplit() {
  return (
    <section id="start" className="bg-cream">
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-6 pt-24 pb-12 lg:grid-cols-2 lg:gap-16 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }}
        >
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">{SITE.brandLine}</span>
          <h1 className="mt-4 font-script text-[clamp(2.75rem,1rem+8vw,5.5rem)] leading-[1] text-walnut">
            {SITE.slogan}
          </h1>
          <p className="mt-5 max-w-md text-[clamp(1rem,0.95rem+0.4vw,1.2rem)] text-walnut/70">
            Vom schnellen Schnitt bis zur großen Typveränderung – bei uns fühlst du dich gut aufgehoben.
          </p>
          <div className="mt-8"><CTAs /></div>
          <div className="mt-7"><RatingBadge /></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-walnut/20"
        >
          <Image src={IMG.washCut} alt="Haarschnitt im Sylvias Haarstudio" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION C — Polaroid-Collage (authentisch) ───────────────────────── */
export function HeroCollage() {
  const shots = [
    { src: IMG.cutting, rot: "-rotate-6", mt: "mt-0" },
    { src: IMG.salonInterior, rot: "rotate-3", mt: "mt-8" },
    { src: IMG.hairDetail, rot: "-rotate-2", mt: "mt-2" },
  ];
  return (
    <section id="start" className="bg-cream px-6 pt-28 pb-16">
      <div className="mx-auto max-w-5xl text-center">
        <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
          className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">
          {SITE.brandLine}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-4 font-script text-[clamp(2.75rem,1rem+9vw,6rem)] leading-[1] text-walnut">
          {SITE.slogan}
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }}
          className="mt-8 flex justify-center"><CTAs /></motion.div>
      </div>
      <div className="mx-auto mt-14 flex max-w-4xl flex-wrap items-start justify-center gap-5">
        {shots.map((s, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40, rotate: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 + i * 0.12, ease }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className={`${s.mt} ${s.rot} w-[clamp(9rem,40vw,15rem)] rounded-md bg-white p-3 pb-6 shadow-xl shadow-walnut/20 transition-transform`}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <Image src={s.src} alt="Arbeit aus dem Sylvias Haarstudio" fill sizes="240px" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-center font-script text-xl text-walnut/70">Sylvias</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION D — Zentriert luftig + Bildstreifen unten ───────────────────────── */
export function HeroAiryStrip() {
  const strip = [IMG.salonStyling, IMG.washCut, IMG.cutting, IMG.hairDetail];
  return (
    <section id="start" className="flex min-h-[100svh] flex-col bg-cream">
      <div className="flex flex-1 flex-col items-center justify-center px-6 pt-28 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          className="mb-6 inline-block rounded-full border border-walnut/20 px-4 py-1.5 text-[0.7rem] tracking-[0.3em] text-walnut/70">
          {SITE.brandLine}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
          className="max-w-4xl font-script text-[clamp(3rem,1rem+11vw,7rem)] leading-[0.95] text-walnut">
          {SITE.slogan}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-6 max-w-lg text-walnut/65">
          Dein Friseur in Dülmen-Buldern – hell, freundlich und kinderfreundlich.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease }}
          className="mt-9"><CTAs /></motion.div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 px-1.5 pb-1.5 md:grid-cols-4">
        {strip.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease }}
            className="group relative aspect-[4/3] overflow-hidden rounded-t-2xl"
          >
            <Image src={src} alt="Eindruck aus dem Salon" fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION E — Organische Form + Trust-Signale ───────────────────────── */
export function HeroOrganic() {
  const today = SITE.hours[(new Date().getDay() + 6) % 7]; // Mo=0 … So=6
  return (
    <section id="start" className="bg-cream">
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-6 pt-24 pb-12 lg:grid-cols-[1.1fr_1fr] lg:pt-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <RatingBadge />
          <h1 className="mt-6 font-script text-[clamp(2.75rem,1rem+8.5vw,5.75rem)] leading-[1] text-walnut">
            {SITE.slogan}
          </h1>
          <p className="mt-5 max-w-md text-[clamp(1rem,0.95rem+0.4vw,1.2rem)] text-walnut/70">
            Schnitt, Farbe & Pflege mit Herz – seit Jahren der Lieblingssalon in der Nachbarschaft.
          </p>
          <div className="mt-8"><CTAs /></div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-walnut/70">
            <span className="inline-flex items-center gap-2">
              <Clock size={15} className="text-terracotta" />
              Heute: {today.open ? today.time : "Geschlossen"}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-terracotta" />
              {SITE.contact.street}, {SITE.contact.city}
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden shadow-2xl shadow-walnut/25"
          style={{ borderRadius: "58% 42% 47% 53% / 42% 45% 55% 58%" }}
        >
          <Image src={IMG.hairDetail} alt="Haarfarbe & Pflege im Sylvias Haarstudio" fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEITERE 5 OPTIONEN (F–J) – neue Layout-Ideen, gleiche Warm-Cozy-Marke
   ═══════════════════════════════════════════════════════════════════════════ */

/* ───────────────────────── OPTION F — Bento-Grid ───────────────────────── */
export function HeroBento() {
  return (
    <section id="start" className="bg-cream">
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-6 pt-24 pb-12 lg:grid-cols-2 lg:gap-14 lg:pt-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">{SITE.brandLine}</span>
          <h1 className="mt-4 font-script text-[clamp(2.75rem,1rem+8vw,5.5rem)] leading-[1] text-walnut">{SITE.slogan}</h1>
          <p className="mt-5 max-w-md text-walnut/70">Schnitt, Farbe & Pflege für die ganze Familie – persönlich und ohne Stress.</p>
          <div className="mt-8"><CTAs /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="grid grid-cols-2 grid-rows-2 gap-3" style={{ height: "min(80vh, 36rem)" }}>
          <div className="group relative row-span-2 overflow-hidden rounded-[1.75rem] shadow-xl">
            <Image src={IMG.washCut} alt="Haarschnitt" fill priority sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="group relative overflow-hidden rounded-[1.75rem] shadow-xl">
            <Image src={IMG.cutting} alt="Styling" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="group relative overflow-hidden rounded-[1.75rem] bg-terracotta/10 shadow-xl">
            <Image src={IMG.hairDetail} alt="Farbe & Pflege" fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION G — Foto + überlappende Info-Karte ───────────────────────── */
export function HeroFloatingCard() {
  const today = SITE.hours[(new Date().getDay() + 6) % 7];
  return (
    <section id="start" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Image src={IMG.salonInterior} alt="Sylvias Haarstudio Innenraum" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-walnut/80 via-walnut/40 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20">
        <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease }} className="max-w-xl text-cream">
          <span className="mb-4 inline-block rounded-full border border-cream/40 px-4 py-1.5 text-[0.7rem] tracking-[0.25em]">{SITE.brandLine}</span>
          <h1 className="font-script text-[clamp(2.75rem,1rem+9vw,6rem)] leading-[0.95]">{SITE.slogan}</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-10 max-w-md rounded-[1.75rem] bg-cream/95 p-6 shadow-2xl backdrop-blur">
          <RatingBadge />
          <div className="mt-4 flex items-center gap-2 text-sm text-walnut/75">
            <Clock size={15} className="text-terracotta" /> Heute: {today.open ? today.time : "Geschlossen"}
            <span className="mx-1">·</span>
            <MapPin size={15} className="text-terracotta" /> {SITE.contact.city}-{SITE.contact.district}
          </div>
          <div className="mt-5"><CTAs /></div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION H — Torbogen / Arch ───────────────────────── */
export function HeroArch() {
  return (
    <section id="start" className="flex min-h-[100svh] flex-col items-center justify-center bg-cream px-6 pt-28 pb-12 text-center">
      <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}
        className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">{SITE.brandLine}</motion.span>
      <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}
        className="mt-3 max-w-3xl font-script text-[clamp(2.5rem,1rem+8vw,5.5rem)] leading-[1] text-walnut">{SITE.slogan}</motion.h1>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease }}
        className="group relative mt-8 w-[clamp(15rem,60vw,24rem)] overflow-hidden shadow-2xl shadow-walnut/25"
        style={{ aspectRatio: "3/4", borderRadius: "100vw 100vw 1.5rem 1.5rem" }}>
        <Image src={IMG.washCut} alt="Frisur aus dem Sylvias Haarstudio" fill priority sizes="(max-width:768px) 60vw, 24rem" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }} className="mt-9"><CTAs /></motion.div>
    </section>
  );
}

/* ───────────────────────── OPTION I — Diagonaler Split ───────────────────────── */
export function HeroDiagonal() {
  return (
    <section id="start" className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream">
      <div className="absolute inset-y-0 right-0 hidden w-[52%] lg:block" style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)" }}>
        <Image src={IMG.salonStyling} alt="Styling im Salon" fill priority sizes="52vw" className="object-cover" />
        <div className="absolute inset-0 bg-walnut/10" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:pt-12">
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="max-w-xl">
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">{SITE.brandLine}</span>
          <h1 className="mt-4 font-script text-[clamp(2.75rem,1rem+9vw,6rem)] leading-[1] text-walnut">{SITE.slogan}</h1>
          <p className="mt-5 max-w-md text-walnut/70">Ein freundlicher Salon mit Zeit für dich – Schnitt, Farbe & Pflege in Dülmen-Buldern.</p>
          <div className="mt-8"><CTAs /></div>
          <div className="mt-7"><RatingBadge /></div>
        </motion.div>
        {/* Mobile image */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] shadow-xl lg:hidden">
          <Image src={IMG.salonStyling} alt="Styling im Salon" fill sizes="100vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────── OPTION J — Sticker / handgezeichnet ───────────────────────── */
export function HeroSticker() {
  return (
    <section id="start" className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream px-6 pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">{SITE.brandLine}</span>
          <h1 className="mt-4 font-script text-[clamp(2.75rem,1rem+9vw,6rem)] leading-[1] text-walnut">
            {SITE.slogan}
            <svg viewBox="0 0 300 18" className="mt-1 h-4 w-[min(20rem,80%)] text-terracotta" fill="none" preserveAspectRatio="none">
              <path d="M2 12 C 80 4, 220 4, 298 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </h1>
          <p className="mt-4 max-w-md text-walnut/70">Hereinspaziert! Bei uns gibt's gute Laune, warme Getränke und Frisuren, die sitzen.</p>
          <div className="mt-8"><CTAs /></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mx-auto aspect-square w-[clamp(14rem,55vw,22rem)]">
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-2xl shadow-walnut/25">
            <Image src={IMG.hairDetail} alt="Frisur aus dem Sylvias Haarstudio" fill priority sizes="(max-width:1024px) 55vw, 22rem" className="object-cover" />
          </div>
          {/* rotierender Sticker-Badge */}
          <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer"
            className="absolute -bottom-3 -right-3 grid h-24 w-24 place-items-center rounded-full bg-terracotta text-cream shadow-lg sm:h-28 sm:w-28">
            <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 14, ease: "linear" }}>
              <defs><path id="circlePath" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" /></defs>
              <text fontSize="11" fill="currentColor" letterSpacing="2">
                <textPath href="#circlePath">JETZT · TERMIN BUCHEN · ONLINE · </textPath>
              </text>
            </motion.svg>
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
