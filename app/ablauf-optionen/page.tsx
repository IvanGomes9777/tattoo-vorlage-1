"use client";

import { useState } from "react";
import { ProcessTimeline } from "@/components/demo/ProcessTimeline";
import { ProcessStepper } from "@/components/demo/ProcessStepper";
import { ProcessSticky } from "@/components/demo/ProcessSticky";
import { ProcessAccordion } from "@/components/demo/ProcessAccordion";
import { ProcessHScroll } from "@/components/demo/ProcessHScroll";
import { ProcessHoverIndex } from "@/components/demo/ProcessHoverIndex";
import { ProcessZigzag } from "@/components/demo/ProcessZigzag";
import { ProcessFullscreen } from "@/components/demo/ProcessFullscreen";

const TABS = [
  { key: "A", label: "A — Vertical Timeline" },
  { key: "B", label: "B — Horizontal Stepper" },
  { key: "C", label: "C — Sticky Pinned" },
  { key: "D", label: "D — Accordion" },
  { key: "E", label: "E — Horizontal Scroll" },
  { key: "F", label: "F — Hover Index" },
  { key: "G", label: "G — Zigzag Path" },
  { key: "H", label: "H — Fullscreen Steps" },
] as const;

export default function AblaufOptionen() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("A");

  return (
    <main className="bg-obsidian">
      <div className="sticky top-0 z-50 border-b border-line bg-obsidian/90 backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-6 py-4 md:px-10">
          <span className="mr-4 font-mono text-[11px] uppercase tracking-[0.3em] text-bone-dim">
            Ablauf-Optionen
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
        {tab === "A" && <ProcessTimeline />}
        {tab === "B" && <ProcessStepper />}
        {tab === "C" && <ProcessSticky />}
        {tab === "D" && <ProcessAccordion />}
        {tab === "E" && <ProcessHScroll />}
        {tab === "F" && <ProcessHoverIndex />}
        {tab === "G" && <ProcessZigzag />}
        {tab === "H" && <ProcessFullscreen />}
      </div>
    </main>
  );
}
