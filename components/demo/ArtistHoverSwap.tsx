"use client";

import { ARTISTS, tileBg } from "./artists";

/** C — Hover-Swap: großes Portrait wechselt beim Hover zu einer Arbeit. */
export function ArtistHoverSwap() {
  return (
    <div className="bg-obsidian">
      {ARTISTS.map((a) => (
        <div
          key={a.name}
          className="group relative h-[70vh] min-h-[420px] overflow-hidden border-b border-line"
        >
          {/* Portrait (default) */}
          <div
            className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
            style={{ background: tileBg(a.portraitId), filter: "grayscale(1)" }}
          />
          {/* Arbeit (bei Hover) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: tileBg(a.workIds[0]), filter: "grayscale(1)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-obsidian/30" />

          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
              [PORTRAIT ⇄ WERK] — hover
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                {a.specialty}
              </p>
              <h3 className="font-display text-[clamp(3rem,11vw,9rem)] font-medium leading-[0.82] tracking-[-0.03em] text-bone">
                {a.name}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
