import type { Metadata, Viewport } from "next";
import {
  Inter,
  Playfair_Display,
  Poppins,
  Cormorant_Garamond,
  Dancing_Script,
} from "next/font/google";
import "./globals.css";

/**
 * DSGVO-konform: next/font lädt die Schriften zur BUILD-Zeit herunter und hostet
 * sie self-hosted auf der eigenen Domain. Zur Laufzeit KEIN Request an Google.
 * (Vgl. rechtstexte-website-compliance.md, Abschnitt 7.1)
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});
const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Sylvia Haarstudio Buldern – Friseur & Farbexpertise in Buldern",
  description:
    "Sylvia Haarstudio in Buldern: Präzisionsschnitte, Balayage & Farbberatung. Persönlich, modern, mit Herz. Jetzt Termin sichern.",
  metadataBase: new URL("https://www.sylvia-haarstudio-buldern.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Sylvia Haarstudio Buldern",
    description:
      "Friseur in Buldern – Schnitt, Farbe & Pflege mit persönlicher Beratung.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // user-scalable bleibt erlaubt (Accessibility / Responsive-Guide-Verbot beachtet).
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${cormorant.variable} ${dancing.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
