// Platzhalter-Bilder (Unsplash, legal & kostenlos) – klar als austauschbar markiert.
// Alle IDs wurden per HTTP geprüft (Status 200). Später durch echte Fotos ersetzen.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PLACEHOLDER_IMAGES = {
  salonStyling: u("1560066984-138dadb4c035"),
  washCut: u("1521590832167-7bcbfaa6381f"),
  cutting: u("1562322140-8baeececf3df"),
  salonInterior: u("1582095133179-bfd08e2fc6b3"),
  hairDetail: u("1492106087820-71f1a00d2b11"),
} as const;

export const IMAGE_NOTE =
  "Platzhalter (Unsplash) – später durch echte Fotos von Sylvias Haarstudio ersetzen.";

// Galerie-Platzhalter. Jede Kategorie hat ≥ 5 geprüfte Bilder; "Alle" zeigt alle.
const g = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const GALLERY = [
  // Schnitt
  { src: g("1562322140-8baeececf3df", 800, 800), alt: "Präziser Haarschnitt", cat: "Schnitt" },
  { src: g("1503951914875-452162b0f3f1", 800, 800), alt: "Herrenschnitt & Bart", cat: "Schnitt" },
  { src: g("1605497788044-5a32c7078486", 800, 800), alt: "Schnitt im Studio", cat: "Schnitt" },
  { src: g("1622287162716-f311baa1a2b8", 800, 800), alt: "Frische Frisur", cat: "Schnitt" },
  { src: g("1599351431202-1e0f0137899a", 800, 800), alt: "Feiner Männerschnitt", cat: "Schnitt" },
  { src: g("1605980776566-0486c3ac7617", 800, 800), alt: "Klarer Look", cat: "Schnitt" },
  // Farbe
  { src: g("1492106087820-71f1a00d2b11", 800, 800), alt: "Pastell-Farbe", cat: "Farbe" },
  { src: g("1521146764736-56c929d59c83", 800, 800), alt: "Kräftige Farbe", cat: "Farbe" },
  { src: g("1470259078422-826894b933aa", 800, 800), alt: "Lebendiger Farbverlauf", cat: "Farbe" },
  { src: g("1457972729786-0411a3b2b626", 800, 800), alt: "Farbauftrag", cat: "Farbe" },
  { src: g("1554519515-242161756769", 800, 800), alt: "Bunte Strähnen", cat: "Farbe" },
  // Styling
  { src: g("1582095133179-bfd08e2fc6b3", 800, 800), alt: "Flecht-Styling", cat: "Styling" },
  { src: g("1580618672591-eb180b1a973f", 800, 800), alt: "Locken-Styling", cat: "Styling" },
  { src: g("1487412947147-5cebf100ffc2", 800, 800), alt: "Make-up & Beauty", cat: "Styling" },
  { src: g("1620331311520-246422fd82f9", 800, 800), alt: "Pflege & Produkte", cat: "Styling" },
  { src: g("1556228720-195a672e8a03", 800, 800), alt: "Styling-Produkte", cat: "Styling" },
  // Salon
  { src: g("1560066984-138dadb4c035", 800, 800), alt: "Unser Salon", cat: "Salon" },
  { src: g("1521590832167-7bcbfaa6381f", 800, 800), alt: "Salon-Atmosphäre", cat: "Salon" },
  { src: g("1633681926022-84c23e8cb2d6", 800, 800), alt: "Heller Salon", cat: "Salon" },
  { src: g("1559599101-f09722fb4948", 800, 800), alt: "Zufriedene Gäste", cat: "Salon" },
  { src: g("1616394584738-fc6e612e71b9", 800, 800), alt: "Wohlfühlen & Pflege", cat: "Salon" },
];

// Vorher/Nachher-Paare (geprüfte Platzhalter)
export const BEFORE_AFTER = [
  {
    before: g("1521590832167-7bcbfaa6381f", 1000, 750),
    after: g("1560066984-138dadb4c035", 1000, 750),
  },
];
