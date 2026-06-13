import { tileBg } from "./works";

export type Artist = {
  name: string;
  specialty: string;
  bio: string;
  portraitId: number;
  workIds: number[];
};

export const ARTISTS: Artist[] = [
  {
    name: "[ARTIST_1]",
    specialty: "Blackwork & Dotwork",
    bio: "10 Jahre Erfahrung. Inspiriert von Geometrie & Natur. Arbeitet ausschließlich an Custom-Designs.",
    portraitId: 101,
    workIds: [11, 12, 13],
  },
  {
    name: "[ARTIST_2]",
    specialty: "Fine-Line & Realism",
    bio: "Feine Linien, große Wirkung. Spezialistin für Portraits und filigrane florale Motive.",
    portraitId: 102,
    workIds: [14, 15, 16],
  },
];

export { tileBg };
