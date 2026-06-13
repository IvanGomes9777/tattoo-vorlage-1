"use client";

import { useState } from "react";
import { STEPS } from "./process";

/** H — Fullscreen Steps: ein Schritt füllt die Bühne, riesige Nummer, Pfeile/Dots. */
export function ProcessFullscreen() {
  const [i, setI] = useState(0);
  const n = STEPS.length;
  const s = STEPS[i];
  const go = (d: number) => setI((p) => (p + d + n) % n);

  return (
    <div className="relative flex h-[82vh] flex-col justify-center overflow-hidden bg-obsidian px-6 md:px-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
        Ablauf — {s.no} / {String(n).padStart(2, "0")}
      </p>

      <div key={i} className="fade-in mt-4">
        <span className="block font-display text-[clamp(6rem,26vw,22rem)] font-medium leading-[0.8] tracking-[-0.04em] text-bone">
          {s.no}
        </span>
        <h3 className="mt-2 font-display text-4xl text-bone md:text-6xl">
          {s.title}
        </h3>
        <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-bone-dim md:text-lg">
          {s.text}
        </p>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Vorheriger Schritt"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line text-bone-dim transition-colors hover:border-bone hover:text-bone md:left-6"
      >
        ←
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Nächster Schritt"
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line text-bone-dim transition-colors hover:border-bone hover:text-bone md:right-6"
      >
        →
      </button>
      <div className="absolute bottom-8 left-6 flex gap-2 md:left-16">
        {STEPS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Schritt ${idx + 1}`}
            className={`h-1.5 w-8 transition-colors ${
              idx === i ? "bg-bone" : "bg-bone-dim/30 hover:bg-bone-dim"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
