"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * OPTION 3 – PLAYFUL-VIBRANT-MODERN
 * Konzept: Floating „Pill"-Navbar mit Schlagschatten, Magenta→Teal-Gradient-Logo,
 * Links mit verspieltem Hover (leichtes Pop + Farbe), CTA mit Dauer-Bounce-Puls.
 * Energiegeladen, Instagram-tauglich. Heller Off-White-Hintergrund.
 */
export default function NavbarPlayful() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="fixed inset-x-0 top-[clamp(0.6rem,2vw,1.25rem)] z-50 px-[clamp(0.75rem,3vw,1.5rem)]"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[1.75rem] border border-black/5 bg-white/90 px-[clamp(1rem,3vw,1.75rem)] py-3 shadow-[0_18px_50px_-20px_rgba(233,30,99,0.5)] backdrop-blur-xl">
        {/* Logo */}
        <a href="#start" className="flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: 18, scale: 1.1 }}
            className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-magenta to-teal text-white"
          >
            <Sparkles size={18} />
          </motion.span>
          <span className="font-poppins text-[clamp(1.05rem,2.2vw,1.35rem)] font-extrabold">
            <span className="bg-gradient-to-r from-magenta via-grape to-teal bg-clip-text text-transparent">
              {SITE.name}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {SITE.nav.map((item) => (
            <li key={item.href}>
              <motion.a
                href={item.href}
                whileHover={{ y: -2 }}
                className="rounded-full px-4 py-2 font-poppins text-sm font-semibold text-grape/80 transition-colors hover:bg-magenta/10 hover:text-magenta"
              >
                {item.label}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA with pulse */}
        <div className="hidden md:block">
          <motion.a
            href="#kontakt"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ scale: { repeat: Infinity, duration: 2.4, ease: "easeInOut" } }}
            className="inline-block rounded-full bg-gradient-to-r from-magenta to-grape px-6 py-3 font-poppins text-sm font-bold text-white shadow-lg shadow-magenta/30"
          >
            {SITE.cta} ✨
          </motion.a>
        </div>

        <button
          onClick={() => setOpen(true)}
          aria-label="Menü öffnen"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-magenta/10 text-magenta md:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="absolute inset-x-[clamp(0.75rem,3vw,1.5rem)] top-2 z-50 rounded-[1.75rem] bg-white p-5 shadow-2xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-poppins text-lg font-extrabold">
                <span className="bg-gradient-to-r from-magenta to-teal bg-clip-text text-transparent">
                  {SITE.name}
                </span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-magenta/10 text-magenta"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="mt-4 flex flex-col gap-1">
              {SITE.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 font-poppins text-lg font-semibold text-grape hover:bg-magenta/10"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#kontakt"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-gradient-to-r from-magenta to-grape px-6 py-4 text-center font-poppins font-bold text-white"
            >
              {SITE.cta} ✨
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
