/**
 * Zentrale Studio-Daten – einzige Quelle der Wahrheit für Name, Kontakt,
 * Adresse, Maps usw.
 *
 * ⚠️ BEISPIELDATEN (Platzhalter): Das fiktive „Atelier Noir, Berlin" dient nur
 * der Darstellung. Sobald die echten Studio-Infos vorliegen, NUR diese Datei
 * anpassen – alle Sektionen (Hero, Kontakt, Footer, Ablauf, Metadaten) ziehen
 * von hier.
 */
export const STUDIO = {
  name: "Atelier Noir",
  claim: "Bespoke Work. Kein Katalog.",
  tagline: "Kuratiertes Tattoo-Atelier. Kein Katalog — jedes Stück entsteht im Dialog.",
  city: "Berlin",
  established: "2014",

  address: {
    street: "Torstraße 114",
    zip: "10119",
    city: "Berlin",
    full: "Torstraße 114, 10119 Berlin",
  },

  hours: "Di–Sa, 11–19 Uhr",

  email: "studio@ateliernoir.de",
  phone: { display: "+49 30 1234567", href: "+493012345670" },
  instagram: {
    handle: "@ateliernoir.berlin",
    url: "https://instagram.com/ateliernoir.berlin",
  },

  // Koordinaten (Anzeige im Hero) – Berlin Mitte, beispielhaft.
  geo: { lat: "52.5304° N", long: "13.4017° E" },

  // Anzahlung zur Terminsicherung (Ablauf-Schritt 4).
  deposit: "80 €",

  // Google-Maps-Einbettung ohne API-Key (q=…&output=embed) + Direktlink.
  maps: {
    embed:
      "https://www.google.com/maps?q=Torstra%C3%9Fe%20114,%2010119%20Berlin&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Torstra%C3%9Fe+114,+10119+Berlin",
  },
} as const;
