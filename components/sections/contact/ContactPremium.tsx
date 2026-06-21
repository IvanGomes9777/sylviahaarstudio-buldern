"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, CalendarCheck, Mail, MessageSquare, Navigation } from "lucide-react";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { HoursTable } from "./ContactVariants";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const addrUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${SITE.contact.street}, ${SITE.contact.zip} ${SITE.contact.city}`)}`;

/* ───────────── OPTION 4 — Dunkel & elegant ───────────── */
export function ContactDark() {
  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-walnut px-6 py-[clamp(4.5rem,10vw,8rem)] text-cream">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-terracotta/25 blur-[90px]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-apricot">KONTAKT</span>
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.5rem)] leading-[0.95]">Komm vorbei</h2>
        </motion.div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="space-y-7">
            <a href={addrUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-apricot"><MapPin className="mt-0.5 text-apricot" size={20} /><span>{SITE.contact.street}<br />{SITE.contact.zip} {SITE.contact.city}-{SITE.contact.district}</span></a>
            <a href={`tel:${SITE.contact.phoneHref}`} className="flex items-center gap-3 transition-colors hover:text-apricot"><Phone className="text-apricot" size={20} /> {SITE.contact.phone}</a>
            <div className="flex items-start gap-3"><Clock className="mt-0.5 text-apricot" size={20} /><div className="[&_*]:text-cream/80">< HoursTable /></div></div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-apricot px-5 py-2.5 text-sm font-semibold text-walnut hover:bg-cream"><CalendarCheck size={16} /> {SITE.cta}</a>
              <a href={SITE.contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold hover:bg-cream hover:text-walnut"><Instagram size={16} /> Instagram</a>
            </div>
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="rounded-[1.75rem] bg-cream p-[clamp(1.5rem,4vw,2.5rem)] text-walnut shadow-2xl">
            <h3 className="font-script text-2xl">Schreib uns</h3>
            <div className="mt-5"><ContactForm /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 5 — Bento-Grid ───────────── */
export function ContactBento() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">KONTAKT</span>
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Komm vorbei</h2>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <motion.a {...reveal} transition={{ duration: 0.6, ease: EASE }} href={`tel:${SITE.contact.phoneHref}`} className="rounded-[1.5rem] bg-terracotta p-6 text-cream shadow-lg transition-transform hover:-translate-y-1">
            <Phone size={24} /><p className="mt-3 text-xs uppercase tracking-wider text-cream/70">Anrufen</p><p className="font-script text-2xl">{SITE.contact.phone}</p>
          </motion.a>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.05, ease: EASE }} className="rounded-[1.5rem] bg-white/70 p-6 shadow-lg ring-1 ring-walnut/5">
            <Clock size={24} className="text-terracotta" /><p className="mt-3 text-xs uppercase tracking-wider text-walnut/50">Öffnungszeiten</p><div className="mt-1"><HoursTable /></div>
          </motion.div>
          <motion.a {...reveal} transition={{ duration: 0.6, delay: 0.1, ease: EASE }} href={SITE.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col justify-between rounded-[1.5rem] bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] p-6 text-white shadow-lg transition-transform hover:-translate-y-1">
            <Instagram size={24} /><div><p className="text-xs uppercase tracking-wider text-white/80">Folge uns</p><p className="font-script text-2xl">@sylvias.haarstudio</p></div>
          </motion.a>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.1, ease: EASE }} className="md:col-span-1 md:row-span-1">
            <MapEmbed className="h-full min-h-[16rem]" />
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.6, delay: 0.12, ease: EASE }} className="rounded-[1.5rem] border border-walnut/10 bg-white/70 p-6 shadow-lg md:col-span-2">
            <h3 className="font-script text-2xl text-walnut">Schreib uns</h3>
            <div className="mt-4"><ContactForm /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 6 — Tabs (Nachricht / Anfahrt / Zeiten) ───────────── */
