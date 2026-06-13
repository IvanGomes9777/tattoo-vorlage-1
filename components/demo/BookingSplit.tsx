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

/** A — Split: links Studio-Infos + Karte, rechts das Formular. */
export function BookingSplit() {
  return (
    <div className="grid grid-cols-1 gap-12 bg-obsidian px-6 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
      {/* Infos */}
      <div className="flex flex-col gap-10">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim">
            03 — Kontakt
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
            Lass uns reden
          </h2>
        </div>
        <dl className="space-y-5 font-mono text-[12px] uppercase tracking-[0.15em] text-bone-dim">
          <div className="flex justify-between border-b border-line pb-4">
            <dt>Adresse</dt>
            <dd className="text-right text-bone">[ADRESSE]</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-4">
            <dt>Öffnung</dt>
            <dd className="text-right text-bone">[ÖFFNUNGSZEITEN]</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-4">
            <dt>Instagram</dt>
            <dd className="text-right text-bone">[@HANDLE]</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-4">
            <dt>E-Mail</dt>
            <dd className="text-right text-bone">[EMAIL]</dd>
          </div>
        </dl>
        <div className="flex h-48 items-center justify-center border border-line bg-surface font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
          [ Karte / Google Maps ]
        </div>
      </div>

      {/* Formular */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-6"
      >
        <Honeypot />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field label="Name"><Input name="name" placeholder="Dein Name" required /></Field>
          <Field label="E-Mail"><Input type="email" name="email" placeholder="du@mail.de" required /></Field>
          <Field label="Telefon"><Input name="phone" placeholder="+49 …" /></Field>
          <Field label="Wunsch-Künstler">
            <Select name="artist">{ARTIST_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
          </Field>
          <Field label="Stil">
            <Select name="style">{STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
          </Field>
          <Field label="Körperstelle"><Input name="place" placeholder="z. B. Unterarm" /></Field>
        </div>
        <Field label="Deine Idee"><Textarea name="idea" placeholder="Motiv, Größe (ca. cm), Referenzen …" /></Field>
        <Field label="Referenzbilder (optional)">
          <input type="file" name="refs" multiple className="text-sm text-bone-dim file:mr-4 file:border file:border-line file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.15em] file:text-bone" />
        </Field>
        <div className="space-y-3 pt-2">
          <Consent text="Ich bin mindestens 18 Jahre alt (Ausweispflicht vor Ort)." />
          <Consent text="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu." />
        </div>
        <div className="pt-2"><SubmitButton>Anfrage senden</SubmitButton></div>
      </form>
    </div>
  );
}
