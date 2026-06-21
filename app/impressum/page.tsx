import type { Metadata } from "next";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import Footer from "@/components/sections/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum – Sylvias Haarstudio",
  description: "Impressum von Sylvias Haarstudio UG (haftungsbeschränkt), Dülmen-Buldern.",
};

const prose =
  "mx-auto max-w-3xl px-6 pb-[clamp(4rem,8vw,7rem)] pt-32 [&_h1]:font-script [&_h1]:text-[clamp(2.5rem,1rem+5vw,4rem)] [&_h1]:text-walnut [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-walnut [&_p]:mt-2 [&_p]:leading-relaxed [&_p]:text-walnut/75 [&_a]:text-terracotta [&_a]:underline";

export default function Impressum() {
  return (
    <main className="min-h-[100svh] bg-cream font-sans">
      <NavbarWarmCozy />
      <div className={prose}>
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {SITE.legalName}
          <br />
          {SITE.contact.street}
          <br />
          {SITE.contact.zip} {SITE.contact.city}
        </p>

        <h2>Vertreten durch</h2>
        <p>{SITE.owner} (Inhaberin)</p>

        <h2>Kontakt</h2>
        <p>
          Telefon: <a href={`tel:${SITE.contact.phoneHref}`}>{SITE.contact.phone}</a>
          <br />
          E-Mail: <a href={`mailto:${SITE.contact.email}`}>{SITE.contact.email}</a>
        </p>

        <h2>Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [falls vorhanden ergänzen].
        </p>

        <h2>Aufsichtsbehörde / Kammer</h2>
        <p>
          Handwerkskammer Münster
          <br />
          Bismarckallee 1, 48252 Münster
        </p>

        <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
        <p>
          Berufsbezeichnung: Friseur:in (verliehen in der Bundesrepublik Deutschland).
          Es gelten die Handwerksordnung (HwO) sowie die Vorschriften der Handwerkskammer
          Münster.
        </p>

        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
          einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2>Haftung für Inhalte &amp; Links</h2>
        <p>
          Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität können wir jedoch keine Gewähr
          übernehmen. Für Inhalte verlinkter externer Seiten sind ausschließlich deren
          Betreiber verantwortlich.
        </p>

        <h2>Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte unterliegen dem deutschen
          Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet.
        </p>

        <p className="!mt-10 text-sm text-walnut/45">
          Hinweis: Eine Umsatzsteuer-Identifikationsnummer (Format DE + 9 Ziffern) ist nur
          anzugeben, falls vorhanden. Die persönliche Steuernummer (z. B. 312/5142/0912)
          gehört nicht ins Impressum und wird daher hier nicht veröffentlicht. Finale
          Rechtstexte vor Live-Gang über einen Generator/Anwalt prüfen.
        </p>
      </div>
      <Footer />
    </main>
  );
}
