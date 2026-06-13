import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Portfolio-Sektion: Design wird neu gewählt. Platzhalter bis zur Entscheidung. */}
      <section
        id="work"
        className="flex h-[60vh] items-center justify-center border-t border-line bg-surface font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim"
      >
        Portfolio — Design in Auswahl
      </section>
    </main>
  );
}
