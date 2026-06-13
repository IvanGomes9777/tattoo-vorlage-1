"use client";

import { STEPS } from "./process";

/** A — Vertikale Timeline: große Nummern, durchgehende Linie. Editorial. */
export function ProcessTimeline() {
  return (
    <div className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          Ablauf
        </p>
        <h2 className="mb-16 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
          Von der Idee zum Tattoo
        </h2>

        <div className="relative border-l border-line pl-8 md:pl-12">
          {STEPS.map((s) => (
            <div key={s.no} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[41px] top-1 h-2 w-2 rounded-full bg-bone md:-left-[57px]" />
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
                <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
                  {s.no}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-bone md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-bone-dim">
                    {s.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
