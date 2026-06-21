# Sylvia Haarstudio Buldern — Website

Premium-Website (Next.js 14 · Tailwind · Framer Motion), gebaut **Sektion für Sektion**
nach den Projekt-Pflichtdokumenten (Branchen-Briefing, Magic-Template, Compliance,
Responsive-Guide, SEO/GEO, Web-Security/DSGVO).

## Status

| Sektion | Status |
|---|---|
| **1. Navbar / Header** | 🟡 5 Optionen zur Auswahl (Showcase) |
| 2. Hero | ⏳ wartet auf Navbar-Freigabe |
| 3. Über uns / Leistungen / Galerie / Kontakt / Footer | ⏳ |

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
