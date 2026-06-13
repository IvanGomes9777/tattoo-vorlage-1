"use client";

import { useState } from "react";
import { OptionCinema } from "@/components/demo/OptionCinema";
import { OptionSplit } from "@/components/demo/OptionSplit";
import { OptionBento } from "@/components/demo/OptionBento";
import { OptionSticky } from "@/components/demo/OptionSticky";

const TABS = [
  { key: "H", label: "H — Fullscreen Cinema" },
  { key: "I", label: "I — Split Index" },
  { key: "J", label: "J — Bento Grid" },
  { key: "K", label: "K — Sticky Scroll" },
] as const;

export default function PortfolioOptionen() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("H");

  return (
    <main className="bg-obsidian">
      {/* Sticky Umschalter */}
      <div className="sticky top-0 z-50 border-b border-line bg-obsidian/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-6 py-4 md:px-10">
          <span className="mr-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            Portfolio-Optionen
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

      {/* Hinweis */}
      <p className="px-6 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:px-10">
        {tab === "K"
          ? "↓ scrollen — das Bild links bleibt stehen und wechselt"
          : tab === "I"
            ? "über die Liste hovern — rechts wechselt das Bild"
            : tab === "H"
              ? "Pfeile / Punkte zum Wechseln"
              : "hovern & klicken — Lightbox öffnet"}
      </p>

      <div className="py-6">
        {tab === "H" && <OptionCinema />}
        {tab === "I" && <OptionSplit />}
        {tab === "J" && <OptionBento />}
        {tab === "K" && <OptionSticky />}
      </div>
    </main>
  );
}
