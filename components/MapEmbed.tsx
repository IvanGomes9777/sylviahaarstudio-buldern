"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * DSGVO-freundliche Karte: Google Maps lädt ERST nach aktivem Klick
 * (Consent-Gating, vgl. rechtstexte-website-compliance.md Abschnitt 7.4).
 */
export default function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(`${SITE.contact.street}, ${SITE.contact.zip} ${SITE.contact.city}`);

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] ring-1 ring-walnut/10 ${className}`}>
      {loaded ? (
        <iframe
          title="Standort Sylvias Haarstudio"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          onClick={() => setLoaded(true)}
          className="group flex h-full w-full flex-col items-center justify-center gap-3 bg-walnut/5 p-6 text-center transition-colors hover:bg-walnut/10"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-terracotta/15 text-terracotta transition-transform group-hover:scale-110">
            <MapPin size={26} />
          </span>
          <span className="font-semibold text-walnut">Karte laden</span>
          <span className="max-w-xs text-sm text-walnut/60">
            Mit Klick wird Google Maps geladen. Dabei werden Daten an Google übertragen –
            siehe Datenschutzerklärung.
          </span>
        </button>
      )}
    </div>
  );
}