export function ContactTabs() {
  const [tab, setTab] = useState("msg");
  const tabs = [
    { id: "msg", label: "Nachricht", icon: MessageSquare },
    { id: "map", label: "Anfahrt", icon: Navigation },
    { id: "hours", label: "Öffnungszeiten", icon: Clock },
  ];
  return (
    <section id="kontakt" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-3xl">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">KONTAKT</span>
          <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Komm vorbei</h2>
        </motion.div>
        <div className="mt-10 flex justify-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} className={`relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === t.id ? "text-cream" : "text-walnut/70 hover:text-walnut"}`}>
                {tab === t.id && <motion.span layoutId="contact-tab" className="absolute inset-0 -z-0 rounded-full bg-walnut" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative z-10 flex items-center gap-2"><Icon size={15} /> {t.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-8 rounded-[1.75rem] border border-walnut/10 bg-white/70 p-[clamp(1.5rem,4vw,2.5rem)] shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3, ease: EASE }}>
              {tab === "msg" && <ContactForm />}
              {tab === "map" && (
                <div className="space-y-4">
                  <a href={addrUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-walnut hover:text-terracotta"><MapPin className="mt-0.5 text-terracotta" size={20} />{SITE.contact.street}, {SITE.contact.zip} {SITE.contact.city}-{SITE.contact.district}</a>
                  <MapEmbed className="h-72" />
                </div>
              )}
              {tab === "hours" && (
                <div className="mx-auto max-w-sm">
                  <HoursTable />
                  <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream hover:bg-walnut"><CalendarCheck size={16} /> {SITE.cta}</a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 7 — Glas-Formular über der Karte ───────────── */
export function ContactGlass() {
  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-cream">
      <div className="absolute inset-0"><MapEmbed className="h-full w-full rounded-none ring-0" /></div>
      <div className="relative z-10 mx-auto flex max-w-6xl justify-end px-6 py-[clamp(4.5rem,10vw,8rem)]">
        <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="w-full max-w-md rounded-[1.75rem] border border-white/60 bg-cream/90 p-[clamp(1.5rem,4vw,2.5rem)] shadow-2xl backdrop-blur-xl">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">KONTAKT</span>
          <h2 className="mt-2 font-script text-[clamp(2rem,1rem+4vw,3rem)] leading-[1] text-walnut">Komm vorbei</h2>
          <div className="mt-3 space-y-1 text-sm text-walnut/70">
            <p>{SITE.contact.street}, {SITE.contact.zip} {SITE.contact.city}</p>
            <a href={`tel:${SITE.contact.phoneHref}`} className="block font-medium text-walnut hover:text-terracotta">{SITE.contact.phone}</a>
          </div>
          <div className="mt-5"><ContactForm /></div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 8 — Minimal, Anruf im Fokus ───────────── */
export function ContactMinimal() {
  const [open, setOpen] = useState(false);
  return (
    <section id="kontakt" className="scroll-mt-24 bg-cream px-6 py-[clamp(5rem,11vw,9rem)]">
      <div className="mx-auto max-w-2xl text-center">
        <motion.span {...reveal} transition={{ duration: 0.6, ease: EASE }} className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">KONTAKT</motion.span>
        <motion.h2 {...reveal} transition={{ duration: 0.7, delay: 0.05, ease: EASE }} className="mt-3 font-script text-[clamp(2.5rem,1rem+7vw,5rem)] leading-[0.95] text-walnut">Ruf uns einfach an</motion.h2>
        <motion.a {...reveal} transition={{ duration: 0.7, delay: 0.12, ease: EASE }} href={`tel:${SITE.contact.phoneHref}`} className="mt-6 inline-block font-script text-[clamp(2.5rem,1rem+7vw,4.5rem)] text-terracotta transition-colors hover:text-walnut">{SITE.contact.phone}</motion.a>
        <motion.p {...reveal} transition={{ duration: 0.7, delay: 0.18, ease: EASE }} className="mt-3 text-walnut/65">{SITE.contact.street} · {SITE.contact.zip} {SITE.contact.city}-{SITE.contact.district} · Mo–Do 9–18 · Fr 9–19 · Sa 8–13</motion.p>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.24, ease: EASE }} className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-cream shadow-lg hover:bg-walnut"><CalendarCheck size={16} /> {SITE.cta}</a>
          <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-2 rounded-full border border-walnut/30 px-7 py-3.5 text-sm font-semibold text-walnut hover:bg-walnut hover:text-cream"><Mail size={16} /> Lieber schreiben</button>
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
              <div className="mx-auto mt-8 max-w-xl rounded-[1.75rem] border border-walnut/10 bg-white/70 p-6 text-left shadow-xl"><ContactForm /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
