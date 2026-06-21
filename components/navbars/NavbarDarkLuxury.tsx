"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Scissors } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * OPTION 1 – DARK-LUXURY-CINEMATIC
 * Konzept: Transparente Bar über dem Hero, die beim Scrollen in frosted
 * Glassmorphism + Gold-Hairline übergeht. Gold-Underline „wischt" unter Links ein,
 * CTA mit Gold-Fill-Hover. Logo mit Schere-Icon, Letter-Spacing für Luxus.
 */
export default function NavbarDarkLuxury() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(15,15,15,0.72)" : "rgba(15,15,15,0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          borderColor: scrolled ? "rgba(212,175,55,0.25)" : "rgba(212,175,55,0)",
        }}
        transition={{ duration: 0.4 }}
        className="border-b"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-[clamp(1rem,4vw,2.5rem)] py-[clamp(0.85rem,1.6vw,1.25rem)]">
          {/* Logo */}
          <a href="#start" className="group flex items-center gap-2.5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold transition-transform duration-500 group-hover:rotate-[120deg]">
              <Scissors size={17} />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-[clamp(1.15rem,2.2vw,1.5rem)] tracking-[0.12em] text-white">
                {SITE.name.toUpperCase()}
              </span>
              <span className="block text-[0.6rem] tracking-[0.42em] text-gold/80">
                {SITE.brandLine}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-9 lg:flex">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-sm tracking-[0.18em] text-white/80 transition-colors hover:text-white"
                >
                  {item.label.toUpperCase()}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#kontakt"
              className="group/cta relative inline-flex items-center overflow-hidden rounded-full border border-gold px-7 py-2.5 text-sm tracking-[0.16em] text-gold transition-colors duration-500 hover:text-ink"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cta:scale-x-100" />
              <span className="relative z-10">{SITE.cta.toUpperCase()}</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-serif text-xl tracking-[0.12em] text-white">
                {SITE.name.toUpperCase()}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white"
              >
                <X size={20} />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
              className="mt-6 flex flex-col gap-2 px-6"
            >
              {SITE.nav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-serif text-2xl text-white/90"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="mt-6"
              >
                <a
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-gold py-4 text-center text-sm font-semibold tracking-[0.16em] text-ink"
                >
                  {SITE.cta.toUpperCase()}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
