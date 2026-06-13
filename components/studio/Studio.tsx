import Image from "next/image";
import { Reveal, RevealGroup } from "@/components/anim/Reveal";
import { STUDIO } from "@/lib/studio";

/**
 * Studio / Atelier – macht den Raum greifbar und schafft Vertrauen
 * (Hygiene, Privatsphäre, Lage, Termine). Editoriales Split-Layout in der
 * achromatischen Liquid-Chrome-Grammatik; Bilder bringen die einzige Farbe.
 * Trägt `id="studio"` als Ziel des „Studio"-Nav-Links.
 * Bilder sind Platzhalter (vorhandene Fotos), bis echte Atelier-Aufnahmen da sind.
 */
const FEATURES: [string, string][] = [
  [
    "Hygiene & Sterilität",
    "Medizinische Standards, Einwegmaterial und lückenlose Sterilisation — selbstverständlich.",
  ],
  [
    "Privatsphäre",
    "Einzeltermine statt Durchgangsverkehr. Dein Termin gehört dir allein.",
  ],
  ["Lage", `${STUDIO.address.full}. Zentral in ${STUDIO.city}, gut erreichbar.`],
  ["Termine", `Ausschließlich nach Vereinbarung — ${STUDIO.hours}.`],
];

export function Studio() {
  return (
    <section
      id="studio"
      className="grid grid-cols-1 items-center gap-12 border-t border-line bg-surface px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28"
    >
      {/* Text */}
      <div className="flex flex-col gap-8">
        <Reveal variant="up">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            Das Atelier — {STUDIO.city}
          </p>
          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
            Ein Raum, der zur Ruhe kommt.
          </h2>
          <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-bone-dim md:text-base">
            {STUDIO.name} ist bewusst kein Laufkundschaft-Studio. Gedämpftes
            Licht, klare Linien, volle Konzentration auf deine Arbeit — vom
            ersten Entwurf bis zur letzten Linie.
          </p>
        </Reveal>

        <RevealGroup as="dl" className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {FEATURES.map(([title, text], idx) => (
            <div
              key={title}
              data-reveal-item
              style={{ "--reveal-delay": `${idx * 0.07}s` } as React.CSSProperties}
              className="border-t border-line pt-4"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
                {title}
              </dt>
              <dd className="mt-2 max-w-[34ch] text-sm leading-relaxed text-bone-dim">
                {text}
              </dd>
            </div>
          ))}
        </RevealGroup>

        <Reveal variant="up" delay={0.1}>
          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 border-b border-bone pb-1 font-mono text-[12px] uppercase tracking-[0.2em] text-bone"
          >
            Atelier besuchen
            <span className="inline-block transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>

      {/* Bild-Collage (versetzt, cinematisch) */}
      <div className="relative h-[68vh] min-h-[420px] md:h-[80vh]">
        <Reveal variant="image" className="absolute right-0 top-0 h-[62%] w-[78%]">
          <Image
            src="/process/step-2.jpg"
            alt={`Beratung im ${STUDIO.name}`}
            fill
            sizes="(max-width: 768px) 78vw, 39vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal
          variant="image"
          delay={0.15}
          className="absolute bottom-0 left-0 h-[52%] w-[62%] border border-line shadow-2xl shadow-obsidian/60"
        >
          <Image
            src="/process/step-5.jpg"
            alt={`Atelier-Atmosphäre im ${STUDIO.name}`}
            fill
            sizes="(max-width: 768px) 62vw, 31vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
