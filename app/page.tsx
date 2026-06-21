import Link from "next/link";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import Hero from "@/components/sections/Hero";
import { AboutCinematic } from "@/components/sections/about/AboutPremium";
import { SITE } from "@/lib/site";

// Produktions-Startseite.
// Sektion 1 (Navbar) + Sektion 2 (Hero) = freigegeben & final.
// Folgende Sektionen (Über uns, Leistungen, Galerie, Team, Kontakt) folgen
// Schritt für Schritt; aktuell dezente Platzhalter, damit die Navigation
// funktioniert und die Seite deploybar ist.

function Placeholder({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note: string;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-walnut/10 px-[clamp(1rem,5vw,3rem)] py-[clamp(3rem,8vw,6rem)]"
    >
      <div className="mx-auto max-w-5xl">
        <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-terracotta">
          {title.toUpperCase()}
        </span>
        <p className="mt-3 max-w-2xl text-walnut/55">{note}</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-cream font-sans text-walnut">
      <NavbarWarmCozy />

      {/* SEKTION 2 – Hero (final: Diagonaler Split + Info-Karte) */}
      <Hero />

      {/* SEKTION 3 – Über uns (final: Cinematic Reveal) */}
      <AboutCinematic />
      <Placeholder id="leistungen" title="Leistungen" note="Folgt als eigene Sektion – mit echten Preisen." />
      <Placeholder
        id="galerie"
        title="Galerie"
        note="Hier zeigen wir später die Arbeiten von Sylvias Haarstudio – Vorher/Nachher, Schnitte, Farben & Looks."
      />
      <Placeholder id="team" title="Team" note="Folgt – Lina, Michaela, Simone, Sandra & Larissa." />
      <Placeholder id="kontakt" title="Kontakt" note="Folgt – Adresse, Öffnungszeiten, Karte & Kontaktformular." />

      {/* Footer-Platzhalter mit Pflicht-Links (Compliance) */}
      <footer className="border-t border-walnut/10 bg-walnut px-6 py-10 text-cream/80">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center text-sm">
          <p className="font-script text-2xl text-cream">
            {SITE.name} {SITE.suffix}
          </p>
          <p>
            {SITE.contact.street} · {SITE.contact.zip} {SITE.contact.city}-
            {SITE.contact.district} · {SITE.contact.phone}
          </p>
          <nav className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 text-cream/60">
            <Link href="/impressum" className="hover:text-cream">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-cream">
              Datenschutz
            </Link>
            <a
              href={SITE.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream"
            >
              Instagram
            </a>
          </nav>
          <p className="mt-3 text-xs text-cream/40">
            © {new Date().getFullYear()} {SITE.legalName}
          </p>
        </div>
      </footer>
    </main>
  );
}
