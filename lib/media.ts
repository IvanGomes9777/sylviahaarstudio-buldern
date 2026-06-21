// Platzhalter-Bilder (Unsplash, legal & kostenlos) – klar als austauschbar markiert.
// Werden später durch echte Salon-/Team-Fotos ersetzt (Antwort Kunde: "Mix").
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PLACEHOLDER_IMAGES = {
  salonStyling: u("1560066984-138dadb4c035"),
  washCut: u("1521590832167-7bcbfaa6381f"),
  cutting: u("1562322140-8baeececf3df"),
  salonInterior: u("1582095133179-bfd08e2fc6b3"),
  hairDetail: u("1595476108010-b4d1f1b32a17"),
} as const;

export const IMAGE_NOTE =
  "Platzhalter (Unsplash) – später durch echte Fotos von Sylvias Haarstudio ersetzen.";

// Galerie-Platzhalter mit gemischten Formaten (hoch/quer) für Masonry & Co.
const g = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const GALLERY = [
  { src: g("1560066984-138dadb4c035", 800, 1050), alt: "Styling im Salon" },
  { src: g("1562322140-8baeececf3df", 800, 600), alt: "Präziser Haarschnitt" },
  { src: g("1595476108010-b4d1f1b32a17", 800, 1100), alt: "Farbe & Glanz" },
  { src: g("1521590832167-7bcbfaa6381f", 800, 800), alt: "Waschen & Föhnen" },
  { src: g("1582095133179-bfd08e2fc6b3", 800, 600), alt: "Unser Salon" },
  { src: g("1595476108010-b4d1f1b32a17", 800, 800), alt: "Pflege-Detail" },
  { src: g("1560066984-138dadb4c035", 800, 600), alt: "Look des Tages" },
  { src: g("1562322140-8baeececf3df", 800, 1050), alt: "Schnitt-Detail" },
];

// Vorher/Nachher-Paare (Platzhalter)
export const BEFORE_AFTER = [
  {
    before: g("1521590832167-7bcbfaa6381f", 1000, 750),
    after: g("1560066984-138dadb4c035", 1000, 750),
  },
];
