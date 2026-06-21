"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, CalendarCheck } from "lucide-react";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";

const EASE = [0.22, 1, 0.36, 1] as const;
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Head() {
  return (
    <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="text-center">
      <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">KONTAKT</span>
      <h2 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">Komm vorbei</h2>
      <p className="mx-auto mt-4 max-w-md text-walnut/65">Wir freuen uns auf dich – ruf an, schreib uns oder buch direkt online.</p>
    </motion.div>
  );
}

export function HoursTable() {
  return (
    <ul className="space-y-1.5 text-sm">
      {SITE.hours.map((h) => (
        <li key={h.day} className="flex justify-between gap-4">
          <span className="text-walnut/70">{h.day}</span>
          <span className={h.open ? "font-medium text-walnut" : "text-walnut/45"}>{h.time}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard() {
  return (
    <div className="space-y-6">
      <a href={`https://www.google.com/maps?q=${encodeURIComponent(SITE.contact.street + ", " + SITE.contact.zip + " " + SITE.contact.city)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-walnut transition-colors hover:text-terracotta">
        <MapPin size={20} className="mt-0.5 shrink-0 text-terracotta" />
        <span>{SITE.contact.street}<br />{SITE.contact.zip} {SITE.contact.city}-{SITE.contact.district}</span>
      </a>
      <a href={`tel:${SITE.contact.phoneHref}`} className="flex items-center gap-3 text-walnut transition-colors hover:text-terracotta">
        <Phone size={20} className="shrink-0 text-terracotta" /> {SITE.contact.phone}
      </a>
      <div className="flex items-start gap-3">
        <Clock size={20} className="mt-0.5 shrink-0 text-terracotta" />
        <HoursTable />
      </div>
      <div className="flex flex-wrap gap-3 pt-2">
        <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-walnut">
          <CalendarCheck size={16} /> {SITE.cta}
        </a>
        <a href={SITE.contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-walnut/25 px-5 py-2.5 text-sm font-semibold text-walnut transition-colors hover:bg-walnut hover:text-cream">
          <Instagram size={16} /> Instagram
        </a>
      </div>
    </div>
  );
}

/* ───────────── OPTION 1 — Split: Info + Karte | Formular ───────────── */
export function ContactSplit() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div {...reveal} transition={{ duration: 0.7, ease: EASE }} className="space-y-8">
            <InfoCard />
            <MapEmbed className="h-60" />
          </motion.div>
          <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="rounded-[1.75rem] border border-walnut/10 bg-white/70 p-[clamp(1.5rem,4vw,2.5rem)] shadow-xl shadow-walnut/10">
            <h3 className="font-script text-2xl text-walnut">Schreib uns</h3>
            <div className="mt-5"><ContactForm /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── OPTION 2 — Karten oben, Formular zentriert, Karte unten ───────────── */
export function ContactStacked() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-5xl">
        <Head />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { icon: MapPin, title: "Adresse", lines: [`${SITE.contact.street}`, `${SITE.contact.zip} ${SITE.contact.city}`] },
            { icon: Phone, title: "Telefon", lines: [SITE.contact.phone] },
            { icon: Clock, title: "Heute", lines: ["Mo–Do 9–18 · Fr 9–19", "Sa 8–13 Uhr"] },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div key={i} {...reveal} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }} className="rounded-[1.5rem] border border-walnut/10 bg-white/70 p-6 text-center shadow-lg shadow-walnut/10">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-terracotta/12 text-terracotta"><Icon size={22} /></span>
                <p className="mt-3 font-semibold text-walnut">{c.title}</p>
                {c.lines.map((l) => <p key={l} className="text-sm text-walnut/60">{l}</p>)}
              </motion.div>
            );
          })}
        </div>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="mx-auto mt-10 max-w-2xl rounded-[1.75rem] border border-walnut/10 bg-white/70 p-[clamp(1.5rem,4vw,2.5rem)] shadow-xl shadow-walnut/10">
          <ContactForm />
        </motion.div>
        <MapEmbed className="mt-8 h-72" />
      </div>
    </section>
  );
}

/* ───────────── OPTION 3 — Karte prominent + überlappende Info-Karte ───────────── */
export function ContactMapHero() {
  return (
    <section id="kontakt" className="scroll-mt-24 bg-cream px-6 py-[clamp(4.5rem,10vw,8rem)]">
      <div className="mx-auto max-w-6xl">
        <Head />
        <div className="relative mt-12">
          <MapEmbed className="h-[26rem]" />
          <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.1, ease: EASE }} className="relative z-10 mx-auto -mt-24 max-w-md rounded-[1.75rem] border border-white/60 bg-cream/90 p-7 shadow-2xl shadow-walnut/20 backdrop-blur-xl md:ml-8">
            <h3 className="font-script text-2xl text-walnut">So findest du uns</h3>
            <div className="mt-4"><InfoCard /></div>
          </motion.div>
        </div>
        <motion.div {...reveal} transition={{ duration: 0.7, delay: 0.15, ease: EASE }} className="mx-auto mt-10 max-w-2xl rounded-[1.75rem] border border-walnut/10 bg-white/70 p-[clamp(1.5rem,4vw,2.5rem)] shadow-xl shadow-walnut/10">
          <h3 className="font-script text-2xl text-walnut">Schreib uns</h3>
          <div className="mt-5"><ContactForm /></div>
        </motion.div>
      </div>
    </section>
  );
}
