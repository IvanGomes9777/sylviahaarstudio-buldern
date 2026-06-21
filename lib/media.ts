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
