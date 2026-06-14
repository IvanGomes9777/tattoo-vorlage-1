import { Reveal, RevealGroup } from "@/components/anim/Reveal";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { STUDIO } from "@/lib/studio";

/**
 * Site-Footer (contentinfo). Editorialer Abschluss in der achromatischen
 * Liquid-Chrome-Grammatik: oversized Brand-Mark als Schluss-Geste, darunter
 * Navigation / Kontakt / Rechtliches in Mono-Spalten, abschließende Meta-Zeile.
 * Inhalte stammen aus `@/lib/studio` (zentrale, später ersetzbare Beispieldaten).
 */
const NAV = [
  ["Work", "#work"],
  ["Artists", "#artists"],
  ["Studio", "#studio"],
  ["Contact", "#contact"],
] as const;

const CONTACT = [
  ["E-Mail", STUDIO.email, `mailto:${STUDIO.email}`],
  ["Instagram", STUDIO.instagram.handle, STUDIO.instagram.url],
  ["Telefon", STUDIO.phone.display, `tel:${STUDIO.phone.href}`],
] as const;

const LEGAL = [
  ["Impressum", "/impressum"],
  ["Datenschutz", "/datenschutz"],
  ["AGB", "/agb"],
  ["Cookies", "/cookies"],
] as const;

const linkClass =
  "nav-link w-fit font-mono text-[12px] uppercase tracking-[0.15em] text-bone transition-colors hover:text-bone-dim";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-obsidian px-6 pb-10 pt-20 md:px-10 md:pt-28">
      {/* Schluss-Geste: oversized Wortmarke, bewusst editorial überlebensgroß */}
      <Reveal variant="up">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
          {STUDIO.city} — Est. {STUDIO.established}
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.8rem,11vw,9rem)] font-medium leading-[0.85] tracking-[-0.03em] text-bone">
          {STUDIO.name}
        </h2>
      </Reveal>

      {/* Spalten: Beschreibung / Navigation / Kontakt / Rechtliches */}
      <div className="mt-16 grid grid-cols-2 gap-10 border-t border-line pt-12 md:mt-24 md:grid-cols-4">
        <Reveal variant="up" className="col-span-2 max-w-[34ch] md:col-span-1">
          <p className="text-sm leading-relaxed text-bone-dim">{STUDIO.tagline}</p>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.15em] text-bone-dim">
            {STUDIO.address.full}
          </p>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.15em] text-bone-dim">
            {STUDIO.hours}
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
              className={linkClass}
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
                <a href={href} className={linkClass}>
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
              className={linkClass}
            >
              {label}
            </a>
          ))}
          <CookieSettingsButton
            data-reveal-item
            style={{ "--reveal-delay": `${LEGAL.length * 0.05}s` } as React.CSSProperties}
            className={linkClass}
          />
        </RevealGroup>
      </div>

      {/* Meta-Zeile: Copyright + Back-to-top */}
      <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} {STUDIO.name}. Alle Rechte vorbehalten.</span>
        <a href="#top" className="nav-link w-fit transition-colors hover:text-bone">
          Nach oben ↑
        </a>
      </div>
    </footer>
  );
}
