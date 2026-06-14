import { STUDIO } from "@/lib/studio";

export type Step = { no: string; title: string; text: string };

export const STEPS: Step[] = [
  {
    no: "01",
    title: "Anfrage",
    text: "Schick uns deine Idee, Referenzbilder & Wunsch-Körperstelle über das Formular.",
  },
  {
    no: "02",
    title: "Beratung",
    text: "Kostenloses Beratungsgespräch – vor Ort oder per Video. Wir besprechen Design, Größe, Platzierung & Preis.",
  },
  {
    no: "03",
    title: "Design",
    text: "Dein Künstler erstellt ein individuelles Design. Anpassungen inklusive, bis du 100 % zufrieden bist.",
  },
  {
    no: "04",
    title: "Termin & Anzahlung",
    text: `Wir buchen deinen Termin. Eine Anzahlung von ${STUDIO.deposit} sichert den Slot – wird mit dem Endpreis verrechnet.`,
  },
  {
    no: "05",
    title: "Dein Tag",
    text: "Entspannt ankommen, Kunst empfangen. Wir nehmen uns die Zeit, die dein Tattoo verdient.",
  },
  {
    no: "06",
    title: "Aftercare",
    text: "Du bekommst eine ausführliche Pflege-Anleitung – und wir stehen bei Fragen weiter zur Seite.",
  },
];
