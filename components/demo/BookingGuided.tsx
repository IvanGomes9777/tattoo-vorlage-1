"use client";

import { useState } from "react";
import {
  ARTIST_OPTIONS,
  Consent,
  Field,
  Honeypot,
  Input,
  Select,
  STYLE_OPTIONS,
  SubmitButton,
  Textarea,
} from "./formui";

const STEPS = ["Kontakt", "Deine Idee", "Bestätigung"];

/** C — Guided: geführter 3-Schritt-Flow mit Fortschritt. Premium, fokussiert. */
export function BookingGuided() {
  const [step, setStep] = useState(0);
  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="bg-obsidian px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
          03 — Kontakt
        </p>
        <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
          In drei Schritten
        </h2>

        {/* Fortschritt */}
        <div className="mt-8 flex gap-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1">
              <div className={`h-px w-full ${i <= step ? "bg-bone" : "bg-line"}`} />
              <span className={`mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] ${i === step ? "text-bone" : "text-bone-dim"}`}>
                0{i + 1} {s}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-12">
          <Honeypot />

          {step === 0 && (
            <div key="s0" className="fade-in flex flex-col gap-7">
              <Field label="Name"><Input placeholder="Dein Name" /></Field>
              <Field label="E-Mail"><Input type="email" placeholder="du@mail.de" /></Field>
              <Field label="Telefon"><Input placeholder="+49 …" /></Field>
            </div>
          )}

          {step === 1 && (
            <div key="s1" className="fade-in flex flex-col gap-7">
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <Field label="Wunsch-Künstler">
                  <Select>{ARTIST_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
                </Field>
                <Field label="Stil">
                  <Select>{STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
                </Field>
              </div>
              <Field label="Körperstelle & Größe"><Input placeholder="z. B. Unterarm, ca. 12 cm" /></Field>
              <Field label="Deine Idee"><Textarea placeholder="Beschreibe dein Motiv …" /></Field>
            </div>
          )}

          {step === 2 && (
            <div key="s2" className="fade-in flex flex-col gap-5">
              <p className="text-sm leading-relaxed text-bone-dim">
                Fast geschafft. Bitte bestätige noch:
              </p>
              <Consent text="Ich bin mindestens 18 Jahre alt (Ausweispflicht vor Ort)." />
              <Consent text="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu." />
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim transition-colors enabled:hover:text-bone disabled:opacity-30"
            >
              ← Zurück
            </button>
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="border border-bone px-7 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-bone transition-colors hover:bg-bone hover:text-obsidian"
              >
                Weiter →
              </button>
            ) : (
              <SubmitButton>Anfrage senden</SubmitButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
