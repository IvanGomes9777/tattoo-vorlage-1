"use client";

import { ARTISTS, tileBg } from "./artists";

/** A — Split Duo: zwei raumhohe Panels, gehovertes wächst & zeigt Bio. */
export function ArtistSplitDuo() {
  return (
    <div className="flex min-h-[82vh] flex-col bg-obsidian md:flex-row">
      {ARTISTS.map((a) => (
        <div
          key={a.name}
          className="group relative flex-1 overflow-hidden transition-[flex] duration-700 ease-[var(--ease-quart)] md:hover:flex-[1.6]"
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-quart)] group-hover:scale-105"
            style={{ background: tileBg(a.portraitId), filter: "grayscale(1)" }}
          />
          <div className="absolute inset-0 bg-obsidian/40 transition-colors duration-500 group-hover:bg-obsidian/20" />
          <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
            [PORTRAIT]
          </span>

          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
              {a.specialty}
            </p>
            <h3 className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-medium leading-[0.9] text-bone">
              {a.name}
            </h3>
            <p className="mt-4 max-h-0 max-w-[40ch] overflow-hidden text-sm leading-relaxed text-bone-dim opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
              {a.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
