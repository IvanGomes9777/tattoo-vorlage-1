import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: `Datenschutzerklärung — ${STUDIO.name}`,
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>{STUDIO.name}</strong>, Inhaber: Max Mustermann
        <br />
        {STUDIO.address.full}
        <br />
        E-Mail: <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a> · Telefon:{" "}
        {STUDIO.phone.display}
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung
        einer funktionsfähigen Website sowie unserer Inhalte und Leistungen
        erforderlich ist oder du eingewilligt hast (Art. 6 Abs. 1 DSGVO).
      </p>

      <h2>3. Hosting & Server-Logfiles</h2>
      <p>
        Diese Website wird bei der Vercel Inc., 340 S Lemon Avenue #4133, Walnut,
        CA 91789, USA, gehostet. Beim Aufruf erfasst der Server automatisch
        Informationen in Server-Logfiles (IP-Adresse, Datum/Uhrzeit, abgerufene
        Seite, Browser, Betriebssystem). Dies dient dem sicheren, stabilen Betrieb
        (berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>4. Kontaktformular & Anfragen</h2>
      <p>
        Wenn du uns über das Anfrageformular oder per E-Mail kontaktierst, verarbeiten
        wir die angegebenen Daten (z. B. Name, E-Mail, Telefon, Motiv-Idee, optionale
        Referenzbilder) zur Bearbeitung deiner Anfrage (Art. 6 Abs. 1 lit. b und f
        DSGVO). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und
        keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>5. Cookies & Einwilligung</h2>
      <p>
        Wir setzen technisch notwendige Cookies sowie – nur mit deiner Einwilligung –
        Statistik- und Marketing-Cookies ein. Deine Einwilligung kannst du jederzeit
        über die <a href="/cookies">Cookie-Einstellungen</a> ändern oder widerrufen.
        Details siehe <a href="/cookies">Cookie-Richtlinie</a>.
      </p>

      <h2>6. Google Maps</h2>
      <p>
        Zur Anzeige unseres Standorts binden wir Kartenmaterial von Google Maps
        (Google Ireland Ltd.) ein. Dabei können Daten (u. a. IP-Adresse) an Google
        übertragen werden. Die Einbindung erfolgt auf Grundlage deiner Einwilligung
        bzw. unseres berechtigten Interesses an einer ansprechenden Darstellung.
      </p>

      <h2>7. Social Media (Instagram)</h2>
      <p>
        Wir verlinken auf unser Instagram-Profil (Meta Platforms Ireland Ltd.). Erst
        beim Klick auf den Link verlässt du diese Seite; es gelten dann die
        Datenschutzbestimmungen von Meta.
      </p>

      <h2>8. Deine Rechte</h2>
      <p>Dir stehen gegenüber uns folgende Rechte hinsichtlich deiner Daten zu:</p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
        <li>Recht auf Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zudem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die
        Verarbeitung deiner personenbezogenen Daten zu beschweren.
      </p>
    </LegalPage>
  );
}
