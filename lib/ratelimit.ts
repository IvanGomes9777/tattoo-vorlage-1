import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Persistentes Rate-Limit über Upstash Redis / Vercel KV.
 *
 * Nutzt einen Redis-basierten Sliding-Window-Limiter, sobald die passenden
 * Umgebungsvariablen gesetzt sind (Upstash: UPSTASH_REDIS_REST_URL/TOKEN,
 * Vercel KV: KV_REST_API_URL/KV_REST_API_TOKEN). Ohne Konfiguration greift ein
 * In-Memory-Fallback pro Server-Instanz – so laufen Dev/Build und unkonfigurierte
 * Umgebungen weiter, ohne dass das Limit ganz wegfällt.
 *
 * Limit: 5 Anfragen pro 60 Sekunden pro IP.
 */
const MAX = 5;
const WINDOW_MS = 60_000;

const url =
  process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const limiter =
  url && token
    ? new Ratelimit({
        redis: new Redis({ url, token }),
        limiter: Ratelimit.slidingWindow(MAX, "60 s"),
        prefix: "ratelimit:inquiry",
        analytics: false,
      })
    : null;

// In-Memory-Fallback (nur pro Instanz, nicht über Deployments/Edge hinweg).
const hits = new Map<string, number[]>();
function memoryLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

/** True, wenn die IP ihr Limit überschritten hat. */
export async function isRateLimited(ip: string): Promise<boolean> {
  if (limiter) {
    try {
      const { success } = await limiter.limit(ip);
      return !success;
    } catch {
      // Redis nicht erreichbar → auf Fallback ausweichen, statt Anfrage zu blocken.
      return memoryLimited(ip);
    }
  }
  return memoryLimited(ip);
}

/** Ob der persistente (Redis-)Limiter aktiv ist – nur zur Diagnose. */
export const isPersistentRateLimit = limiter !== null;
