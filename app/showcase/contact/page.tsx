"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import Footer from "@/components/sections/Footer";
import {
  ContactSplit,
  ContactStacked,
  ContactMapHero,
} from "@/components/sections/contact/ContactVariants";
import {
  ContactDark,
  ContactBento,
  ContactTabs,
  ContactGlass,
  ContactMinimal,
} from "@/components/sections/contact/ContactPremium";

const VARIANTS = [
  { id: "4", name: "Dunkel & elegant", C: ContactDark },
  { id: "5", name: "Bento-Grid", C: ContactBento },
  { id: "6", name: "Tabs", C: ContactTabs },
  { id: "7", name: "Glas über Karte", C: ContactGlass },
  { id: "8", name: "Minimal (Anruf)", C: ContactMinimal },
  { id: "1", name: "Split: Info + Formular", C: ContactSplit },
  { id: "2", name: "Karten + Formular", C: ContactStacked },
  { id: "3", name: "Karte prominent", C: ContactMapHero },
];

export default function ContactShowcase() {
  const [active, setActive] = useState("4");
  const current = VARIANTS.find((v) => v.id === active)!;
  const ActiveC = current.C;

  return (
    <main className="relative bg-cream pb-28 pt-20">
      <NavbarWarmCozy />
      <div key={active}>
        <ActiveC />
        <Footer />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/85 p-2.5 shadow-2xl backdrop-blur-xl">
          <div className="mb-1 text-center text-[0.6rem] tracking-[0.3em] text-white/40">
            KONTAKT + FOOTER – 3 OPTIONEN
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => { setActive(v.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`relative rounded-xl px-3.5 py-2 transition-colors ${active === v.id ? "text-white" : "text-white/55 hover:text-white/80"}`}
              >
                {active === v.id && (
                  <motion.span layoutId="contact-pill" className="absolute inset-0 -z-0 rounded-xl bg-white/12 ring-1 ring-white/15" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative z-10 block text-[0.72rem] font-semibold">Option {v.id}</span>
                <span className="relative z-10 hidden text-[0.6rem] opacity-70 sm:block">{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
