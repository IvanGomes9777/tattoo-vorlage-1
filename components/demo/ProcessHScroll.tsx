"use client";

import { STEPS } from "./process";

/** E — Horizontal Scroll Track: seitlich durch breite Schritt-Karten scrollen. */
export function ProcessHScroll() {
  return (
    <div className="bg-obsidian py-20 md:py-28">
      <div className="px-6 md:px-10">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          Ablauf
        </p>
        <h2 className="mb-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
          Von der Idee zum Tattoo
        </h2>
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
          → seitlich scrollen / wischen
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {STEPS.map((s) => (
          <div
            key={s.no}
            className="relative flex h-[60vh] w-[80vw] shrink-0 snap-start flex-col justify-between border border-line bg-surface p-8 md:w-[420px] md:p-10"
          >
            <span className="font-display text-7xl text-bone-dim md:text-8xl">
              {s.no}
            </span>
            <div>
              <h3 className="font-display text-3xl text-bone">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
