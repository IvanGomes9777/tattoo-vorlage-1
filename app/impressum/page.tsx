import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { STUDIO } from "@/lib/studio";

export const metadata: Metadata = {
  title: `Impressum — ${STUDIO.name}`,
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <strong>{STUDIO.name}</strong>
        <br />
        Inhaber: Max Mustermann
        <br />
        {STUDIO.address.street}
        <br />
        {STUDIO.address.zip} {STUDIO.address.city}
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: {STUDIO.phone.display}
        <br />
        E-Mail: <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
        <br />
        Instagram:{" "}
        <a href={STUDIO.instagram.url} target="_blank" rel="noreferrer">
          {STUDIO.instagram.handle}
        </a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        [USt-IdNr. — wird nachgereicht]
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Max Mustermann
        <br />
        {STUDIO.address.street}, {STUDIO.address.zip} {STUDIO.address.city}
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse findest du oben.
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis
        10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
        oder gespeicherte fremde Informationen zu überwachen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte
        wir keinen Einfluss haben. Für diese fremden Inhalte können wir keine Gewähr
        übernehmen. Verantwortlich ist stets der jeweilige Anbieter der Seiten.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
        gekennzeichnet.
      </p>
    </LegalPage>
  );
}
