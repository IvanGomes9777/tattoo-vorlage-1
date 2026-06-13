"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Item, CarouselApi } from "./Carousel";

gsap.registerPlugin(ScrollTrigger);

const Carousel = dynamic(() => import("./Carousel"), {
  ssr: false,
  loading: () => null,
});

/* Platzhalter-Werke – später durch echte Arbeiten ersetzen. */
const WORKS: Item[] = [
  { style: "Blackwork", artist: "[ARTIST_1]", title: "Untitled No. 01", duration: "ca. 6 Std" },
  { style: "Fine-Line", artist: "[ARTIST_2]", title: "Botanical Study", duration: "ca. 3 Std" },
  { style: "Geometric", artist: "[ARTIST_1]", title: "Sacred Grid", duration: "ca. 5 Std" },
  { style: "Realism", artist: "[ARTIST_3]", title: "Portrait II", duration: "ca. 9 Std" },
  { style: "Lettering", artist: "[ARTIST_2]", title: "Memento", duration: "ca. 2 Std" },
  { style: "Blackwork", artist: "[ARTIST_1]", title: "Obsidian Flow", duration: "ca. 7 Std" },
  { style: "Realism", artist: "[ARTIST_3]", title: "Still Life", duration: "ca. 8 Std" },
];

export function Work() {
  const root = useRef<HTMLElement>(null);
  const api = useRef<CarouselApi | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-head]", {
        scrollTrigger: { trigger: root.current, start: "top 78%" },
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const work = WORKS[active];

  return (
    <section
      id="work"
      ref={root}
      className="relative flex min-h-screen flex-col border-t border-line bg-obsidian px-6 py-24 md:px-10 md:py-28"
    >
      {/* Section-Head */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p data-head className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
            01 — Portfolio
          </p>
          <h2 data-head className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.02em] text-bone">
            Ausgewählte Arbeiten
          </h2>
        </div>
        <p data-head className="max-w-[30ch] text-sm leading-relaxed text-bone-dim md:text-right">
          Ziehen oder scrollen, um durch die Werke zu navigieren.
        </p>
      </div>

      {/* Karussell */}
      <div className="relative my-6 h-[72vh] min-h-[480px] w-full flex-1 md:h-[88vh]">
        <Carousel
          items={WORKS}
          onActive={setActive}
          registerApi={(a) => (api.current = a)}
        />
      </div>

      {/* Live-Meta + Steuerung */}
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
            {work.style} · {work.artist} · {work.duration}
          </p>
          <h3 className="mt-2 font-display text-3xl leading-tight text-bone md:text-4xl">
            {work.title}
          </h3>
          <a
            href="#contact"
            className="group relative mt-5 inline-block overflow-hidden border border-bone px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian"
          >
            <span className="absolute inset-0 bg-bone transition-transform duration-500 ease-[var(--ease-quart)] group-hover:translate-y-full" />
            <span className="relative">Ähnliches bei {work.artist} anfragen</span>
          </a>
        </div>

        {/* Prev / Next + Index */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => api.current?.step(-1)}
            aria-label="Vorheriges Werk"
            className="flex h-12 w-12 items-center justify-center border border-line text-bone-dim transition-colors hover:border-bone hover:text-bone"
          >
            ←
          </button>
          <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
            {String(active + 1).padStart(2, "0")} / {String(WORKS.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => api.current?.step(1)}
            aria-label="Nächstes Werk"
            className="flex h-12 w-12 items-center justify-center border border-line text-bone-dim transition-colors hover:border-bone hover:text-bone"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
