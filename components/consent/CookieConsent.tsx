"use client";

import { useEffect, useRef, useState } from "react";
import {
  getConsent,
  OPEN_CONSENT_EVENT,
  saveConsent,
} from "@/components/consent/consent";

/**
 * Cookie-Consent-Banner (DSGVO / §25 TTDSG).
 * Gleichrangige Wahl: „Alle akzeptieren" / „Nur notwendige" / „Einstellungen".
 * Notwendige Cookies sind technisch erforderlich und immer aktiv; Statistik &
 * Marketing erfordern aktive Einwilligung (Opt-in, vorausgewählt = aus).
 * Erscheint nur, solange keine Entscheidung gespeichert ist; via Footer-Link
 * (OPEN_CONSENT_EVENT) jederzeit erneut aufrufbar.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Beim ersten Besuch ohne gespeicherte Wahl zeigen; auf Re-Open-Event hören.
  useEffect(() => {
    if (!getConsent()) setOpen(true);

    const reopen = () => {
      const current = getConsent();
      setStatistics(current?.statistics ?? false);
      setMarketing(current?.marketing ?? false);
      setShowDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Fokus auf das Banner legen, sobald es erscheint (Tastatur-Zugänglichkeit).
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    setShowDetails(false);
  };

  const acceptAll = () => {
    saveConsent({ statistics: true, marketing: true });
    close();
  };

  const acceptNecessary = () => {
    saveConsent({ statistics: false, marketing: false });
    close();
  };

  const saveSelection = () => {
    saveConsent({ statistics, marketing });
    close();
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      tabIndex={-1}
      className="fade-in fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-surface/95 px-6 py-6 backdrop-blur-md md:px-10 md:py-7"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2
            id="cookie-title"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone-dim"
          >
            Cookies
          </h2>
          <p
            id="cookie-desc"
            className="max-w-[68ch] text-sm leading-relaxed text-bone-dim"
          >
            Wir nutzen Cookies. Notwendige Cookies sind für den Betrieb der Seite
            erforderlich. Statistik- und Marketing-Cookies setzen wir nur mit
            deiner Einwilligung. Mehr dazu in der{" "}
            <a href="/datenschutz" className="text-bone underline underline-offset-4">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>

        {showDetails && (
          <div className="flex flex-col gap-3 border-y border-line py-5 font-mono text-[12px] uppercase tracking-[0.1em]">
            <label className="flex items-center justify-between gap-4 text-bone-dim">
              <span>
                Notwendig
                <span className="ml-2 normal-case tracking-normal text-[11px] text-bone-dim/70">
                  (immer aktiv)
                </span>
              </span>
              <input
                type="checkbox"
                checked
                disabled
                aria-label="Notwendige Cookies (immer aktiv)"
                className="h-4 w-4 accent-bone"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-bone">
              <span>Statistik</span>
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
                className="h-4 w-4 accent-bone"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-bone">
              <span>Marketing</span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 accent-bone"
              />
            </label>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={acceptAll}
            className="group relative overflow-hidden border border-bone px-6 py-3 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-obsidian"
          >
            <span className="absolute inset-0 bg-bone transition-transform duration-500 ease-[var(--ease-quart)] group-hover:translate-y-full" />
            <span className="relative">Alle akzeptieren</span>
          </button>
          <button
            type="button"
            onClick={acceptNecessary}
            className="border border-line px-6 py-3 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
          >
            Nur notwendige
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={saveSelection}
              className="border border-line px-6 py-3 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone"
            >
              Auswahl speichern
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="px-2 py-3 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-bone sm:ml-auto"
            >
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
