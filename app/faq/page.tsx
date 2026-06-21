import type { Metadata } from "next";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import Footer from "@/components/sections/Footer";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ } from "@/lib/faq";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Häufige Fragen (FAQ) – Sylvias Haarstudio Dülmen-Buldern",
  description:
    "Antworten auf häufige Fragen: Terminbuchung, Preise, Öffnungszeiten, Kinderhaarschnitte & Anfahrt zu Sylvias Haarstudio in Dülmen-Buldern.",
  alternates: { canonical: "/faq" },
};

// FAQPage-Schema – deckt sich 1:1 mit dem sichtbaren Inhalt (SEO/GEO).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <main className="min-h-[100svh] bg-cream font-sans text-walnut">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavbarWarmCozy />

      <section className="mx-auto max-w-3xl px-6 pb-[clamp(4rem,8vw,7rem)] pt-32">
        <div className="text-center">
          <span className="text-[0.7rem] font-semibold tracking-[0.35em] text-terracotta">FAQ</span>
          <h1 className="mt-3 font-script text-[clamp(2.5rem,1rem+6vw,4.25rem)] leading-[0.95] text-walnut">
            Häufige Fragen
          </h1>
          <p className="mx-auto mt-4 max-w-md text-walnut/65">
            Das Wichtigste rund um Termin, Preise und Anfahrt – kurz beantwortet.
          </p>
        </div>

        <div className="mt-10">
          <FaqAccordion />
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 rounded-[1.75rem] border border-walnut/10 bg-white/70 p-8 text-center shadow-lg shadow-walnut/10">
          <p className="font-script text-2xl text-walnut">Noch Fragen offen?</p>
          <p className="text-walnut/65">Ruf uns an oder buch direkt online deinen Termin.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <a href={SITE.contact.booking} target="_blank" rel="noopener noreferrer" className="rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-terracotta/30 transition-colors hover:bg-walnut">
              {SITE.cta}
            </a>
            <a href={`tel:${SITE.contact.phoneHref}`} className="rounded-full border border-walnut/30 px-7 py-3.5 text-sm font-semibold text-walnut transition-colors hover:bg-walnut hover:text-cream">
              {SITE.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
