"use client";

import { useState } from "react";
import { DEMO_WORKS, tileBg } from "./works";

/** H — Fullscreen Cinema: ein Werk füllt den Screen, Crossfade, Pfeile + Dots. */
export function OptionCinema() {
  const [i, setI] = useState(0);
  const n = DEMO_WORKS.length;
  const w = DEMO_WORKS[i];
  const go = (d: number) => setI((p) => (p + d + n) % n);

  return (
    <div className="relative h-[88vh] w-full overflow-hidden bg-obsidian">
      <div
        key={i}
        className="fade-in absolute inset-0"
        style={{ background: tileBg(w.id), filter: "grayscale(1)" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(11,11,12,0.9) 0%, rgba(11,11,12,0.1) 45%, rgba(11,11,12,0.5) 100%)",
        }}
      />

      {/* Riesiger Stil-Schriftzug */}
      <div key={`t${i}`} className="fade-in absolute inset-0 flex flex-col justify-between p-8 md:p-12">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          [BILD_{String(w.id).padStart(2, "0")}]
        </span>
        <div>
          <h3 className="font-display text-[clamp(3rem,11vw,9rem)] font-medium leading-[0.85] tracking-[-0.03em] text-bone">
            {w.style}
          </h3>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-bone-dim">
            {w.title} · {w.artist} · {w.duration}
          </p>
        </div>
      </div>

      {/* Steuerung */}
      <button
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-line text-bone-dim transition-colors hover:border-bone hover:text-bone"
        aria-label="Vorheriges"
      >
        ←
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-line text-bone-dim transition-colors hover:border-bone hover:text-bone"
        aria-label="Nächstes"
      >
        →
      </button>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {DEMO_WORKS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Werk ${idx + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === i ? "bg-bone" : "bg-bone-dim/40 hover:bg-bone-dim"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
