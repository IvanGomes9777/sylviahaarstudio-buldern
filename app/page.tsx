import Link from "next/link";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import { SITE } from "@/lib/site";

// Produktions-Startseite (Sektion 1: Navbar = freigegeben „Warm-Welcoming Cozy").
// Die folgenden Sektionen (Hero, Über uns, Leistungen, Galerie, Team, Kontakt)
// werden Schritt für Schritt ersetzt. Aktuell dezente Platzhalter, damit die
// Navigation funktioniert und die Seite deploybar ist.

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

      {/* HERO – Platzhalter (5 Optionen folgen als nächste Sektion) */}
      <section
        id="start"
        className="flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 text-center"
      >
        <span className="mb-5 inline-block rounded-full border border-terracotta/40 px-4 py-1.5 text-[0.7rem] tracking-[0.25em] text-terracotta">
          {SITE.brandLine}
        </span>
        <h1 className="font-script text-[clamp(2.75rem,1rem+9vw,6rem)] leading-[1.05] text-walnut">
          {SITE.name} {SITE.suffix}
        </h1>
        <p className="mt-4 max-w-xl text-[clamp(1.05rem,0.95rem+0.6vw,1.35rem)] text-walnut/70">
          {SITE.slogan}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE.contact.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-walnut px-8 py-4 text-sm font-semibold text-cream shadow-md shadow-walnut/20 transition-colors hover:bg-terracotta"
          >
            {SITE.cta}
          </a>
          <a
            href={`tel:${SITE.contact.phoneHref}`}
            className="rounded-full border border-walnut/30 px-8 py-4 text-sm font-semibold text-walnut transition-colors hover:border-walnut hover:bg-walnut hover:text-cream"
          >
            {SITE.ctaPhone}: {SITE.contact.phone}
          </a>
        </div>
        <p className="mt-12 text-xs tracking-[0.2em] text-walnut/40">
          ↓ HERO-SEKTION FOLGT – 5 OPTIONEN ZUR AUSWAHL
        </p>
      </section>

      <Placeholder id="ueber-uns" title="Über uns" note="Folgt als eigene Sektion." />
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
