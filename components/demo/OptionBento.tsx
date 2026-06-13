"use client";

import { useState } from "react";
import { DEMO_WORKS, tileBg } from "./works";

/** J — Bento Grid: asymmetrisches Raster, Feature-Tile, Hover-Zoom, Lightbox. */
export function OptionBento() {
  const [active, setActive] = useState<number | null>(null);

  // Bento-Spans (col/row) je Position
  const spans = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "md:col-span-2",
  ];

  return (
    <div className="min-h-[88vh] bg-obsidian px-6 py-12 md:px-10">
      <div className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {DEMO_WORKS.map((w, idx) => (
          <button
            key={w.id}
            onClick={() => setActive(idx)}
            className={`group relative overflow-hidden ${spans[idx] ?? ""}`}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-quart)] group-hover:scale-105"
              style={{ background: tileBg(w.id), filter: "grayscale(1)" }}
            />
            <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
              [BILD_{String(w.id).padStart(2, "0")}]
            </span>
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-obsidian/90 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
                {w.style} · {w.artist}
              </span>
              <span className="font-display text-lg text-bone">{w.title}</span>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[16/10] w-full"
              style={{
                background: tileBg(DEMO_WORKS[active].id),
                filter: "grayscale(1)",
              }}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display text-2xl text-bone">
                {DEMO_WORKS[active].title}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
                {DEMO_WORKS[active].style} · {DEMO_WORKS[active].artist}
              </p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="absolute right-0 top-[-2rem] font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim hover:text-bone"
            >
              [ Esc ] Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
