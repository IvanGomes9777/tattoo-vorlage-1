"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Platzhalter-Daten ───────────────────────────────────────────────
   Später durch echte Werke ersetzen. `img` ist Platzhalter ([BILD]).
   `span` steuert den editorialen Rhythmus (manche Kacheln höher).        */
type Work = {
  id: number;
  style: string;
  artist: string;
  title: string;
  duration: string;
  span?: boolean; // true = doppelte Höhe
};

const STYLES = [
  "Alle",
  "Blackwork",
  "Fine-Line",
  "Realism",
  "Geometric",
  "Lettering",
] as const;

const WORKS: Work[] = [
  { id: 1, style: "Blackwork", artist: "[ARTIST_1]", title: "Untitled No. 01", duration: "ca. 6 Std", span: true },
  { id: 2, style: "Fine-Line", artist: "[ARTIST_2]", title: "Botanical Study", duration: "ca. 3 Std" },
  { id: 3, style: "Geometric", artist: "[ARTIST_1]", title: "Sacred Grid", duration: "ca. 5 Std" },
  { id: 4, style: "Realism", artist: "[ARTIST_3]", title: "Portrait II", duration: "ca. 9 Std", span: true },
  { id: 5, style: "Lettering", artist: "[ARTIST_2]", title: "Memento", duration: "ca. 2 Std" },
  { id: 6, style: "Blackwork", artist: "[ARTIST_1]", title: "Obsidian Flow", duration: "ca. 7 Std" },
  { id: 7, style: "Fine-Line", artist: "[ARTIST_2]", title: "Thin Lines", duration: "ca. 2,5 Std", span: true },
  { id: 8, style: "Geometric", artist: "[ARTIST_3]", title: "Polygon", duration: "ca. 4 Std" },
  { id: 9, style: "Realism", artist: "[ARTIST_3]", title: "Still Life", duration: "ca. 8 Std" },
];

export function Work() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof STYLES)[number]>("Alle");
  const [active, setActive] = useState<Work | null>(null);

  const visible =
    filter === "Alle" ? WORKS : WORKS.filter((w) => w.style === filter);

  // Scroll-Reveal der Kacheln (gestaffelt, sobald sichtbar)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-tile]", {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
      // Header-Reveal
      gsap.from("[data-head]", {
        scrollTrigger: { trigger: root.current, start: "top 80%" },
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Re-Reveal nach Filterwechsel
  useEffect(() => {
    gsap.fromTo(
      "[data-tile]",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.05 }
    );
  }, [filter]);

  // Scroll-Lock bei offener Lightbox
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="work"
      ref={root}
      className="relative border-t border-line bg-obsidian px-6 py-28 md:px-10 md:py-40"
    >
      {/* Section-Head */}
      <div className="mb-14 flex flex-col justify-between gap-8 md:mb-20 md:flex-row md:items-end">
        <div>
          <p data-head className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
            01 — Portfolio
          </p>
          <h2 data-head className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.02em] text-bone">
            Ausgewählte Arbeiten
          </h2>
        </div>
        <p data-head className="max-w-[34ch] text-sm leading-relaxed text-bone-dim md:text-right">
          Kein Katalog zum Abhaken — eine Auswahl. Jedes Stück entsteht
          individuell mit dem jeweiligen Artist. <span className="font-mono text-bone">{visible.length} Werke</span>
        </p>
      </div>

      {/* Filter */}
      <div data-head className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-5">
        {STYLES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`font-mono text-[12px] uppercase tracking-[0.2em] transition-colors ${
              filter === s ? "text-bone" : "text-bone-dim hover:text-bone"
            }`}
          >
            {s}
            {filter === s && (
              <span className="ml-2 inline-block h-1 w-1 translate-y-[-2px] rounded-full bg-bone align-middle" />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid auto-rows-[240px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {visible.map((w) => (
          <button
            key={w.id}
            data-tile
            onClick={() => setActive(w)}
            style={{ opacity: 0, transform: "translateY(24px)" }}
            className={`group relative overflow-hidden bg-surface text-left ${
              w.span ? "row-span-2" : ""
            }`}
          >
            {/* [BILD]-Platzhalter: entsättigter Verlauf statt echtem Foto */}
            <div
              className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-quart)] group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, #1b1b1f 0%, #0e0e10 55%, #202024 100%)`,
                filter: "grayscale(1)",
              }}
            />
            <span className="absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
              [BILD_{String(w.id).padStart(2, "0")}]
            </span>

            {/* Hover-Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
                {w.style} · {w.artist}
              </span>
              <span className="mt-1 font-display text-lg leading-tight text-bone">
                {w.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-4 md:p-10"
          onClick={() => setActive(null)}
        >
          <div
            className="relative grid w-full max-w-5xl grid-cols-1 gap-0 border border-line bg-surface md:grid-cols-[1.4fr_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="aspect-[4/3] w-full md:aspect-auto"
              style={{
                background:
                  "linear-gradient(135deg, #1b1b1f 0%, #0e0e10 55%, #202024 100%)",
                filter: "grayscale(1)",
              }}
            />
            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                  {active.style}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-bone">
                  {active.title}
                </h3>
                <dl className="mt-8 space-y-3 font-mono text-[12px] uppercase tracking-[0.15em] text-bone-dim">
                  <div className="flex justify-between border-b border-line pb-3">
                    <dt>Artist</dt>
                    <dd className="text-bone">{active.artist}</dd>
                  </div>
                  <div className="flex justify-between border-b border-line pb-3">
                    <dt>Dauer</dt>
                    <dd className="text-bone">{active.duration}</dd>
                  </div>
                </dl>
              </div>
              <a
                href="#contact"
                className="group relative mt-10 inline-block overflow-hidden border border-bone px-6 py-4 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-obsidian"
              >
                <span className="absolute inset-0 bg-bone transition-transform duration-500 ease-[var(--ease-quart)] group-hover:translate-y-full" />
                <span className="relative">Ähnliches bei {active.artist} anfragen</span>
              </a>
            </div>

            <button
              onClick={() => setActive(null)}
              aria-label="Schließen"
              className="absolute right-4 top-4 z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
            >
              [ Esc ] Schließen
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
