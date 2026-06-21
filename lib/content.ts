// REALE Inhalte für die kommenden Sektionen (Über uns, Leistungen, Team, Reviews).
// Quelle: bestehende Website + Google + StudioBookr. Preise/Dauer wie veröffentlicht.

export const ABOUT = {
  intro:
    "Bei Sylvias Haarstudio dreht sich alles um Sie: individuelle Frisurenberatung und maßgeschneiderte Haarschnitte für jeden Anlass. Ihre Zufriedenheit steht bei uns an erster Stelle.",
  points: [
    "Persönliche Typ- und Frisurenberatung – wir hören zu, bevor wir zur Schere greifen.",
    "Professionelle Farbbehandlungen und Pflege mit hochwertigen Produkten.",
    "Styling für Hochzeiten und besondere Anlässe.",
    "Hell, geräumig, kinderfreundlich – ein Salon, in dem man sich wohlfühlt.",
  ],
};

export type Service = {
  name: string;
  price: string;
  duration?: string;
};

export const SERVICES: { category: string; items: Service[] }[] = [
  {
    category: "Damen",
    items: [
      { name: "Damenhaarschnitt inkl. Stylingprodukte", price: "40,00 €", duration: "30 Min." },
      { name: "Waschen, Schneiden, Föhnen – kurz", price: "50,00 €", duration: "45 Min." },
      { name: "Waschen, Schneiden, Föhnen – mittel (kinnlang)", price: "57,00 €", duration: "60 Min." },
      { name: "Waschen, Schneiden, Föhnen – lang (ab Schulter)", price: "70,00 €", duration: "75 Min." },
      { name: "Waschen & Föhn / Legen – kurz", price: "33,00 €", duration: "30 Min." },
      { name: "Waschen & Föhnen – mittel (kinnlang)", price: "38,00 €", duration: "30 Min." },
      { name: "Waschen & Föhnen – lang", price: "45,00 €", duration: "45 Min." },
      { name: "Wimpern färben", price: "14,00 €", duration: "15 Min." },
      { name: "Augenbrauen färben", price: "9,00 €", duration: "15 Min." },
      { name: "Augenbrauen zupfen", price: "7,00 €", duration: "10 Min." },
    ],
  },
  {
    category: "Herren",
    items: [
      { name: "Herrenhaarschnitt", price: "28,00 €", duration: "30 Min." },
      { name: "Maschinenhaarschnitt", price: "18,00 €" },
    ],
  },
  {
    category: "Kids",
    items: [
      { name: "Kinderhaarschnitt (0 – 6 Jahre)", price: "18,50 €", duration: "30 Min." },
      { name: "Kinderhaarschnitt (7 – 14 Jahre)", price: "25,00 €" },
    ],
  },
  {
    category: "Beratung",
    items: [
      { name: "Beratungsgespräch (neuer Schnitt / Neukunden)", price: "15,00 €", duration: "15 Min." },
    ],
  },
];

// Team laut StudioBookr (Nachnamen abgekürzt – Datensparsamkeit).
export const TEAM = [
  { name: "Lina S." },
  { name: "Michaela A." },
  { name: "Simone E." },
  { name: "Sandra M." },
  { name: "Larissa K." },
];

// Echte Google-Rezensionen (öffentlich, Nachname abgekürzt – DSGVO/Branchen-Hinweis).
export const REVIEWS = [
  {
    text: "Ich bin bei Lina in Sylvias Haarstudio seit Jahren Stammkunde und fühle mich dort pudelwohl. Danke für deine gute Arbeit.",
    author: "Jürgen F.",
    stars: 5,
  },
  {
    text: "Tolle Beratung, super Service, gelungene Typveränderung. Ich glaube, ich habe einen neuen Stammfriseur.",
    author: "Heike S.",
    stars: 5,
  },
  {
    text: "Schneller Termin, gute Arbeit, fairer Preis. Herz, was will man mehr?",
    author: "Michael S.",
    stars: 5,
  },
  {
    text: "Hell, geräumig und sehr freundliche Mitarbeiterinnen. Sehr kinderfreundlich.",
    author: "Tiger (Google)",
    stars: 5,
  },
  {
    text: "Sehr nette Damen, die zu einem fairen Preis eine tolle Frisur machen. Danke an das tolle Team.",
    author: "Katrin J.",
    stars: 5,
  },
  {
    text: "Super schnell einen Termin bekommen, sind auf meine Wünsche eingegangen. Preis-Leistung ist in Ordnung. Gerne wieder.",
    author: "Marvin N.",
    stars: 5,
  },
];
