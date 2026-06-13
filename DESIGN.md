# DESIGN.md

> Visuelles Design-System (Ist-Stand, aus dem Code dokumentiert).
> Quelle der Wahrheit für Tokens: `app/globals.css` (`@theme`).

## Farb-Tokens
| Token | Wert | Einsatz |
|---|---|---|
| `--color-obsidian` | `#0B0B0C` | Seiten-Hintergrund |
| `--color-surface` | `#141416` | Karten/Flächen |
| `--color-line` | `#26262A` | Rahmen/Trenner |
| `--color-bone` | `#ECE8E1` | Primärtext, CTA-Fill |
| `--color-bone-dim` | `#8A8782` | Sekundärtext, Mono-Labels |

Achromatisch, dark-only (bewusst, kein Light-Mode). Akzentfarbe = Bildmaterial.

## Typografie
- `--font-display`: Space Grotesk (Headlines, Body)
- `--font-mono`: JetBrains Mono (Labels, Meta, Buttons)
- Headlines: `leading-[0.82–0.92]`, `tracking-[-0.02 … -0.03em]`, `text-wrap: balance`
- Mono-Labels: `uppercase`, `tracking-[0.2–0.35em]`, ~11px

## Motion
- `--ease-quart: cubic-bezier(0.76,0,0.24,1)`; sonst ease-out-expo
- Lenis Smooth-Scroll + Snap-Addon (Desktop), reduced-motion: aus
- Crossfades/Reveals via `fade-in` + GSAP; kein Bounce/Elastic

## Spacing / Layout
- Sektionen: `min-h-screen`/`h-screen`, Full-Page-Snap (Desktop)
- Padding: `px-6` (mobile) / `px-10–12` (desktop)
- Flex für 1D, Grid für 2D; Split-Layouts 1fr/1.2–1.4fr

## A11y
- `:focus-visible` Bone-Ring (offset 3px); `cursor-pointer` global
- Tap-Targets ≥ 44px (Dots in 36–44px-Hülle)
- `prefers-reduced-motion` global respektiert
- Bilder mit `alt`; dekorative Bilder `alt="" aria-hidden`

## Bekannte Tells / offene Punkte (impeccable-Audit)
- Numerische Section-Eyebrows (01/02/03) + Uppercase-Mono-Eyebrow auf jeder
  Sektion = AI-Grammar-Tell. Bei echter Sequenz (Ablauf) legitim, sonst Kandidat
  zum Entfernen/Umgestalten. → `/impeccable quieter` / Cadence überdenken.
- Hero-/Display-clamp bis 10–11rem über der 6rem-„Shouting"-Schwelle (bewusst
  editorial, aber bei Bedarf reduzieren).
