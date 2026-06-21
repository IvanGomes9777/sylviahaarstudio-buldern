# Sylvia Haarstudio Buldern — Website

Premium-Website (Next.js 14 · Tailwind · Framer Motion), gebaut **Sektion für Sektion**
nach den Projekt-Pflichtdokumenten (Branchen-Briefing, Magic-Template, Compliance,
Responsive-Guide, SEO/GEO, Web-Security/DSGVO).

## Status

| Sektion | Status |
|---|---|
| **1. Navbar / Header** | ✅ Freigegeben: **Option 5 „Warm-Welcoming Cozy"** (mit Logo + StudioBookr-CTA) |
| 2. Hero | 🟡 als nächstes – 5 Optionen folgen |
| 3. Über uns / Leistungen / Galerie / Team / Kontakt / Footer | ⏳ |

Navigation: Start · Über uns · Leistungen · **Galerie** · Team · Kontakt.
Showcase der 5 Navbar-Optionen weiterhin unter **`/showcase`**.

> ⚠️ Footer verlinkt `/impressum` + `/datenschutz` – diese Rechtstexte kommen aus
> einem seriösen Generator (eRecht24 o. ä.) mit den UG-Daten, **vor** dem Live-Gang.

## Lokal starten

```bash
npm install
npm run dev
# http://localhost:3000  → Navbar-Showcase mit Live-Switcher (Option 1–5)
```

> Beim ersten Build lädt `next/font` die Schriften einmalig herunter und hostet sie
> danach **self-hosted** (DSGVO-konform, kein Google-CDN zur Laufzeit).

## Deployment

```bash
vercel        # Preview
vercel --prod # Production
```

**[Vercel Preview Link]** ← hier nach dem Deploy eintragen.

## Eingebaute Grundlagen (von Anfang an)

- **Security Headers** (CSP, X-Frame-Options, HSTS …) in `next.config.mjs`
- **DSGVO-Fonts** via `next/font` (self-hosted)
- **Responsive**: Mobile-First, `clamp()`, `svh`, Touch-Ziele ≥ 44px
- **SEO**: `lang="de"`, Metadata/OpenGraph, semantisches HTML
