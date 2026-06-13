"use client";

import { useState } from "react";
import { ARTISTS, tileBg } from "./artists";

/** D — Tabbed Stage: Tabs je Künstler, große Bühne mit Bio + Mini-Galerie. */
export function ArtistTabbedStage() {
  const [t, setT] = useState(0);
  const a = ARTISTS[t];

  return (
    <div className="min-h-[82vh] bg-obsidian px-6 py-12 md:px-10">
      {/* Tabs */}
      <div className="mb-10 flex gap-3">
        {ARTISTS.map((ar, idx) => (
          <button
            key={ar.name}
            onClick={() => setT(idx)}
            className={`border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
              t === idx
                ? "border-bone text-bone"
                : "border-line text-bone-dim hover:border-bone hover:text-bone"
            }`}
          >
            {ar.name}
          </button>
        ))}
      </div>

      <div key={t} className="fade-in grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
        {/* Portrait */}
        <div
          className="relative aspect-[4/5] w-full"
          style={{ background: tileBg(a.portraitId), filter: "grayscale(1)" }}
        >
          <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
            [PORTRAIT]
          </span>
        </div>

        {/* Info + Mini-Galerie */}
        <div className="flex flex-col justify-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            {a.specialty}
          </p>
          <h3 className="mt-3 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.88] tracking-[-0.02em] text-bone">
            {a.name}
          </h3>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-bone-dim">
            {a.bio}
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {a.workIds.map((id) => (
              <div
                key={id}
                className="relative aspect-square"
                style={{ background: tileBg(id), filter: "grayscale(1)" }}
              >
                <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.15em] text-bone-dim">
                  [WERK]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
