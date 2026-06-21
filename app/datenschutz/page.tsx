import type { Metadata } from "next";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import Footer from "@/components/sections/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Sylvias Haarstudio",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei Sylvias Haarstudio.",
};

const prose =
  "mx-auto max-w-3xl px-6 pb-[clamp(4rem,8vw,7rem)] pt-32 [&_h1]:font-script [&_h1]:text-[clamp(2.5rem,1rem+5vw,4rem)] [&_h1]:text-walnut [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-walnut [&_h3]:mt-5 [&_h3]:font-semibold [&_h3]:text-walnut [&_p]:mt-2 [&_p]:leading-relaxed [&_p]:text-walnut/75 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-walnut/75 [&_a]:text-terracotta [&_a]:underline";

export default function Datenschutz() {
  return (
    <main className="min-h-[100svh] bg-cream font-sans">
      <NavbarWarmCozy />
      <div className={prose}>
        <h1>Datenschutzerklärung</h1>
        <p>
          Wir freuen uns über dein Interesse an Sylvias Haarstudio. Der Schutz deiner
          personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir dich gemäß
          Art. 13/14 DSGVO über die Verarbeitung deiner Daten auf dieser Website.
        </p>

        <h2>1. Verantwortlicher</h2>
        <p>
          {SITE.legalName}
          <br />
          {SITE.contact.street}, {SITE.contact.zip} {SITE.contact.city}
          <br />
          Telefon: {SITE.contact.phone} · E-Mail: [bitte ergänzen]
        </p>

        <h2>2. Hosting</h2>
        <p>
          Diese Website wird bei <strong>Vercel Inc.</strong> (USA) gehostet. Beim Aufruf
          werden technisch notwendige Daten (insb. IP-Adresse) verarbeitet. Rechtsgrundlage
          ist unser berechtigtes Interesse an einem sicheren, performanten Betrieb
          (Art. 6 Abs. 1 lit. f DSGVO). Eine Übermittlung in die USA wird auf Grundlage des
          EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln abgesichert.
        </p>

        <h2>3. Server-Logfiles</h2>
        <p>
          Der Hoster erhebt automatisch Zugriffsdaten (IP-Adresse, Datum/Uhrzeit, abgerufene
          Seite, Browser-Typ) zur Sicherstellung des Betriebs und der Sicherheit
          (Art. 6 Abs. 1 lit. f DSGVO). Diese Daten werden nicht mit anderen Daten
          zusammengeführt.
        </p>

        <h2>4. Kontaktformular &amp; telefonische Kontaktaufnahme</h2>
        <p>
          Wenn du uns über das Kontaktformular oder telefonisch kontaktierst, verarbeiten wir
          die von dir angegebenen Daten (Name, E-Mail, ggf. Telefon, Nachricht) zur
          Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. lit. f
          DSGVO. Zum Schutz vor Spam setzen wir ein verstecktes Feld (Honeypot) ein. Die
          Daten werden gelöscht, sobald sie nicht mehr erforderlich sind.
        </p>

        <h2>5. Online-Terminbuchung (StudioBookr)</h2>
        <p>
          Für die Online-Terminbuchung verlinken wir auf den externen Dienst{" "}
          <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer">StudioBookr</a>.
          Mit dem Klick verlässt du diese Website; es gelten die Datenschutzbestimmungen des
          jeweiligen Anbieters.
        </p>

        <h2>6. Google Maps (Klick-zum-Laden)</h2>
        <p>
          Unsere Karte wird erst nach deinem aktiven Klick geladen. Erst dann wird eine
          Verbindung zu Google (Google Ireland Ltd.) hergestellt und u. a. deine IP-Adresse
          übertragen. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO,
          § 25 Abs. 1 TDDDG), die du durch Anklicken erteilst.
        </p>

        <h2>7. Instagram</h2>
        <p>
          Wir verlinken auf unser Instagram-Profil. Es handelt sich um einen einfachen Link –
          erst beim Aufruf von Instagram werden Daten an Meta verarbeitet. Es gelten die
          Datenschutzhinweise von Meta.
        </p>

        <h2>8. Schriftarten</h2>
        <p>
          Wir verwenden lokal eingebundene Schriftarten (self-hosted). Es findet{" "}
          <strong>keine Verbindung zu Google-Servern</strong> statt.
        </p>

        <h2>9. Cookies</h2>
        <p>
          Wir setzen nur technisch notwendige Cookies bzw. vergleichbare Technologien ein, die
          für den Betrieb erforderlich sind. Nicht-essenzielle Dienste (z. B. Google Maps)
          werden erst nach deiner Einwilligung geladen.
        </p>

        <h2>10. Deine Rechte</h2>
        <ul>
          <li>Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17)</li>
          <li>Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20)</li>
          <li>Widerspruch (Art. 21) sowie Widerruf erteilter Einwilligungen</li>
          <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde</li>
        </ul>

        <p className="!mt-10 text-sm text-walnut/45">
          Hinweis: Diese Datenschutzerklärung bildet die aktuell eingesetzten Dienste ab und
          ist vor dem Live-Gang über einen seriösen Generator (z. B. eRecht24) bzw. fachlich
          zu finalisieren. Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}.
        </p>
      </div>
      <Footer />
    </main>
  );
}
