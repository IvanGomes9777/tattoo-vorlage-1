"use client";

import Image from "next/image";
import { useState } from "react";

type Work = {
  src: string;
  style: string;
  artist: string;
  title: string;
  duration: string;
};

/* 7 Werke – Bilder: Pexels (kostenlose Lizenz, kommerziell nutzbar, keine
   Attribution nötig). Stil/Artist/Titel sind Platzhalter. */
const WORKS: Work[] = [
  { src: "/portfolio/tattoo-1.jpg", style: "Blackwork", artist: "[ARTIST_1]", title: "Untitled No. 01", duration: "ca. 6 Std" },
  { src: "/portfolio/tattoo-2.jpg", style: "Fine-Line", artist: "[ARTIST_2]", title: "Botanical Study", duration: "ca. 3 Std" },
  { src: "/portfolio/tattoo-3.jpg", style: "Realism", artist: "[ARTIST_3]", title: "Portrait II", duration: "ca. 9 Std" },
  { src: "/portfolio/tattoo-4.jpg", style: "Geometric", artist: "[ARTIST_1]", title: "Sacred Grid", duration: "ca. 5 Std" },
  { src: "/portfolio/tattoo-5.jpg", style: "Lettering", artist: "[ARTIST_2]", title: "Memento", duration: "ca. 2 Std" },
  { src: "/portfolio/tattoo-6.jpg", style: "Blackwork", artist: "[ARTIST_1]", title: "Obsidian Flow", duration: "ca. 7 Std" },
  { src: "/portfolio/tattoo-7.jpg", style: "Realism", artist: "[ARTIST_3]", title: "Still Life", duration: "ca. 8 Std" },
];

export function Portfolio() {
  const [i, setI] = useState(0);
  const n = WORKS.length;
  const w = WORKS[i];
  const go = (d: number) => setI((p) => (p + d + n) % n);

  return (
    <section
      id="work"
      className="relative h-[100svh] w-full overflow-hidden border-t border-line bg-obsidian"
    >
      {/* Bilder gestapelt, aktives eingeblendet → weicher Crossfade */}
      {WORKS.map((item, idx) => (
        <div
          key={item.src}
          className="absolute inset-0 transition-opacity duration-700 ease-[var(--ease-quart)]"
          style={{ opacity: idx === i ? 1 : 0 }}
        >
          <Image
            src={item.src}
            alt={`${item.style} — ${item.title}`}
            fill
            priority={idx === 0}
            sizes="100vw"
            // Mobile: ganzes Bild zeigen (kein Beschnitt), vertikal zentriert →
            // sitzt auf einer Linie mit den Pfeilen. Desktop: cinematisch füllend.
            className="object-contain object-center md:object-cover"
          />
        </div>
      ))}

      {/* Grade/Vignette für Lesbarkeit */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.05) 42%, rgba(11,11,12,0.55) 100%)",
        }}
      />

      {/* Text-Layer */}
      <div key={`t${i}`} className="fade-in absolute inset-0 flex flex-col justify-between px-6 py-8 md:px-12 md:py-12">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
          <span>01 — Portfolio</span>
          <span>
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </div>

        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            {w.artist} · {w.duration}
          </p>
          <h2 className="font-display text-[clamp(3rem,12vw,10rem)] font-medium leading-[0.82] tracking-[-0.03em] text-bone">
            {w.style}
          </h2>
          <p className="mt-4 font-display text-xl text-bone-dim md:text-2xl">
            {w.title}
          </p>
        </div>
      </div>

      {/* Pfeile */}
      <button
        onClick={() => go(-1)}
        aria-label="Vorheriges Werk"
        className="absolute left-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-line bg-obsidian/30 text-bone-dim backdrop-blur transition-colors hover:border-bone hover:text-bone md:left-8"
      >
        ←
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Nächstes Werk"
        className="absolute right-4 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-line bg-obsidian/30 text-bone-dim backdrop-blur transition-colors hover:border-bone hover:text-bone md:right-8"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {WORKS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Werk ${idx + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === i ? "bg-bone" : "bg-bone-dim/40 hover:bg-bone-dim"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
