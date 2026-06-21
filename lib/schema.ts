import { SITE } from "@/lib/site";

const BASE = "https://www.sylvias-haarstudio.de";

// JSON-LD @graph (Organization + WebSite + WebPage + HairSalon) – nur reale Daten.
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: SITE.legalName,
      alternateName: "Sylvias Haarstudio",
      url: `${BASE}/`,
      logo: { "@type": "ImageObject", url: `${BASE}/sylvialogo.png` },
      sameAs: [SITE.contact.instagram, SITE.contact.google],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.contact.phoneHref,
        contactType: "customer service",
        areaServed: "DE",
        availableLanguage: ["de"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: `${BASE}/`,
      name: "Sylvias Haarstudio",
      publisher: { "@id": `${BASE}/#organization` },
      inLanguage: "de",
    },
    {
      "@type": ["HairSalon", "LocalBusiness"],
      "@id": `${BASE}/#localbusiness`,
      name: "Sylvias Haarstudio",
      image: `${BASE}/sylvialogo.png`,
      url: `${BASE}/`,
      telephone: SITE.contact.phoneHref,
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.contact.street,
        postalCode: SITE.contact.zip,
        addressLocality: `${SITE.contact.city}-${SITE.contact.district}`,
        addressCountry: "DE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "18:00",
        },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: SITE.rating.value,
        reviewCount: SITE.rating.count,
        bestRating: 5,
      },
      sameAs: [SITE.contact.instagram, SITE.contact.google],
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      url: `${BASE}/`,
      name: "Sylvias Haarstudio – Friseur in Dülmen-Buldern",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
      inLanguage: "de",
    },
  ],
};
