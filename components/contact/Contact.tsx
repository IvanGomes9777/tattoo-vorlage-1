"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import { Reveal, RevealGroup } from "@/components/anim/Reveal";
import { STUDIO } from "@/lib/studio";
import {
  ARTIST_OPTIONS,
  Consent,
  Field,
  Honeypot,
  Input,
  Select,
  STYLE_OPTIONS,
  Textarea,
} from "@/components/demo/formui";

const initial: InquiryState = { status: "idle" };

export function Contact() {
  const [state, formAction, pending] = useActionState(submitInquiry, initial);

  return (
    <section
      id="contact"
      className="grid min-h-screen grid-cols-1 gap-12 border-t border-line bg-obsidian px-6 py-16 md:grid-cols-2 md:items-center md:gap-16 md:px-10 md:py-16"
    >
      {/* Studio-Infos */}
      <div className="flex flex-col gap-10">
        <Reveal variant="up">
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.02em] text-bone">
            Lass uns reden
          </h2>
          <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-bone-dim">
            Schick uns deine Idee – wir melden uns persönlich für ein
            kostenloses Beratungsgespräch.
          </p>
        </Reveal>
        <RevealGroup
          as="dl"
          className="space-y-5 font-mono text-[12px] uppercase tracking-[0.15em] text-bone-dim"
        >
          {[
            ["Adresse", STUDIO.address.full],
            ["Öffnung", STUDIO.hours],
            ["Instagram", STUDIO.instagram.handle],
            ["E-Mail", STUDIO.email],
          ].map(([k, v], idx) => (
            <div
              key={k}
              data-reveal-item
              style={{ "--reveal-delay": `${idx * 0.07}s` } as React.CSSProperties}
              className="flex justify-between border-b border-line pb-4"
            >
              <dt>{k}</dt>
              <dd className="text-right text-bone">{v}</dd>
            </div>
          ))}
        </RevealGroup>
        <Reveal
          variant="up"
          delay={0.1}
          className="h-48 overflow-hidden border border-line bg-surface"
        >
          <iframe
            src={STUDIO.maps.embed}
            title={`Karte: ${STUDIO.name}, ${STUDIO.address.full}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale"
            style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
          />
        </Reveal>
      </div>

      {/* Formular oder Erfolgsmeldung */}
      {state.status === "success" ? (
        <div role="status" aria-live="polite" className="flex flex-col items-start justify-center gap-6">
          <span className="seal-in grid h-16 w-16 place-items-center rounded-full border border-bone text-bone">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path className="draw-check" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="fade-in font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim">
            Gesendet
          </p>
          <p className="fade-in max-w-[36ch] font-display text-2xl leading-snug text-bone">
            {state.message}
          </p>
        </div>
      ) : (
        <Reveal variant="up" delay={0.1}>
        <form action={formAction} className="flex flex-col gap-6">
          <Honeypot />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Name" required><Input name="name" placeholder="Dein Name" autoComplete="name" maxLength={80} required /></Field>
            <Field label="E-Mail" required><Input type="email" name="email" placeholder="du@mail.de" autoComplete="email" inputMode="email" maxLength={254} required /></Field>
            <Field label="Telefon"><Input type="tel" name="phone" placeholder="+49 …" autoComplete="tel" inputMode="tel" maxLength={32} /></Field>
            <Field label="Wunsch-Künstler">
              <Select name="artist">{ARTIST_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
            </Field>
            <Field label="Stil">
              <Select name="style">{STYLE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</Select>
            </Field>
            <Field label="Körperstelle"><Input name="place" placeholder="z. B. Unterarm" autoComplete="off" maxLength={60} /></Field>
          </div>
          <Field label="Deine Idee" required><Textarea name="idea" placeholder="Motiv, Größe (ca. cm), Referenzen …" maxLength={1500} required /></Field>
          <Field label="Referenzbilder (optional)">
            <input type="file" name="refs" accept="image/*" multiple className="text-sm text-bone-dim file:mr-4 file:border file:border-line file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.15em] file:text-bone" />
          </Field>
          <div className="space-y-3 pt-2">
            <Consent name="age" text="Ich bin mindestens 18 Jahre alt (Ausweispflicht vor Ort)." />
            <Consent name="privacy" text="Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu." />
          </div>

          {state.status === "error" && (
            <p role="alert" className="font-mono text-[12px] uppercase tracking-[0.15em] text-bone">
              ⚠ {state.message}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={pending}
              className="group relative w-full overflow-hidden border border-bone px-7 py-4 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-obsidian disabled:opacity-60 md:w-auto"
            >
              <span className="absolute inset-0 bg-bone transition-transform duration-500 ease-[var(--ease-quart)] group-hover:translate-y-full" />
              <span className="relative">{pending ? "Senden …" : "Anfrage senden"}</span>
            </button>
          </div>
        </form>
        </Reveal>
      )}
    </section>
  );
}
