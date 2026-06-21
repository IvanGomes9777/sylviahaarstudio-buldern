"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

// Logo auf dunklem Hintergrund als edles Weiß-Monochrom.
const whiteLogo = { filter: "brightness(0) invert(1)" } as const;

/**
 * OPTION 4 – LUXURY-GOLD-GLAMOROUS
 * Konzept: Zentriertes Monogramm-Logo, symmetrische Navigation links/rechts,
 * Champagne-Gold-Linien fahren als ornamentaler Divider ein. Sehr edel, viel
 * negativer Raum, Cormorant-Serif. Beim Scrollen verdichtet sich die schwarze Bar.
 */
export default function NavbarLuxuryGold() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  const left = SITE.nav.slice(0, 2);
  const right = SITE.nav.slice(2);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(13,13,13,0.92)" : "rgba(13,13,13,0.4)",
          paddingTop: scrolled ? "0.65rem" : "1.1rem",
          paddingBottom: scrolled ? "0.65rem" : "1.1rem",
        }}
        transition={{ duration: 0.45 }}
        className="backdrop-blur-md"
      >
        <nav className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-[clamp(1rem,4vw,2.5rem)]">
          {/* Left links (desktop) */}
          <ul className="hidden items-center gap-8 lg:flex">
            {left.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-[0.72rem] tracking-[0.26em] text-champagne/75 transition-colors hover:text-champagne"
                >
                  {item.label.toUpperCase()}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle (left) */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            className="justify-self-start text-champagne lg:hidden"
          >
            <Menu size={22} strokeWidth={1.3} />
          </button>

          {/* Center logo */}
          <a href="#start" className="flex flex-col items-center px-2 text-center">
            <Image
              src="/sylvialogo.png"
              alt="Sylvias Haarstudio"
              width={512}
              height={280}
              priority
              style={whiteLogo}
              className="h-[clamp(2.2rem,4.5vw,3rem)] w-auto"
            />
            <span className="mt-1.5 flex items-center gap-2 text-[0.5rem] tracking-[0.4em] text-champagne/60">
              <span className="h-px w-5 bg-champagne/40" />
              {SITE.brandLine}
              <span className="h-px w-5 bg-champagne/40" />
            </span>
          </a>

          {/* Right links + CTA (desktop) */}
          <ul className="hidden items-center justify-end gap-8 lg:flex">
            {right.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-[0.72rem] tracking-[0.26em] text-champagne/75 transition-colors hover:text-champagne"
                >
                  {item.label.toUpperCase()}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#kontakt"
                className="border border-champagne/50 px-5 py-2 text-[0.68rem] tracking-[0.22em] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-ink"
              >
                {SITE.cta.toUpperCase()}
              </a>
            </li>
          </ul>

          {/* Mobile spacer right */}
          <span className="lg:hidden" />
        </nav>
      </motion.div>

      {/* Ornamental gold divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        className="h-px origin-center bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Image
                src="/sylvialogo.png"
                alt="Sylvias Haarstudio"
                width={512}
                height={280}
                style={whiteLogo}
                className="h-9 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="text-champagne"
              >
                <X size={22} strokeWidth={1.3} />
              </button>
            </div>
            <ul className="mt-10 flex flex-col items-center gap-1">
              {SITE.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.09 * i + 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-cormorant text-3xl tracking-[0.1em] text-champagne/90"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="border border-champagne px-8 py-3.5 text-sm tracking-[0.22em] text-champagne"
              >
                {SITE.cta.toUpperCase()}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
