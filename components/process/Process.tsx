"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RevealGroup } from "@/components/anim/Reveal";

type Step = { no: string; title: string; text: string; src: string };

/* Bilder: Pexels (kostenlose Lizenz, kommerziell nutzbar). Inhalte Platzhalter. */
const STEPS: Step[] = [
  { no: "01", title: "Anfrage", text: "Schick uns deine Idee, Referenzbilder & Wunsch-Körperstelle über das Formular.", src: "/process/step-1.jpg" },
  { no: "02", title: "Beratung", text: "Kostenloses Beratungsgespräch – vor Ort oder per Video. Wir besprechen Design, Größe, Platzierung & Preis.", src: "/process/step-2.jpg" },
  { no: "03", title: "Design", text: "Dein Künstler erstellt ein individuelles Design. Anpassungen inklusive, bis du 100 % zufrieden bist.", src: "/process/step-3.jpg" },
  { no: "04", title: "Termin & Anzahlung", text: "Wir buchen deinen Termin. Eine Anzahlung von [BETRAG] sichert den Slot – wird mit dem Endpreis verrechnet.", src: "/process/step-4.jpg" },
  { no: "05", title: "Dein Tag", text: "Entspannt ankommen, Kunst empfangen. Wir nehmen uns die Zeit, die dein Tattoo verdient.", src: "/process/step-5.jpg" },
  { no: "06", title: "Aftercare", text: "Du bekommst eine ausführliche Pflege-Anleitung – und wir stehen bei Fragen weiter zur Seite.", src: "/process/step-6.jpg" },
];

export function Process() {
  const [i, setI] = useState(0);
  const s = STEPS[i];

  return (
    <section
      id="ablauf"
      className="flex min-h-screen flex-col justify-center border-t border-line bg-obsidian px-6 py-16 md:px-10"
    >
      <Reveal
        variant="up"
        as="p"
        className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim"
      >
        Ablauf
      </Reveal>
      <Reveal
        variant="mask"
        delay={0.08}
        as="h2"
        className="mb-10 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone"
      >
        Von der Idee zum Tattoo
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr] md:gap-14">
        {/* Liste – Schritte gestaffelt einblenden */}
        <RevealGroup>
          {STEPS.map((st, idx) => (
            <button
              key={st.no}
              data-reveal-item
              style={{ "--reveal-delay": `${idx * 0.06}s` } as React.CSSProperties}
              onMouseEnter={() => setI(idx)}
              onFocus={() => setI(idx)}
              onClick={() => setI(idx)}
              className="group flex w-full items-baseline gap-5 border-b border-line py-4 text-left md:py-5"
            >
              <span className="font-mono text-[12px] tracking-[0.2em] text-bone-dim">
                {st.no}
              </span>
              <span
                className={`font-display text-2xl transition-colors md:text-4xl ${
                  idx === i ? "text-bone" : "text-bone-dim group-hover:text-bone"
                }`}
              >
                {st.title}
              </span>
            </button>
          ))}
        </RevealGroup>

        {/* Detail-Karte mit Bild-Hintergrund */}
        <Reveal
          variant="image"
          delay={0.1}
          className="relative min-h-[320px] overflow-hidden border border-line md:min-h-[440px]"
        >
          {STEPS.map((st, idx) => (
            <Image
              key={st.src}
              src={st.src}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-opacity duration-700 ease-[var(--ease-quart)]"
              style={{ opacity: idx === i ? 1 : 0 }}
            />
          ))}
          {/* Grade für Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/30" />

          <div key={i} className="fade-in relative flex h-full flex-col justify-end p-8 md:p-10">
            <span className="font-display text-7xl leading-none text-bone/90 md:text-8xl">
              {s.no}
            </span>
            <h3 className="mt-3 font-display text-2xl text-bone md:text-3xl">
              {s.title}
            </h3>
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-bone-dim">
              {s.text}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
