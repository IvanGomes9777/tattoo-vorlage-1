"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/anim/Reveal";

type Work = {
  src: string;
  style: string;
  artist: string;
  title: string;
  duration: string;
  /** Flex-Gewicht für die justierte Zeile (Desktop). */
  w: number;
};

/* 7 Werke – Bilder: Pexels (kostenlose Lizenz, kommerziell nutzbar, keine
   Attribution nötig). Stil/Artist/Titel sind Platzhalter. */
const WORKS: Work[] = [
  { src: "/portfolio/tattoo-1.jpg", style: "Blackwork", artist: "[ARTIST_1]", title: "Untitled No. 01", duration: "ca. 6 Std", w: 1.4 },
  { src: "/portfolio/tattoo-2.jpg", style: "Fine-Line", artist: "[ARTIST_2]", title: "Botanical Study", duration: "ca. 3 Std", w: 1 },
  { src: "/portfolio/tattoo-3.jpg", style: "Realism", artist: "[ARTIST_3]", title: "Portrait II", duration: "ca. 9 Std", w: 1.2 },
  { src: "/portfolio/tattoo-5.jpg", style: "Lettering", artist: "[ARTIST_2]", title: "Memento", duration: "ca. 2 Std", w: 0.9 },
  { src: "/portfolio/tattoo-4.jpg", style: "Geometric", artist: "[ARTIST_1]", title: "Sacred Grid", duration: "ca. 5 Std", w: 1 },
  { src: "/portfolio/tattoo-6.jpg", style: "Blackwork", artist: "[ARTIST_1]", title: "Obsidian Flow", duration: "ca. 7 Std", w: 1.5 },
  { src: "/portfolio/tattoo-7.jpg", style: "Realism", artist: "[ARTIST_3]", title: "Still Life", duration: "ca. 8 Std", w: 1.2 },
];

// Justierte Zeilen (Desktop): erste vier oben, drei unten.
const ROWS: number[][] = [
  [0, 1, 2, 3],
  [4, 5, 6],
];

export function Portfolio() {
  const n = WORKS.length;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (d: number) => setOpen((p) => (p === null ? p : (p + d + n) % n)),
    [n]
  );

  // Lightbox: Tastatur (Esc / ←/→) + Body-Scroll sperren, solange offen.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  const active = open === null ? null : WORKS[open];

  return (
    <section
      id="work"
      className="border-t border-line bg-obsidian px-6 py-16 md:px-10 md:py-20"
    >
      <Reveal
        variant="up"
        className="mb-8 flex items-end justify-between gap-6 md:mb-12"
      >
        <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] font-medium leading-[0.85] tracking-[-0.03em] text-bone">
          Work
        </h2>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
          {String(n).padStart(2, "0")} Werke · zum Vergrößern klicken
        </p>
      </Reveal>

      {/* Justierte Galerie: Mobile gestapelt, Desktop in gewichteten Zeilen.
          Reveal umschließt jede Zeile (cinematischer Settle); die Klick-Kacheln
          sind eigenständige Buttons (Lightbox-Trigger). */}
      <div className="flex flex-col gap-3 md:gap-4">
        {ROWS.map((row, r) => (
          <Reveal
            key={r}
            variant="image"
            delay={r * 0.1}
            className="flex flex-col gap-3 md:h-[42vh] md:flex-row md:gap-4"
          >
            {row.map((idx) => {
              const wk = WORKS[idx];
              return (
                <button
                  key={wk.src}
                  type="button"
                  onClick={() => setOpen(idx)}
                  aria-label={`${wk.title} — ${wk.style} vergrößern`}
                  style={{ flexGrow: wk.w }}
                  className="group relative h-[58vw] w-full overflow-hidden bg-surface md:h-full"
                >
                  <Image
                    src={wk.src}
                    alt={`${wk.style} — ${wk.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-obsidian/15 transition-colors duration-500 group-hover:bg-obsidian/0" />
                  <span className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
                      {wk.style}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim [text-shadow:0_1px_8px_rgba(0,0,0,0.9)]">
                      ↗
                    </span>
                  </span>
                </button>
              );
            })}
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {active && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title}, Werk ${open + 1} von ${n}`}
          onClick={close}
          className="fade-in fixed inset-0 z-[80] flex flex-col bg-obsidian/95 backdrop-blur-md"
        >
          {/* Kopf: Zähler + Schließen */}
          <div className="flex items-center justify-between px-6 py-5 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim md:px-10">
            <span>
              {String(open + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Schließen"
              className="flex h-10 w-10 items-center justify-center border border-line text-bone transition-colors hover:border-bone"
            >
              ✕
            </button>
          </div>

          {/* Bild (Klick darauf schließt nicht) */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div key={open} className="fade-in relative h-full w-full">
              <Image
                src={active.src}
                alt={`${active.style} — ${active.title}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Pfeile */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Vorheriges Werk"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-obsidian/40 text-bone-dim backdrop-blur transition-colors hover:border-bone hover:text-bone md:left-6 md:h-14 md:w-14"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Nächstes Werk"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-line bg-obsidian/40 text-bone-dim backdrop-blur transition-colors hover:border-bone hover:text-bone md:right-6 md:h-14 md:w-14"
            >
              →
            </button>
          </div>

          {/* Fuß: Meta */}
          <div
            className="px-6 py-6 md:px-10 md:py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
              {active.style} · {active.artist} · {active.duration}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-bone md:text-4xl">
              {active.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
