"use client";

import { useState } from "react";
import { STEPS } from "./process";

/** D — Accordion: kompakte Liste, ein Schritt offen, Klick öffnet Detail. */
export function ProcessAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          Ablauf
        </p>
        <h2 className="mb-12 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
          Von der Idee zum Tattoo
        </h2>

        <div className="border-t border-line">
          {STEPS.map((s, idx) => {
            const isOpen = open === idx;
            return (
              <div key={s.no} className="border-b border-line">
                <button
                  onClick={() => setOpen(isOpen ? -1 : idx)}
                  className="flex w-full items-center gap-6 py-6 text-left"
                >
                  <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
                    {s.no}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl transition-colors md:text-3xl ${
                      isOpen ? "text-bone" : "text-bone-dim"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="font-mono text-bone-dim">{isOpen ? "−" : "+"}</span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-[var(--ease-quart)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[48ch] pb-6 pl-12 text-base leading-relaxed text-bone-dim">
                      {s.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
