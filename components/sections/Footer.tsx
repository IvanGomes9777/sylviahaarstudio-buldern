import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone, MapPin, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-walnut px-6 py-14 text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marke */}
        <div>
          <Image src="/sylvialogo.png" alt="Sylvias Haarstudio" width={200} height={110} className="h-12 w-auto [filter:brightness(0)_invert(1)]" />
          <p className="mt-4 max-w-xs font-script text-2xl text-cream">{SITE.slogan}</p>
          <a href={SITE.contact.instagram} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm transition-colors hover:bg-cream/20">
            <Instagram size={16} /> @sylvias.haarstudio
          </a>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-apricot">Kontakt</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{SITE.contact.street}, {SITE.contact.zip} {SITE.contact.city}-{SITE.contact.district}</li>
            <li><a href={`tel:${SITE.contact.phoneHref}`} className="flex items-center gap-2 hover:text-cream"><Phone size={16} /> {SITE.contact.phone}</a></li>
            <li><a href={`mailto:${SITE.contact.email}`} className="flex items-center gap-2 hover:text-cream"><Mail size={16} /> {SITE.contact.email}</a></li>
          </ul>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-apricot">Öffnungszeiten</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">Mo–Do 9–18 · Fr 9–19<br />Sa 8–13 · So geschlossen</p>
        </div>

        {/* Navigation + Recht */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-apricot">Seiten</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {SITE.nav.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-cream">{n.label}</a></li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-cream">FAQ</Link></li>
            <li><Link href="/impressum" className="hover:text-cream">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-cream">Datenschutz</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-cream/15 pt-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {SITE.legalName} · Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
