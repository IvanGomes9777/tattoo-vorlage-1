"use client";

import { useState } from "react";
import { DEMO_WORKS, tileBg } from "./works";

/** I — Split Index: links Liste, rechts großes Preview das beim Hover wechselt. */
export function OptionSplit() {
  const [i, setI] = useState(0);
  const w = DEMO_WORKS[i];

  return (
    <div className="grid min-h-[88vh] grid-cols-1 bg-obsidian md:grid-cols-[1fr_1.2fr]">
      {/* Index */}
      <div className="flex flex-col justify-center gap-1 px-8 py-12 md:px-12">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          Index
        </p>
        {DEMO_WORKS.map((it, idx) => (
          <button
            key={it.id}
            onMouseEnter={() => setI(idx)}
            onClick={() => setI(idx)}
            className="group flex items-baseline justify-between border-b border-line py-4 text-left"
          >
            <span
              className={`font-display text-2xl transition-colors md:text-4xl ${
                idx === i ? "text-bone" : "text-bone-dim group-hover:text-bone"
              }`}
            >
              {it.title}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
              {it.style}
            </span>
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="relative min-h-[50vh] md:min-h-full">
        <div
          key={i}
          className="fade-in absolute inset-0"
          style={{ background: tileBg(w.id), filter: "grayscale(1)" }}
        />
        <div className="absolute bottom-0 left-0 p-8 md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
            {w.artist} · {w.duration}
          </p>
        </div>
      </div>
    </div>
  );
}
