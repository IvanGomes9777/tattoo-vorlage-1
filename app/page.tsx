import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Platzhalter: nachfolgende Sektionen (Work / Artists / Studio / Contact)
          folgen Schritt für Schritt nach deiner Freigabe. */}
      <section
        id="work"
        className="flex h-[60vh] items-center justify-center border-t border-line bg-surface font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim"
      >
        Nächste Sektion folgt nach Freigabe
      </section>
    </main>
  );
}
