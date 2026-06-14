import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: `AGB — ${STUDIO.name}`,
  robots: { index: false },
};

export default function AgbPage() {
  return (
    <LegalPage title="AGB">
      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen des
        Tattoo-Ateliers <strong>{STUDIO.name}</strong>, {STUDIO.address.full}
        (nachfolgend „Atelier"), gegenüber den Kundinnen und Kunden.
      </p>

      <h2>§ 2 Terminvereinbarung & Anzahlung</h2>
      <p>
        Tätowierungen erfolgen ausschließlich nach Terminvereinbarung. Zur verbindlichen
        Reservierung eines Termins ist eine Anzahlung von {STUDIO.deposit} zu leisten.
        Die Anzahlung wird mit dem Endpreis verrechnet.
      </p>

      <h2>§ 3 Mindestalter & Ausweispflicht</h2>
      <p>
        Tätowiert werden ausschließlich volljährige Personen (ab 18 Jahren). Vor Beginn
        ist ein gültiger amtlicher Lichtbildausweis vorzulegen. Ohne Altersnachweis wird
        die Tätowierung nicht durchgeführt.
      </p>

      <h2>§ 4 Stornierung & Terminverschiebung</h2>
      <p>
        Termine können bis [FRIST, z. B. 48 Stunden] vor dem vereinbarten Zeitpunkt
        kostenfrei verschoben werden. Bei späterer Absage oder Nichterscheinen verfällt
        die Anzahlung als Aufwandsentschädigung.
      </p>

      <h2>§ 5 Mitwirkung & Gesundheit</h2>
      <p>
        Die Kundin/der Kunde versichert, gesundheitlich geeignet zu sein und relevante
        Umstände (z. B. Allergien, Schwangerschaft, Vorerkrankungen, Einnahme
        blutverdünnender Mittel) vor Beginn mitzuteilen. Bei Alkohol- oder
        Drogeneinfluss wird die Tätowierung abgelehnt.
      </p>

      <h2>§ 6 Preise & Zahlung</h2>
      <p>
        Es gelten die individuell vereinbarten Preise. Der Restbetrag ist nach
        Fertigstellung vor Ort zu begleichen ([ZAHLUNGSARTEN, z. B. bar / EC]).
      </p>

      <h2>§ 7 Pflege & Gewährleistung</h2>
      <p>
        Das Ergebnis hängt maßgeblich von der korrekten Nachsorge ab. Eine ausführliche
        Pflegeanleitung wird ausgehändigt. Für Beeinträchtigungen infolge unsachgemäßer
        Pflege übernimmt das Atelier keine Haftung. Etwaige Nacharbeiten richten sich
        nach gesonderter Vereinbarung.
      </p>

      <h2>§ 8 Haftung</h2>
      <p>
        Das Atelier haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei
        Verletzung von Leben, Körper oder Gesundheit. Im Übrigen ist die Haftung auf den
        vertragstypischen, vorhersehbaren Schaden begrenzt.
      </p>

      <h2>§ 9 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen
        unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </LegalPage>
  );
}
