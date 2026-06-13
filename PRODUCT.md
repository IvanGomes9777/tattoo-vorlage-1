# PRODUCT.md

> Kontext für die `impeccable`-Design-Commands. Beschreibt, für wen und in
> welcher Markensprache gebaut wird. Platzhalter in `[]` bis Branding final ist.

## Product
High-End-Website für ein exklusives, modernes Tattoo-Atelier ([STUDIO_NAME]).
Single-Page mit Full-Page-Snap: Hero → Portfolio → Artists → Ablauf → Kontakt.
Ziel: Werke & Künstler inszenieren, Vertrauen aufbauen, Anfragen generieren.

## Register
**Brand** — Design IST das Produkt (Portfolio/Marketing-Site). Register-Referenz:
`reference/brand.md`. Nicht „product/app/dashboard".

## Audience
Tattoo-Interessierte mit Anspruch (Custom-Work), die Künstler & Stil bewusst
wählen. Eher gehobene, ästhetisch versierte Klientel; Mobile-first im Konsum,
Desktop für das „Cinematic"-Erlebnis.

## Brand lane
Düster-elegant, minimalistisch, editorial, „cinematic". Bewusst **achromatisch**
(„Liquid Chrome"): Obsidian + Bone, Farbe entsteht nur aus Bild-/Video-Material.

## Voice
Reduziert, selbstbewusst, handwerklich-ehrlich. Kurze Sätze. Kein Hype, keine
Emojis im UI. Deutsch, geduzt.

## Anti-references (bewusst NICHT)
- Neon-Rot-auf-Schwarz Edgy-Klischee (Variante 1 der Vorlagen)
- Champagner-Gold-Luxus (Variante 5)
- Bunte Watercolor-/Instagram-Optik (Variante 3)
- Generische SaaS-Ästhetik: Purple/Green-on-Dark, Hero-Metriken, Card-Grids,
  Gradient-Text, Glassmorphism

## Colors (committed)
- Obsidian `#0B0B0C` (bg), Surface `#141416`, Line `#26262A`
- Bone `#ECE8E1` (Text), Bone-dim `#8A8782` (Sekundärtext)
- Strategie: **Restrained/achromatisch** — kein chromatischer Akzent; „Farbe"
  liefern Fotos/Video. (Hinweis: Token-Name `bone` ist laut impeccable ein
  möglicher Tell — hier bewusst als Dark-Mode-Textfarbe, nicht als Cream-BG.)

## Type
- Display/Body: **Bricolage Grotesque**
- Mono/Labels: **Spline Sans Mono**
- Kontrast-Achse: Grotesk + Mono (nicht zwei ähnliche Sans).

## Components / Patterns
- Hero: Video-Background + kinetische Typo (GSAP)
- Portfolio: Fullscreen-Cinema-Slideshow (Crossfade, Mobile-Swipe, Dots)
- Artists: Split-Duo (Hover-Expand auf Desktop, gestapelt auf Mobile)
- Ablauf: Hover-Index mit Bild-Hintergrund je Schritt (echte 6er-Sequenz)
- Kontakt: Split (Infos + Formular, Server-Validierung, 18+/DSGVO-Consent)
- Motion: Lenis Smooth-Scroll + Snap-Addon; ease-out-expo; reduced-motion aware
