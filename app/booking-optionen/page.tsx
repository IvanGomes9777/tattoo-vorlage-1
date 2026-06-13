"use client";

import { useState } from "react";
import { BookingSplit } from "@/components/demo/BookingSplit";
import { BookingCentered } from "@/components/demo/BookingCentered";
import { BookingGuided } from "@/components/demo/BookingGuided";
import { BookingSticky } from "@/components/demo/BookingSticky";

const TABS = [
  { key: "A", label: "A — Split (Infos + Form)" },
  { key: "B", label: "B — Centered Editorial" },
  { key: "C", label: "C — Guided 3-Step" },
  { key: "D", label: "D — Sticky Info" },
] as const;

export default function BookingOptionen() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("A");

  return (
    <main className="bg-obsidian">
      <div className="sticky top-0 z-50 border-b border-line bg-obsidian/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-6 py-4 md:px-10">
          <span className="mr-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            Booking-Optionen
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

      <div>
        {tab === "A" && <BookingSplit />}
        {tab === "B" && <BookingCentered />}
        {tab === "C" && <BookingGuided />}
        {tab === "D" && <BookingSticky />}
      </div>
    </main>
  );
}
