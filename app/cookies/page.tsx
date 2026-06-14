import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: `Cookie-Richtlinie — ${STUDIO.name}`,
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies">
      <h2>Was sind Cookies?</h2>
      <p>
        Cookies sind kleine Textdateien, die beim Besuch einer Website auf deinem
        Gerät gespeichert werden. Sie ermöglichen grundlegende Funktionen und helfen
        uns – mit deiner Einwilligung – die Nutzung der Seite zu verstehen.
      </p>

      <h2>Welche Kategorien nutzen wir?</h2>
      <h3>Notwendig</h3>
      <p>
        Technisch erforderlich für den Betrieb der Seite (z. B. Speicherung deiner
        Cookie-Entscheidung). Diese Cookies sind immer aktiv und benötigen keine
        Einwilligung.
      </p>
      <h3>Statistik</h3>
      <p>
        Helfen uns zu verstehen, wie Besucher mit der Seite interagieren – anonymisiert
        und nur mit deiner Einwilligung.
      </p>
      <h3>Marketing</h3>
      <p>
        Werden eingesetzt, um Inhalte und Einbindungen Dritter (z. B. Karten,
        Social-Media) bereitzustellen. Nur mit deiner Einwilligung.
      </p>

      <h2>Einwilligung verwalten</h2>
      <p>
        Du kannst deine Auswahl jederzeit anpassen oder widerrufen. Öffne dazu die
        Einstellungen:
      </p>
      <p>
        <CookieSettingsButton className="nav-link inline-block border border-line px-5 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-bone transition-colors hover:border-bone" />
      </p>

      <h2>Weitere Informationen</h2>
      <p>
        Wie wir personenbezogene Daten verarbeiten, erfährst du in unserer{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>. Bei Fragen erreichst du uns
        unter <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>.
      </p>
    </LegalPage>
  );
}
