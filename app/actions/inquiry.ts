"use server";

import { headers } from "next/headers";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/* Einfaches In-Memory-Rate-Limit (pro Server-Instanz). Für Produktion ggf.
   durch Vercel KV / Upstash ersetzen – siehe Security-Guide. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= max) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

/* Maximale Feldlängen – begrenzen Last, Log-Größe und Missbrauch. */
const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  artist: 80,
  style: 80,
  place: 120,
  idea: 5_000,
} as const;

/** Liest ein Feld, trimmt es und kappt es auf die erlaubte Maximallänge. */
function readField(formData: FormData, key: keyof typeof LIMITS): string {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, LIMITS[key]);
}

/**
 * Verhindert E-Mail-Header-Injection: Zeilenumbrüche in einzeiligen Feldern
 * (Name, Betreff o. Ä.) würden sonst beim späteren Mailversand das Einschleusen
 * fremder Header/Empfänger erlauben.
 */
function hasHeaderInjection(v: string): boolean {
  return /[\r\n]/.test(v);
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData
): Promise<InquiryState> {
  // 1. Honeypot – Bots füllen das versteckte Feld aus
  if ((formData.get("website") as string)?.length) {
    return { status: "error", message: "Ungültige Anfrage." };
  }

  // 2. Rate-Limit pro IP
  const ip =
    (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: "Zu viele Anfragen. Bitte versuch es später erneut.",
    };
  }

  // 3. Validierung (Eingaben werden getrimmt und längenbegrenzt eingelesen)
  const name = readField(formData, "name");
  const email = readField(formData, "email");
  const idea = readField(formData, "idea");
  const age = formData.get("age");
  const privacy = formData.get("privacy");

  if (name.length < 2) return { status: "error", message: "Bitte gib deinen Namen an." };
  if (!isEmail(email)) return { status: "error", message: "Bitte gib eine gültige E-Mail an." };
  if (hasHeaderInjection(name) || hasHeaderInjection(email)) {
    return { status: "error", message: "Ungültige Eingabe." };
  }
  if (!idea) return { status: "error", message: "Bitte beschreib kurz deine Idee." };
  if (!age) return { status: "error", message: "Bitte bestätige, dass du mindestens 18 bist." };
  if (!privacy) return { status: "error", message: "Bitte stimme der Datenschutzerklärung zu." };

  // Weitere optionale Felder ebenfalls bereinigt einlesen (für späteren Versand).
  const phone = readField(formData, "phone");
  const artist = readField(formData, "artist");
  const style = readField(formData, "style");
  const place = readField(formData, "place");
  void phone; void artist; void style; void place; // bis Versand aktiv ist

  // 4. Versand
  // TODO: E-Mail-Versand integrieren (z. B. Resend/SMTP). Erst aktiv, wenn
  //       die entsprechenden Provider-Keys als Umgebungsvariablen gesetzt sind.
  //       Bis dahin gilt die Anfrage als angenommen (Validierung bestanden).
  //       WICHTIG: Eingaben (name/email/idea) niemals ungeprüft in E-Mail-Header
  //       schreiben – dafür ist hasHeaderInjection() oben da.
  // Datenschutz: keine personenbezogenen Daten (Name/E-Mail/IP) im Klartext
  // loggen. Nur ein neutraler Hinweis zur Funktionskontrolle.
  console.info("[Inquiry] Neue Anfrage eingegangen.");

  return {
    status: "success",
    message: "Danke! Deine Anfrage ist eingegangen – wir melden uns persönlich.",
  };
}
