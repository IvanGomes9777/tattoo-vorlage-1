"use client";

import { ARTISTS, tileBg } from "./artists";

/** B — Editorial Stack: große alternierende Zeilen (Portrait / Text). */
export function ArtistEditorialStack() {
  return (
    <div className="bg-obsidian px-6 py-12 md:px-10">
      {ARTISTS.map((a, idx) => (
        <div
          key={a.name}
          className={`grid grid-cols-1 items-center gap-8 border-b border-line py-12 md:grid-cols-2 md:gap-14 md:py-20 ${
            idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Portrait */}
          <div
            className="relative aspect-[4/5] w-full"
            style={{ background: tileBg(a.portraitId), filter: "grayscale(1)" }}
          >
            <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
              [PORTRAIT]
            </span>
          </div>

          {/* Text */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
              0{idx + 1} — {a.specialty}
            </p>
            <h3 className="mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.86] tracking-[-0.02em] text-bone">
              {a.name}
            </h3>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-bone-dim">
              {a.bio}
            </p>
            <a
              href="#"
              className="mt-8 inline-block border-b border-bone pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone"
            >
              Werke ansehen →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
