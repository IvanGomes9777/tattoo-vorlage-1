"use client";

import { useState } from "react";
import { ArtistSplitDuo } from "@/components/demo/ArtistSplitDuo";
import { ArtistEditorialStack } from "@/components/demo/ArtistEditorialStack";
import { ArtistHoverSwap } from "@/components/demo/ArtistHoverSwap";
import { ArtistTabbedStage } from "@/components/demo/ArtistTabbedStage";

const TABS = [
  { key: "A", label: "A — Split Duo" },
  { key: "B", label: "B — Editorial Stack" },
  { key: "C", label: "C — Hover-Swap" },
  { key: "D", label: "D — Tabbed Stage" },
] as const;

export default function ArtistsOptionen() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("A");

  return (
    <main className="bg-obsidian">
      <div className="sticky top-0 z-50 border-b border-line bg-obsidian/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-6 py-4 md:px-10">
          <span className="mr-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            Artists-Optionen
          </span>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                tab === t.key
                  ? "border-bone text-bone"
                  : "border-line text-bone-dim hover:border-bone hover:text-bone"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p className="px-6 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:px-10">
        {tab === "A"
          ? "über ein Panel hovern → es wächst & zeigt Bio"
          : tab === "B"
            ? "alternierende Magazin-Zeilen (scrollen)"
            : tab === "C"
              ? "über einen Block hovern → Portrait wechselt zur Arbeit"
              : "Tabs oben → Künstler wechseln"}
      </p>

      <div className="py-6">
        {tab === "A" && <ArtistSplitDuo />}
        {tab === "B" && <ArtistEditorialStack />}
        {tab === "C" && <ArtistHoverSwap />}
        {tab === "D" && <ArtistTabbedStage />}
      </div>
    </main>
  );
}
