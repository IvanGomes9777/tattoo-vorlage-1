import { Reveal, RevealGroup } from "@/components/anim/Reveal";

/**
 * Site-Footer (contentinfo). Editorialer Abschluss in der achromatischen
 * Liquid-Chrome-Grammatik: oversized Brand-Mark als Schluss-Geste, darunter
 * Navigation / Kontakt / Rechtliches in Mono-Spalten, abschließende Meta-Zeile.
 * Platzhalter in `[]` bleiben bis Branding final ist – analog zu Hero/Kontakt.
 */
const NAV = [
  ["Work", "#work"],
  ["Artists", "#artists"],
  ["Studio", "#studio"],
  ["Contact", "#contact"],
] as const;

const CONTACT = [
  ["E-Mail", "[EMAIL]", "mailto:[EMAIL]"],
  ["Instagram", "[@HANDLE]", "https://instagram.com/[HANDLE]"],
  ["Telefon", "[TELEFON]", "tel:[TELEFON]"],
] as const;

const LEGAL = [
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-obsidian px-6 pb-10 pt-20 md:px-10 md:pt-28">
      {/* Schluss-Geste: oversized Wortmarke, bewusst editorial überlebensgroß */}
      <Reveal variant="up">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
          [STADT] — Est. [JAHR]
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.8rem,11vw,9rem)] font-medium leading-[0.85] tracking-[-0.03em] text-bone">
          [STUDIO_NAME]
        </h2>
      </Reveal>

      {/* Spalten: Navigation / Kontakt / Rechtliches */}
      <div className="mt-16 grid grid-cols-2 gap-10 border-t border-line pt-12 md:mt-24 md:grid-cols-4">
        <Reveal variant="up" className="col-span-2 max-w-[34ch] md:col-span-1">
          <p className="text-sm leading-relaxed text-bone-dim">
            Kuratiertes Tattoo-Atelier. Kein Katalog — jedes Stück entsteht im
            Dialog.
          </p>
        </Reveal>

        <RevealGroup as="nav" aria-label="Footer" className="flex flex-col gap-3">
          <span data-reveal-item className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
            Navigation
          </span>
          {NAV.map(([label, href], idx) => (
            <a
              key={label}
              data-reveal-item
              style={{ "--reveal-delay": `${idx * 0.05}s` } as React.CSSProperties}
              href={href}
              className="nav-link w-fit font-mono text-[12px] uppercase tracking-[0.15em] text-bone transition-colors hover:text-bone-dim"
            >
              {label}
            </a>
          ))}
        </RevealGroup>

        <RevealGroup as="dl" className="flex flex-col gap-3">
          <span data-reveal-item className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
            Kontakt
          </span>
          {CONTACT.map(([label, value, href], idx) => (
            <div
              key={label}
              data-reveal-item
              style={{ "--reveal-delay": `${idx * 0.05}s` } as React.CSSProperties}
            >
              <dt className="sr-only">{label}</dt>
              <dd>
                <a
                  href={href}
                  className="nav-link w-fit font-mono text-[12px] uppercase tracking-[0.15em] text-bone transition-colors hover:text-bone-dim"
                >
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </RevealGroup>

        <RevealGroup as="nav" aria-label="Rechtliches" className="flex flex-col gap-3">
          <span data-reveal-item className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-bone-dim">
            Rechtliches
          </span>
          {LEGAL.map(([label, href], idx) => (
            <a
              key={label}
              data-reveal-item
              style={{ "--reveal-delay": `${idx * 0.05}s` } as React.CSSProperties}
              href={href}
              className="nav-link w-fit font-mono text-[12px] uppercase tracking-[0.15em] text-bone transition-colors hover:text-bone-dim"
            >
              {label}
            </a>
          ))}
        </RevealGroup>
      </div>

      {/* Meta-Zeile: Copyright + Back-to-top */}
      <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} [STUDIO_NAME]. Alle Rechte vorbehalten.</span>
        <a href="#top" className="nav-link w-fit transition-colors hover:text-bone">
          Nach oben ↑
        </a>
      </div>
    </footer>
  );
}
