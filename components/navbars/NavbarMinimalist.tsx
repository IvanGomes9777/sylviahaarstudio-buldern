"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * OPTION 2 – MINIMALIST-CLEAN-ELEGANT
 * Konzept: Sehr ruhige, helle Bar (Beige), viel Whitespace, dünne Espresso-Typo.
 * Beim Scrollen erscheint dezent eine 1px-Hairline. Hover = sanftes Underline-Grow,
 * keine lauten Effekte. CTA als schlichter Button mit Border, Sage als Akzent.
 */
export default function NavbarMinimalist() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-x-0 top-0 z-50 bg-beige/85 backdrop-blur-md"
    >
      <motion.div
        animate={{ borderColor: scrolled ? "rgba(61,40,23,0.14)" : "rgba(61,40,23,0)" }}
        transition={{ duration: 0.5 }}
        className="border-b"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-[clamp(1rem,4vw,2.5rem)] py-[clamp(1rem,1.8vw,1.5rem)]">
          {/* Logo */}
          <a href="#start" className="leading-tight text-espresso">
            <span className="block font-cormorant text-[clamp(1.3rem,2.4vw,1.75rem)] font-medium tracking-[0.18em]">
              {SITE.name.toUpperCase()}
            </span>
            <span className="mt-0.5 block text-[0.55rem] tracking-[0.5em] text-espresso/55">
              {SITE.brandLine}
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 md:flex">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative text-[0.8rem] font-light tracking-[0.14em] text-espresso/75 transition-colors hover:text-espresso"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-sage transition-all duration-500 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a
              href="#kontakt"
              className="inline-block border border-espresso/30 px-7 py-2.5 text-[0.75rem] tracking-[0.18em] text-espresso transition-all duration-500 hover:border-espresso hover:bg-espresso hover:text-beige"
            >
              {SITE.cta.toUpperCase()}
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            className="grid h-11 w-11 place-items-center text-espresso md:hidden"
          >
            <Menu size={22} strokeWidth={1.4} />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-beige md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-cormorant text-2xl tracking-[0.18em] text-espresso">
                {SITE.name.toUpperCase()}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="grid h-11 w-11 place-items-center text-espresso"
              >
                <X size={22} strokeWidth={1.4} />
              </button>
            </div>
            <ul className="mt-10 flex flex-col px-8">
              {SITE.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-espresso/10 py-5 font-cormorant text-3xl font-light text-espresso"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-8 pt-10">
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="block border border-espresso px-6 py-4 text-center text-sm tracking-[0.18em] text-espresso"
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
