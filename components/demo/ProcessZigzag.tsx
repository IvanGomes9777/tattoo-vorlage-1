"use client";

import { STEPS } from "./process";

/** G — Zigzag Path: Schritte alternieren links/rechts entlang einer Mittellinie. */
export function ProcessZigzag() {
  return (
    <div className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          Ablauf
        </p>
        <h2 className="mb-16 text-center font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
          Von der Idee zum Tattoo
        </h2>

        <div className="relative">
          {/* Mittellinie (Desktop) */}
          <span className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-line md:block" />
          <div className="flex flex-col gap-12">
            {STEPS.map((s, idx) => (
              <div
                key={s.no}
                className={`relative flex flex-col md:w-1/2 ${
                  idx % 2 === 0 ? "md:self-start md:pr-12 md:text-right" : "md:self-end md:pl-12"
                }`}
              >
                <span
                  className={`absolute top-1 hidden h-3 w-3 rounded-full bg-bone md:block ${
                    idx % 2 === 0 ? "right-[-6px]" : "left-[-6px]"
                  }`}
                />
                <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
                  {s.no}
                </span>
                <h3 className="mt-2 font-display text-2xl text-bone md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-bone-dim">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
