"use client";

import { STEPS } from "./process";

/** B — Horizontaler Stepper: Schritte als Karten mit Verbindungslinie. */
export function ProcessStepper() {
  return (
    <div className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
        Ablauf
      </p>
      <h2 className="mb-16 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
        Von der Idee zum Tattoo
      </h2>

      <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.no}
            className="group relative bg-obsidian p-8 transition-colors hover:bg-surface"
          >
            <span className="font-display text-5xl text-line transition-colors group-hover:text-bone-dim md:text-6xl">
              {s.no}
            </span>
            <h3 className="mt-4 font-display text-xl text-bone">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-bone-dim">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
