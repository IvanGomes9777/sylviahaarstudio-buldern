// Zentrale, REALE Unternehmensdaten (Quelle: bestehende Website, Google-Profil,
// StudioBookr, vom Kunden bestätigt). SEO/GEO-Regel: nichts erfinden.
// Adresse liegt in 48249 Dülmen-Buldern (Vorwahl 02590 = Buldern).

export const SITE = {
  name: "Sylvias",
  suffix: "Haarstudio",
  legalName: "Sylvias Haarstudio UG (haftungsbeschränkt)",
  brandLine: "HAARSTUDIO · DÜLMEN-BULDERN",
  slogan: "Ihr Friseursalon für jeden Anlass",
  cta: "Termin buchen",
  ctaPhone: "Anrufen",

  contact: {
    street: "Gerstenkamp 4",
    zip: "48249",
    city: "Dülmen",
    district: "Buldern",
    phone: "02590 4145",
    phoneHref: "+4925904145",
    instagram: "https://www.instagram.com/sylvias.haarstudio/",
    booking: "https://www.studiobookr.com/sylvias-haarstudio-ug-65843",
    google: "https://share.google/sZMzrtKo90t1TQzjW",
  },

  rating: { value: 4.5, count: 35 },

  // Mo–Do 09–18, Fr 09–19, Sa 08–13, So geschlossen
  hours: [
    { day: "Montag", time: "09:00 – 18:00", open: true },
    { day: "Dienstag", time: "09:00 – 18:00", open: true },
    { day: "Mittwoch", time: "09:00 – 18:00", open: true },
    { day: "Donnerstag", time: "09:00 – 18:00", open: true },
    { day: "Freitag", time: "09:00 – 19:00", open: true },
    { day: "Samstag", time: "08:00 – 13:00", open: true },
    { day: "Sonntag", time: "Geschlossen", open: false },
  ],

  nav: [
    { label: "Start", href: "#start" },
    { label: "Über uns", href: "#ueber-uns" },
    { label: "Leistungen", href: "#leistungen" },
    { label: "Team", href: "#team" },
    { label: "Kontakt", href: "#kontakt" },
  ],
} as const;
