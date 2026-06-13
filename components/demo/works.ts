export type DemoWork = {
  id: number;
  style: string;
  artist: string;
  title: string;
  duration: string;
};

export const DEMO_WORKS: DemoWork[] = [
  { id: 1, style: "Blackwork", artist: "[ARTIST_1]", title: "Untitled No. 01", duration: "ca. 6 Std" },
  { id: 2, style: "Fine-Line", artist: "[ARTIST_2]", title: "Botanical Study", duration: "ca. 3 Std" },
  { id: 3, style: "Geometric", artist: "[ARTIST_1]", title: "Sacred Grid", duration: "ca. 5 Std" },
  { id: 4, style: "Realism", artist: "[ARTIST_3]", title: "Portrait II", duration: "ca. 9 Std" },
  { id: 5, style: "Lettering", artist: "[ARTIST_2]", title: "Memento", duration: "ca. 2 Std" },
  { id: 6, style: "Blackwork", artist: "[ARTIST_1]", title: "Obsidian Flow", duration: "ca. 7 Std" },
  { id: 7, style: "Realism", artist: "[ARTIST_3]", title: "Still Life", duration: "ca. 8 Std" },
];

/* Deterministischer Platzhalter-Verlauf je Werk (entsättigt). */
export function tileBg(id: number): string {
  const a = 18 + ((id * 37) % 12);
  const b = 8 + ((id * 53) % 8);
  return `linear-gradient(135deg, hsl(240 6% ${a}%) 0%, hsl(240 8% ${b}%) 55%, hsl(240 5% ${a + 4}%) 100%)`;
}
