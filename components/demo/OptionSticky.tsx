"use client";

import { useEffect, useRef, useState } from "react";
import { DEMO_WORKS, tileBg } from "./works";

/** K — Sticky Scroll: linkes Bild bleibt sticky & wechselt, rechts scrollen die Texte. */
export function OptionSticky() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const w = DEMO_WORKS[active];

  return (
    <div className="grid grid-cols-1 bg-obsidian md:grid-cols-2">
      {/* Sticky-Bild */}
      <div className="sticky top-0 h-[50vh] md:h-screen">
        <div
          key={active}
          className="fade-in absolute inset-0"
          style={{ background: tileBg(w.id), filter: "grayscale(1)" }}
        />
        <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
          [BILD_{String(w.id).padStart(2, "0")}]
        </span>
      </div>

      {/* Scrollende Texte */}
      <div className="px-8 md:px-12">
        {DEMO_WORKS.map((it, idx) => (
          <div
            key={it.id}
            data-idx={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            className="flex min-h-[70vh] flex-col justify-center border-b border-line"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
              {String(idx + 1).padStart(2, "0")} — {it.style}
            </p>
            <h3
              className={`mt-3 font-display text-4xl leading-tight transition-colors md:text-5xl ${
                idx === active ? "text-bone" : "text-bone-dim"
              }`}
            >
              {it.title}
            </h3>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-bone-dim">
              {it.artist} · {it.duration}. Platzhalter-Beschreibung des Werks —
              hier später eine kurze Geschichte zum Stück.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
