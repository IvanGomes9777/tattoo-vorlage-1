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

/** D — Sticky Info: Formular scrollt, rechts bleibt eine Studio-Karte stehen. */
export function BookingSticky() {
  return (
    <div className="grid grid-cols-1 gap-12 bg-obsidian px-6 py-16 md:grid-cols-[1.4fr_1fr] md:gap-16 md:px-10 md:py-24">
      {/* Formular */}
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-7">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
            03 — Kontakt
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
            Anfrage
          </h2>
        </div>
        <Honeypot />
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <Field label="Name"><Input placeholder="Dein Name" required /></Field>
          <Field label="E-Mail"><Input type="email" placeholder="du@mail.de" required /></Field>
          <Field label="Telefon"><Input placeholder="+49 …" /></Field>
          <Field label="Wunsch-Künstler">
            <Select>{ARTIST_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
          </Field>
          <Field label="Stil">
            <Select>{STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
          </Field>
          <Field label="Körperstelle"><Input placeholder="z. B. Unterarm" /></Field>
        </div>
        <Field label="Deine Idee"><Textarea placeholder="Motiv, Größe (ca. cm), Referenzen …" /></Field>
        <div className="space-y-3 pt-2">
          <Consent text="Ich bin mindestens 18 Jahre alt (Ausweispflicht vor Ort)." />
          <Consent text="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu." />
        </div>
        <div className="pt-2"><SubmitButton>Anfrage senden</SubmitButton></div>
      </form>

      {/* Sticky-Karte */}
      <aside className="md:sticky md:top-24 md:self-start">
        <div className="border border-line bg-surface p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
            [STUDIO_NAME]
          </p>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">Adresse</dt>
              <dd className="mt-1 text-bone">[ADRESSE]</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">Öffnungszeiten</dt>
              <dd className="mt-1 text-bone">[ÖFFNUNGSZEITEN]</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">Instagram</dt>
              <dd className="mt-1 text-bone">[@HANDLE]</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">E-Mail</dt>
              <dd className="mt-1 text-bone">[EMAIL]</dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-bone-dim">
            Größere Arbeiten nur mit Termin & Anzahlung. Kleine Walk-Ins
            gelegentlich möglich — siehe Instagram.
          </p>
        </div>
      </aside>
    </div>
  );
}
