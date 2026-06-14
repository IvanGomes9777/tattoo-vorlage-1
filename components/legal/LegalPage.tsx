import Link from "next/link";
import { STUDIO } from "@/lib/studio";

/**
 * Gemeinsames Gerüst der Rechtsseiten (Impressum, Datenschutz, AGB, Cookies).
 * Schlichter Kopf mit Zurück-Link, Prosa-Container (.legal) und Muster-Hinweis.
 */
export function LegalPage({
  title,
  updated = "Juni 2026",
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-obsidian">
      {/* Kopf */}
      <header className="flex items-center justify-between border-b border-line px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:px-10">
        <Link href="/" className="nav-link text-bone transition-colors hover:text-bone-dim">
          ← {STUDIO.name}
        </Link>
        <span>Stand: {updated}</span>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
          Rechtliches
        </p>
        <h1 className="mt-4 mb-10 font-display text-[clamp(2.2rem,6vw,4rem)] font-medium leading-[0.9] tracking-[-0.03em] text-bone">
          {title}
        </h1>

        {/* Muster-Hinweis – diese Texte sind Platzhalter und rechtlich zu prüfen. */}
        <div className="mb-12 border border-line bg-surface p-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-bone-dim">
          ⚠ Mustertext / Platzhalter. Vor Veröffentlichung durch rechtsverbindliche,
          geprüfte Angaben ersetzen.
        </div>

        <div className="legal">{children}</div>
      </main>

      <footer className="border-t border-line px-6 py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:px-10">
        <Link href="/" className="nav-link transition-colors hover:text-bone">
          ← Zurück zur Startseite
        </Link>
      </footer>
    </div>
  );
}
