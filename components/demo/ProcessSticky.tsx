"use client";

import { useEffect, useRef, useState } from "react";
import { STEPS } from "./process";

/** C — Sticky Pinned: links große Nummer (bleibt stehen), rechts scrollen Schritte. */
export function ProcessSticky() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.idx));
        }),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 bg-obsidian md:grid-cols-2">
      {/* Sticky-Seite */}
      <div className="sticky top-0 flex h-[40vh] flex-col justify-center px-6 md:h-screen md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          Ablauf
        </p>
        <div key={active} className="fade-in mt-4">
          <span className="font-display text-[clamp(5rem,18vw,14rem)] font-medium leading-none text-bone">
            {STEPS[active].no}
          </span>
          <h3 className="mt-2 font-display text-3xl text-bone md:text-4xl">
            {STEPS[active].title}
          </h3>
        </div>
      </div>

      {/* Scroll-Seite */}
      <div className="px-6 md:px-10">
        {STEPS.map((s, idx) => (
          <div
            key={s.no}
            data-idx={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            className="flex min-h-[60vh] flex-col justify-center border-b border-line"
          >
            <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
              {s.no}
            </span>
            <h4
              className={`mt-3 font-display text-3xl transition-colors md:text-4xl ${
                idx === active ? "text-bone" : "text-bone-dim"
              }`}
            >
              {s.title}
            </h4>
            <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-bone-dim">
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
