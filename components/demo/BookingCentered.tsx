"use client";

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
import { STUDIO } from "@/lib/studio";

/** B — Centered Editorial: schmales, zentriertes Ein-Spalten-Formular, viel Raum. */
export function BookingCentered() {
  return (
    <div className="bg-obsidian px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-14 text-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
            03 — Kontakt
          </p>
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
            Erzähl uns deine Idee
          </h2>
          <p className="mx-auto mt-5 max-w-[42ch] text-sm leading-relaxed text-bone-dim">
            Wir melden uns persönlich für ein kostenloses Beratungsgespräch.
            {" "}{STUDIO.address.full} · {STUDIO.hours} · {STUDIO.instagram.handle}
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-7">
          <Honeypot />
          <Field label="Name"><Input name="name" placeholder="Dein Name" required /></Field>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <Field label="E-Mail"><Input type="email" name="email" placeholder="du@mail.de" required /></Field>
            <Field label="Telefon"><Input name="phone" placeholder="+49 …" /></Field>
          </div>
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            <Field label="Wunsch-Künstler">
              <Select name="artist">{ARTIST_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
            </Field>
            <Field label="Stil">
              <Select name="style">{STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
            </Field>
          </div>
          <Field label="Deine Idee"><Textarea name="idea" placeholder="Motiv, Körperstelle, Größe (ca. cm) …" /></Field>
          <Field label="Referenzbilder (optional)">
            <input type="file" name="refs" multiple className="text-sm text-bone-dim file:mr-4 file:border file:border-line file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.15em] file:text-bone" />
          </Field>
          <div className="space-y-3 pt-2">
            <Consent text="Ich bin mindestens 18 Jahre alt (Ausweispflicht vor Ort)." />
            <Consent text="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu." />
          </div>
          <div className="pt-2 text-center"><SubmitButton>Anfrage senden</SubmitButton></div>
        </form>
      </div>
    </div>
  );
}
