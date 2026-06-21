"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Live-Öffnungsstatus. WICHTIG: Die Seite wird statisch gebaut (SSG) – würde man
 * `new Date()` direkt im Markup nutzen, fröre der Wochentag auf das Build-Datum ein.
 * Deshalb wird der echte „Heute"-Status erst im Browser (useEffect) berechnet.
 * Vor der Hydration zeigt ein deterministischer Fallback die korrekten Wochenzeiten.
 */

function parseRange(t: string): { start: number; end: number } | null {
  const m = t.match(/(\d{1,2}):(\d{2}).*?(\d{1,2}):(\d{2})/);
  if (!m) return null;
  return { start: +m[1] * 60 + +m[2], end: +m[3] * 60 + +m[4] };
}

export default function OpeningStatus() {
  const [live, setLive] = useState<{ text: string; open: boolean } | null>(null);

  useEffect(() => {
    const now = new Date();
    const today = SITE.hours[(now.getDay() + 6) % 7]; // Mo=0 … So=6
    if (!today.open) {
      setLive({ text: "Heute geschlossen", open: false });
      return;
    }
    const r = parseRange(today.time);
    const cur = now.getHours() * 60 + now.getMinutes();
    const [from, to] = today.time.split("–").map((s) => s.trim());
    if (r && cur < r.start) setLive({ text: `Öffnet heute um ${from} Uhr`, open: false });
    else if (r && cur < r.end) setLive({ text: `Jetzt geöffnet · bis ${to} Uhr`, open: true });
    else setLive({ text: "Heute geschlossen", open: false });
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      <Clock size={15} className="text-terracotta" />
      {live ? (
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${live.open ? "bg-emerald-500" : "bg-walnut/40"}`} />
          {live.text}
        </span>
      ) : (
        <span>Mo–Do 9–18 · Fr 9–19 · Sa 8–13 Uhr</span>
      )}
    </span>
  );
}
