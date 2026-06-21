// REALE Inhalte für die kommenden Sektionen (Über uns, Leistungen, Team, Reviews).
// Quelle: bestehende Website + Google + StudioBookr. Preise/Dauer wie veröffentlicht.

export const ABOUT = {
  eyebrow: "Über uns",
  headline: "Schön, dass du da bist",
  intro:
    "Bei Sylvias Haarstudio dreht sich alles um dich: individuelle Frisurenberatung und maßgeschneiderte Haarschnitte für jeden Anlass. Deine Zufriedenheit steht bei uns an erster Stelle.",
  points: [
    "Persönliche Typ- und Frisurenberatung – wir hören zu, bevor wir zur Schere greifen.",
    "Professionelle Farbbehandlungen und Pflege mit hochwertigen Produkten.",
    "Styling für Hochzeiten und besondere Anlässe.",
    "Hell, geräumig, kinderfreundlich – ein Salon, in dem man sich wohlfühlt.",
  ],
};

// Strukturierte USP-Bausteine (für Karten-/Zickzack-Layouts).
export const ABOUT_FEATURES = [
  {
    icon: "consult",
    title: "Persönliche Beratung",
    desc: "Wir hören zu, bevor wir zur Schere greifen – Typ- und Frisurenberatung, die wirklich zu dir passt.",
  },
  {
    icon: "color",
    title: "Farbe & Pflege",
    desc: "Professionelle Farbbehandlungen und Pflege ausschließlich mit hochwertigen Produkten.",
  },
  {
    icon: "occasion",
    title: "Für jeden Anlass",
    desc: "Vom schnellen Alltagsschnitt bis zum Styling für Hochzeit und besondere Tage.",
  },
  {
    icon: "cozy",
    title: "Zum Wohlfühlen",
    desc: "Hell, geräumig und kinderfreundlich – ein Salon, in dem man gerne etwas verweilt.",
  },
] as const;

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
// Team laut StudioBookr. Porträts = geprüfte Unsplash-Platzhalter (später echte
// Team-Fotos). role/specialty sind Platzhalter – bitte vom Salon bestätigen.
const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&h=750&q=80`;

export const TEAM = [
  { name: "Lina S.", role: "Friseurin", specialty: "Schnitt & Farbe", img: portrait("1494790108377-be9c29b29330") },
  { name: "Michaela A.", role: "Friseurin", specialty: "Styling & Beratung", img: portrait("1438761681033-6461ffad8d80") },
  { name: "Simone E.", role: "Friseurin", specialty: "Farbe & Pflege", img: portrait("1580489944761-15a19d654956") },
  { name: "Sandra M.", role: "Friseurin", specialty: "Schnitt & Styling", img: portrait("1517841905240-472988babdf9") },
  { name: "Larissa K.", role: "Friseurin", specialty: "Farbe & Trends", img: portrait("1492462543947-040389c4a66c") },
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
