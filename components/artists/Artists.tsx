"use client";

import Image from "next/image";

type Artist = {
  src: string;
  name: string;
  specialty: string;
  bio: string;
};

/* 2 Künstler – Portraits: Pexels (kostenlose Lizenz, kommerziell nutzbar,
   keine Attribution nötig). Name/Spezialgebiet/Bio sind Platzhalter. */
const ARTISTS: Artist[] = [
  {
    src: "/artists/artist-1.jpg",
    name: "[ARTIST_1]",
    specialty: "Blackwork & Dotwork",
    bio: "10 Jahre Erfahrung. Inspiriert von Geometrie & Natur. Arbeitet ausschließlich an individuellen Custom-Designs.",
  },
  {
    src: "/artists/artist-2.jpg",
    name: "[ARTIST_2]",
    specialty: "Fine-Line & Realism",
    bio: "Feine Linien, große Wirkung. Spezialist für Portraits und filigrane, realistische Motive.",
  },
];

export function Artists() {
  return (
    <section
      id="artists"
      className="relative flex h-screen flex-col overflow-hidden border-t border-line bg-obsidian px-6 py-12 md:px-10 md:py-16"
    >
      <div className="mb-8 flex flex-col justify-between gap-6 md:mb-10 md:flex-row md:items-end">
        <div>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
            02 — Artists
          </p>
          <h2 className="max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.02em] text-bone">
            Die Künstler
          </h2>
        </div>
        <p className="max-w-[34ch] text-sm leading-relaxed text-bone-dim md:text-right">
          Kein Artist arbeitet wie der andere. Wähle den Stil — und den Menschen,
          dem du vertraust.
        </p>
      </div>

      {/* Split Duo */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 md:flex-row">
        {ARTISTS.map((a) => (
          <article
            key={a.name}
            className="group relative flex-1 overflow-hidden transition-[flex] duration-700 ease-[var(--ease-quart)] md:hover:flex-[1.7]"
          >
            <Image
              src={a.src}
              alt={`${a.name} — ${a.specialty}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-obsidian/45 transition-colors duration-500 group-hover:bg-obsidian/25" />

            <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
                {a.specialty}
              </p>
              <h3 className="mt-2 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[0.9] text-bone">
                {a.name}
              </h3>
              <p className="mt-4 max-h-44 max-w-[42ch] overflow-hidden text-sm leading-relaxed text-bone-dim opacity-100 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-44 md:group-hover:opacity-100">
                {a.bio}
              </p>
              <a
                href="#contact"
                className="mt-5 inline-block max-h-10 overflow-hidden border-b border-bone pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone opacity-100 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-10 md:group-hover:opacity-100"
              >
                Bei {a.name} anfragen →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
