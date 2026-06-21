"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * OPTION 5 – WARM-WELCOMING-COZY
 * Konzept: Einladende creme-/walnussfarbene Bar, handgeschriebenes Script-Logo
 * mit Herz, runde weiche Formen. Hover = warmer Terracotta-Farbwechsel + sanftes
 * „Wackeln" des Herz-Icons. CTA als gemütlicher, abgerundeter Walnut-Button.
 */
export default function NavbarWarmCozy() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 30));

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{
          backgroundColor: scrolled ? "rgba(249,246,242,0.92)" : "rgba(249,246,242,0.7)",
          boxShadow: scrolled
            ? "0 10px 30px -18px rgba(139,111,71,0.55)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5 }}
        className="backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-[clamp(1rem,4vw,2.5rem)] py-[clamp(0.85rem,1.6vw,1.25rem)]">
          {/* Logo */}
          <motion.a
            href="#start"
            whileHover={{ rotate: [0, -2.5, 2, 0] }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Image
              src="/sylvialogo.png"
              alt="Sylvias Haarstudio"
              width={512}
              height={280}
              priority
              className="h-[clamp(2.2rem,4.2vw,2.9rem)] w-auto"
            />
          </motion.a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 lg:flex">
            {SITE.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-sans text-[0.92rem] font-medium text-walnut/80 transition-colors duration-300 hover:text-terracotta"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <motion.a
              href={SITE.contact.booking}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block rounded-full bg-walnut px-6 py-3 font-sans text-sm font-semibold text-cream shadow-md shadow-walnut/20 transition-colors hover:bg-terracotta"
            >
              {SITE.cta}
            </motion.a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            className="grid h-11 w-11 place-items-center rounded-full bg-terracotta/10 text-walnut lg:hidden"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-cream lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Image
                src="/sylvialogo.png"
                alt="Sylvias Haarstudio"
                width={512}
                height={280}
                className="h-9 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="grid h-11 w-11 place-items-center rounded-full bg-terracotta/10 text-walnut"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="mt-8 flex flex-col gap-1 px-7">
              {SITE.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.07 * i + 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-walnut/10 py-4 font-sans text-2xl font-medium text-walnut"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-7 pt-8">
              <a
                href={SITE.contact.booking}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-walnut py-4 text-center font-sans font-semibold text-cream"
              >
                {SITE.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
