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

  // 3. Validierung
  const name = (formData.get("name") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const idea = (formData.get("idea") as string)?.trim() ?? "";
  const age = formData.get("age");
  const privacy = formData.get("privacy");

  if (name.length < 2) return { status: "error", message: "Bitte gib deinen Namen an." };
  if (!isEmail(email)) return { status: "error", message: "Bitte gib eine gültige E-Mail an." };
  if (!idea) return { status: "error", message: "Bitte beschreib kurz deine Idee." };
  if (!age) return { status: "error", message: "Bitte bestätige, dass du mindestens 18 bist." };
  if (!privacy) return { status: "error", message: "Bitte stimme der Datenschutzerklärung zu." };

  // 4. Versand
  // TODO: E-Mail-Versand integrieren (z. B. Resend/SMTP). Erst aktiv, wenn
  //       die entsprechenden Provider-Keys als Umgebungsvariablen gesetzt sind.
  //       Bis dahin gilt die Anfrage als angenommen (Validierung bestanden).
  console.info("[Inquiry]", { name, email, ip });

  return {
    status: "success",
    message: "Danke! Deine Anfrage ist eingegangen – wir melden uns persönlich.",
  };
}
