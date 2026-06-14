/**
 * Cookie-/Consent-Verwaltung (DSGVO / §25 TTDSG).
 *
 * Zentrale, framework-unabhängige Quelle der Wahrheit für die Einwilligung.
 * Künftige Skripte (z. B. Analytics, Google-Maps-Embed) fragen `hasConsent(...)`
 * ab bzw. abonnieren `onConsentChange(...)`, bevor sie nicht-essenzielle Cookies
 * setzen oder externe Ressourcen laden.
 */

export type ConsentCategory = "necessary" | "statistics" | "marketing";

export type Consent = {
  necessary: true; // immer aktiv – technisch notwendig
  statistics: boolean;
  marketing: boolean;
  ts: number; // Zeitpunkt der Entscheidung (Nachweisbarkeit)
};

const STORAGE_KEY = "cookie-consent-v1";

/** Custom-Event: feuert nach jeder Consent-Änderung (Skripte können reagieren). */
export const CONSENT_CHANGE_EVENT = "consent:change";
/** Custom-Event: öffnet das Consent-Banner erneut (z. B. via Footer-Link). */
export const OPEN_CONSENT_EVENT = "consent:open";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    return {
      necessary: true,
      statistics: Boolean(parsed.statistics),
      marketing: Boolean(parsed.marketing),
      ts: typeof parsed.ts === "number" ? parsed.ts : Date.now(),
    };
  } catch {
    return null;
  }
}

export function saveConsent(choice: {
  statistics: boolean;
  marketing: boolean;
}): Consent {
  const consent: Consent = {
    necessary: true,
    statistics: choice.statistics,
    marketing: choice.marketing,
    ts: Date.now(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage nicht verfügbar (privater Modus o. ä.) – Wahl gilt für die Session.
  }
  window.dispatchEvent(
    new CustomEvent<Consent>(CONSENT_CHANGE_EVENT, { detail: consent })
  );
  return consent;
}

/** Hat der Nutzer der Kategorie zugestimmt? `necessary` ist immer true. */
export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const consent = getConsent();
  return consent ? consent[category] : false;
}

/** Abonniert Consent-Änderungen; gibt eine Cleanup-Funktion zurück. */
export function onConsentChange(cb: (consent: Consent) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
}

/** Öffnet das Consent-Banner erneut (z. B. „Cookie-Einstellungen" im Footer). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
