import { Hero } from "@/components/hero/Hero";
import { Work } from "@/components/work/Work";

export default function Home() {
  return (
    <main>
      <Hero />
      <Work />
      {/* Platzhalter: nachfolgende Sektionen (Artists / Studio / Contact)
          folgen Schritt für Schritt nach deiner Freigabe. */}
      <section
        id="artists"
        className="flex h-[50vh] items-center justify-center border-t border-line bg-surface font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim"
      >
        Nächste Sektion folgt nach Freigabe
      </section>
    </main>
  );
}
