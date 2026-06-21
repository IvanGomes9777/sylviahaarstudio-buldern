"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";
import { MessageCircleHeart, Palette, Sparkles, Sun, ArrowUpRight } from "lucide-react";
import { ABOUT, ABOUT_FEATURES } from "@/lib/content";
import { SITE } from "@/lib/site";
import { PLACEHOLDER_IMAGES as IMG } from "@/lib/media";

/**
 * PREMIUM-OPTIONEN (11–15) für "Über uns".
 * Design-Philosophien als Code: Emil-Kowalski-Motion (Wort-Masken-Reveal,
 * magnetisch, federnd), High-End-Taste (editoriales Raster, Display-Typo,
 * Drop-Cap, Layering/Tiefe) und scroll-getriebene Inszenierung (Parallax,
 * Pinned-Storytelling, 3D-Tilt). Warm-Welcoming-Cozy-Marke.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS = { consult: MessageCircleHeart, color: Palette, occasion: Sparkles, cozy: Sun };

/* Emil-Style: Headline-Wörter steigen hinter einer Maske hervor */
function WordsReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* 3D-Tilt mit Maus-Tracking + Glanz */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        setT({ rx: -(py - 0.5) * 10, ry: (px - 0.5) * 12, gx: px * 100, gy: py * 100 });
      }}
      onMouseLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50 })}
      animate={{ rotateX: t.rx, rotateY: t.ry }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group\\/tilt:hover_&]:opacity-100"
        style={{ background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(255,255,255,0.55), transparent 45%)` }}
      />
      {children}
    </motion.div>
  );
}

const eyebrow = (
  <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">
    {ABOUT.eyebrow.toUpperCase()}
  </span>
);

/* ───────────── OPTION 11 — Editorial Spread (Magazin) ───────────── */
export function AboutEditorial() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between border-b border-walnut/15 pb-5">
          {eyebrow}
          <span className="font-script text-2xl text-walnut/40">est. Dülmen-Buldern</span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="font-script text-[clamp(2.75rem,1rem+7vw,5.5rem)] leading-[0.95] text-walnut">
              <WordsReveal text={ABOUT.headline} />
            </h2>
            <p className="mt-7 max-w-md text-[clamp(1.05rem,1rem+0.4vw,1.25rem)] leading-relaxed text-walnut/80 [&::first-letter]:float-left [&::first-letter]:mr-3 [&::first-letter]:font-script [&::first-letter]:text-[3.5rem] [&::first-letter]:leading-[0.7] [&::first-letter]:text-terracotta">
              {ABOUT.intro}
            </p>
            <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-walnut/10">
              {ABOUT_FEATURES.map((f) => (
                <div key={f.title} className="bg-cream p-5">
                  <dt className="font-semibold text-walnut">{f.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-walnut/60">{f.desc}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div ref={ref} className="relative h-[clamp(22rem,55vw,34rem)] overflow-hidden rounded-[2rem] shadow-2xl shadow-walnut/25">
            <motion.div style={{ y }} className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image src={IMG.salonInterior} alt="Im Sylvias Haarstudio" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
            </motion.div>
            <div className="absolute bottom-4 left-4 rounded-full bg-cream/90 px-4 py-2 text-xs tracking-wide text-walnut backdrop-blur">
              Unser Salon — hell, ruhig, persönlich
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 12 — Pinned Sticky Storytelling ───────────── */
export function AboutPinned() {
  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(3rem,7vw,5rem)]">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          {eyebrow}
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.5rem)] leading-[0.95] text-walnut">
            <WordsReveal text={ABOUT.headline} />
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-walnut/75">{ABOUT.intro}</p>
          <a
            href={SITE.contact.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30 transition-colors hover:bg-walnut"
          >
            {SITE.cta} <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="space-y-6">
          {ABOUT_FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-walnut/10 bg-white/70 p-7 shadow-lg shadow-walnut/10 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-walnut/20"
              >
                <span className="absolute right-6 top-6 font-script text-5xl text-walnut/10 transition-colors group-hover:text-terracotta/25">
                  0{i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/12 text-terracotta">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-walnut">{f.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-walnut/65">{f.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 13 — Kinetic Words (Statement) ───────────── */
export function AboutKinetic() {
  return (
    <section id="ueber-uns" className="relative scroll-mt-24 overflow-hidden bg-walnut px-6 py-[clamp(5rem,11vw,9rem)] text-cream">
      <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-terracotta/30 blur-[90px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-apricot/20 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-apricot">{ABOUT.eyebrow.toUpperCase()}</span>
        <p className="mt-7 font-script text-[clamp(2.25rem,1rem+5.5vw,4.5rem)] leading-[1.08]">
          <WordsReveal text={ABOUT.intro} />
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {ABOUT_FEATURES.map((f) => (
            <span key={f.title} className="rounded-full border border-cream/25 px-5 py-2 text-sm text-cream/90 transition-colors hover:border-apricot hover:text-apricot">
              {f.title}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 14 — 3D-Tilt Glass-Cards auf Gradient-Mesh ───────────── */
export function AboutTilt() {
  const stagger: Variants = { show: { transition: { staggerChildren: 0.1 } } };
  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <section id="ueber-uns" className="relative scroll-mt-24 overflow-hidden px-6 py-[clamp(4.5rem,10vw,8rem)]">
      {/* warmes Gradient-Mesh */}
      <div className="absolute inset-0 -z-10 bg-cream" />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(40% 50% at 15% 20%, rgba(204,119,85,0.22), transparent 60%), radial-gradient(45% 45% at 85% 25%, rgba(244,164,96,0.22), transparent 60%), radial-gradient(50% 50% at 60% 90%, rgba(156,175,136,0.20), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow}
        <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">
          <WordsReveal text={ABOUT.headline} />
        </h2>
        <p className="mt-5 leading-relaxed text-walnut/75">{ABOUT.intro}</p>
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-12 grid max-w-5xl gap-6 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4"
      >
        {ABOUT_FEATURES.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <motion.div key={f.title} variants={item} className="group/tilt">
              <TiltCard className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/55 p-6 shadow-xl shadow-walnut/10 backdrop-blur-md">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/15 text-terracotta" style={{ transform: "translateZ(40px)" }}>
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-semibold text-walnut" style={{ transform: "translateZ(28px)" }}>{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-walnut/65" style={{ transform: "translateZ(18px)" }}>{f.desc}</p>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ───────────── OPTION 15 — Cinematic Clip-Reveal + Layering ───────────── */
export function AboutCinematic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  return (
    <section id="ueber-uns" className="scroll-mt-24 bg-cream px-6 py-[clamp(4rem,9vw,7rem)]">
      <div ref={ref} className="relative mx-auto max-w-6xl">
        {/* großes Bild mit Vorhang-Clip-Reveal */}
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={inView ? { clipPath: "inset(0 0 0% 0)" } : {}}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative h-[clamp(20rem,52vw,32rem)] overflow-hidden rounded-[2rem] shadow-2xl shadow-walnut/30"
        >
          <motion.div style={{ y }} className="absolute inset-x-0 -top-[6%] h-[116%]">
            <Image src={IMG.salonStyling} alt="Sylvias Haarstudio" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-walnut/70 via-walnut/10 to-transparent" />
          <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.65rem] tracking-[0.4em] text-cream/80 lg:block">
            SYLVIAS · HAARSTUDIO
          </span>
        </motion.div>

        {/* überlappende Glas-Karte */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="relative z-10 mx-auto -mt-20 max-w-3xl rounded-[2rem] border border-white/60 bg-cream/85 p-[clamp(1.5rem,4vw,3rem)] shadow-2xl shadow-walnut/20 backdrop-blur-xl md:-mt-24"
        >
          {eyebrow}
          <h2 className="mt-3 font-script text-[clamp(2.25rem,1rem+5vw,3.75rem)] leading-[1] text-walnut">
            <WordsReveal text={ABOUT.headline} delay={0.5} />
          </h2>
          <p className="mt-4 leading-relaxed text-walnut/80">{ABOUT.intro}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {ABOUT_FEATURES.map((f) => (
              <span key={f.title} className="inline-flex items-center gap-2 text-sm font-medium text-walnut/80">
                <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                {f.title}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
