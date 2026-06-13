import { tileBg } from "./works";

/** Wiederverwendbarer [BILD]-Platzhalter (entsättigt, mit Label). */
export function Tile({
  id,
  style,
  className = "",
  label = true,
}: {
  id: number;
  style: string;
  className?: string;
  label?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: tileBg(id), filter: "grayscale(1)" }}
    >
      {label && (
        <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
          [BILD_{String(id).padStart(2, "0")}] · {style}
        </span>
      )}
    </div>
  );
}
