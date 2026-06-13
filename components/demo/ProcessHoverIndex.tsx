"use client";

import { useState } from "react";
import { STEPS } from "./process";

/** F — Hover Index: links große Schritt-Liste, rechts Detail (Hover wechselt). */
export function ProcessHoverIndex() {
  const [i, setI] = useState(0);
  const s = STEPS[i];

  return (
    <div className="bg-obsidian px-6 py-20 md:px-10 md:py-28">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
        Ablauf
      </p>
      <h2 className="mb-14 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
        Von der Idee zum Tattoo
      </h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          {STEPS.map((st, idx) => (
            <button
              key={st.no}
              onMouseEnter={() => setI(idx)}
              onClick={() => setI(idx)}
              className="group flex w-full items-baseline gap-5 border-b border-line py-5 text-left"
            >
              <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
                {st.no}
              </span>
              <span
                className={`font-display text-3xl transition-colors md:text-5xl ${
                  idx === i ? "text-bone" : "text-bone-dim group-hover:text-bone"
                }`}
              >
                {st.title}
              </span>
            </button>
          ))}
        </div>

        <div key={i} className="fade-in flex flex-col justify-center border border-line bg-surface p-8 md:p-10">
          <span className="font-display text-7xl text-bone-dim">{s.no}</span>
          <h3 className="mt-4 font-display text-2xl text-bone">{s.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-bone-dim">{s.text}</p>
        </div>
      </div>
    </div>
  );
}
