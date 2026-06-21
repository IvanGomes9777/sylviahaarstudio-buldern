import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import Hero from "@/components/sections/Hero";
import { AboutCinematic } from "@/components/sections/about/AboutPremium";
import { ServicesTabs } from "@/components/sections/services/ServicesVariants";
import { GalleryFlip } from "@/components/sections/gallery/GalleryFlip";
import { TeamCards } from "@/components/sections/team/TeamVariants";
import { ContactTabs } from "@/components/sections/contact/ContactPremium";
import Footer from "@/components/sections/Footer";
import { siteGraph } from "@/lib/schema";

// Produktions-Startseite – alle 7 Sektionen final.
export default function Home() {
  return (
    <main className="min-h-[100svh] bg-cream font-sans text-walnut">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
      />
      <NavbarWarmCozy />

      {/* 2 – Hero (Diagonaler Split + Info-Karte) */}
      <Hero />

      {/* 3 – Über uns (Cinematic Reveal) */}
      <AboutCinematic />

      {/* 4 – Leistungen (Kategorie-Tabs) */}
      <ServicesTabs />

      {/* 5 – Galerie (GSAP-Flip-Filter + Instagram) */}
      <GalleryFlip />

      {/* 6 – Team (Karten + Hover-Zoom) */}
      <TeamCards />

      {/* 7 – Kontakt (Tabs: Nachricht/Anfahrt/Öffnungszeiten) */}
      <ContactTabs />

      <Footer />
    </main>
  );
}
