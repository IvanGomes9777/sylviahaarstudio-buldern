"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavbarWarmCozy from "@/components/navbars/NavbarWarmCozy";
import {
  GalleryMasonry,
  GalleryBeforeAfter,
  GalleryMarquee,
  GalleryExpand,
  GalleryBento,
} from "@/components/sections/gallery/GalleryVariants";
import {
  GalleryScrollX,
  GalleryCoverflow,
  GallerySpotlight,
  GalleryFilter,
  GalleryParallaxColumns,
} from "@/components/sections/gallery/GalleryPremium";
import {
  GalleryInstagram,
  GalleryMasonryRefined,
  GalleryClean,
  GalleryClipReveal,
} from "@/components/sections/gallery/GalleryRefined";
import {
  GalleryPolaroid,
  GalleryFeatured,
  GalleryCarousel,
  GalleryEditorial,
} from "@/components/sections/gallery/GalleryV2";

const VARIANTS = [
  { id: "E", name: "★ Polaroid-Pinboard", G: GalleryPolaroid },
  { id: "F", name: "★ Featured + Thumbs", G: GalleryFeatured },
  { id: "G", name: "★ Swipe-Carousel", G: GalleryCarousel },
  { id: "H", name: "★ Editorial-Mosaik", G: GalleryEditorial },
  { id: "A", name: "Instagram-Feed", G: GalleryInstagram },
  { id: "B", name: "Masonry + Slide-Caption", G: GalleryMasonryRefined },
  { id: "C", name: "Clean Zoom/Fade", G: GalleryClean },
  { id: "D", name: "Clip-Reveal", G: GalleryClipReveal },
  { id: "6", name: "Scroll-Filmstrip", G: GalleryScrollX },
  { id: "7", name: "★ 3D-Coverflow", G: GalleryCoverflow },
  { id: "8", name: "★ Cursor-Spotlight", G: GallerySpotlight },
  { id: "9", name: "★ Filter + Layout-Anim", G: GalleryFilter },
  { id: "10", name: "★ Parallax-Spalten", G: GalleryParallaxColumns },
  { id: "1", name: "Masonry + Lightbox", G: GalleryMasonry },
  { id: "2", name: "Vorher/Nachher-Slider", G: GalleryBeforeAfter },
  { id: "3", name: "Marquee (2 Reihen)", G: GalleryMarquee },
  { id: "4", name: "Hover-Expand", G: GalleryExpand },
  { id: "5", name: "Bento + 3D-Tilt", G: GalleryBento },
];

export default function GalleryShowcase() {
  const [active, setActive] = useState("E");
  const current = VARIANTS.find((v) => v.id === active)!;
  const ActiveG = current.G;

  return (
    <main className="relative bg-cream pb-28 pt-20">
      <NavbarWarmCozy />
      <div key={active}>
        <ActiveG />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/85 p-2.5 shadow-2xl backdrop-blur-xl">
          <div className="mb-1 text-center text-[0.6rem] tracking-[0.3em] text-white/40">
            GALERIE – 5 OPTIONEN (WARM-COZY)
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setActive(v.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative rounded-xl px-3.5 py-2 transition-colors ${
                  active === v.id ? "text-white" : "text-white/55 hover:text-white/80"
                }`}
              >
                {active === v.id && (
                  <motion.span
                    layoutId="gal-pill"
                    className="absolute inset-0 -z-0 rounded-xl bg-white/12 ring-1 ring-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 block text-[0.72rem] font-semibold">Option {v.id}</span>
                <span className="relative z-10 hidden text-[0.6rem] opacity-70 sm:block">{v.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
