"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { PLACEHOLDER_IMAGES as IMG } from "@/lib/media";

/**
 * FINALE HERO (Sektion 2) – freigegeben: Option I "Diagonaler Split"
 * kombiniert mit der Info-Karte aus Option G (Bewertung + Öffnungszeiten + CTAs).
 * Warm-Welcoming-Cozy-Marke. Bild = Unsplash-Platzhalter (später echte Fotos).
 */

const ease = [0.22, 1, 0.36, 1] as const;

function Ctas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
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
        className="inline-flex items-center justify-center rounded-full border border-walnut/30 px-7 py-3.5 text-sm font-semibold text-walnut transition-colors hover:bg-walnut hover:text-cream"
      >
        {SITE.contact.phone}
      </a>
    </div>
  );
}

export default function Hero() {
  const today = SITE.hours[(new Date().getDay() + 6) % 7]; // Mo=0 … So=6

  return (
    <section
      id="start"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream"
    >
      {/* Diagonales Bildpanel rechts (ab lg) */}
      <div
        className="absolute inset-y-0 right-0 hidden w-[52%] lg:block"
        style={{ clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <Image
          src={IMG.salonStyling}
          alt="Styling im Sylvias Haarstudio"
          fill
          priority
          sizes="52vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-walnut/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl"
        >
          <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">
            {SITE.brandLine}
          </span>
          <h1 className="mt-4 font-script text-[clamp(2.75rem,1rem+9vw,6rem)] leading-[1] text-walnut">
            {SITE.slogan}
          </h1>
          <p className="mt-5 max-w-md text-[clamp(1rem,0.95rem+0.4vw,1.2rem)] text-walnut/70">
            Ein freundlicher Salon mit Zeit für dich – Schnitt, Farbe & Pflege in
            Dülmen-Buldern.
          </p>

          {/* Info-Karte (aus Option G) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="mt-8 max-w-md rounded-[1.75rem] bg-white/90 p-6 shadow-xl shadow-walnut/15 ring-1 ring-walnut/10 backdrop-blur"
          >
            <div className="flex items-center gap-2 text-sm text-walnut">
              <span className="flex text-apricot">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span className="font-semibold">
                {SITE.rating.value.toString().replace(".", ",")}
              </span>
              <span className="text-walnut/60">
                · {SITE.rating.count} Google-Bewertungen
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-walnut/75">
              <span className="inline-flex items-center gap-2">
                <Clock size={15} className="text-terracotta" />
                Heute: {today.open ? today.time : "Geschlossen"}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-terracotta" />
                {SITE.contact.street}, {SITE.contact.city}
              </span>
            </div>

            <Ctas className="mt-5" />
          </motion.div>
        </motion.div>

        {/* Mobiles Bild (unter lg) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] shadow-xl shadow-walnut/20 lg:hidden"
        >
          <Image
            src={IMG.salonStyling}
            alt="Styling im Sylvias Haarstudio"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
