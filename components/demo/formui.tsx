/* Gestaltete Formular-Bausteine im Obsidian/Bone-Look. Rein präsentativ
   (Demo, ohne Submit-Logik). Honeypot-Feld für späteren Spam-Schutz inklusive. */

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-bone-dim">
        {label}
      </span>
      {children}
    </label>
  );
}

const base =
  "w-full bg-transparent border-b border-line py-3 text-bone placeholder-bone-dim/60 outline-none transition-colors focus:border-bone";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={base} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea {...props} className={`${base} resize-none`} rows={4} />;
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${base} [&>option]:bg-surface`}>
      {children}
    </select>
  );
}

export function Consent({ text, name }: { text: string; name?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-bone-dim">
      <input
        type="checkbox"
        name={name}
        className="mt-1 h-4 w-4 shrink-0 accent-bone"
        required
      />
      <span>{text}</span>
    </label>
  );
}

/** Verstecktes Honeypot-Feld (Bots füllen es aus, Menschen nie). */
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px" }}
    />
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="group relative w-full overflow-hidden border border-bone px-7 py-4 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-obsidian md:w-auto"
    >
      <span className="absolute inset-0 bg-bone transition-transform duration-500 ease-[var(--ease-quart)] group-hover:translate-y-full" />
      <span className="relative">{children}</span>
    </button>
  );
}

export const ARTIST_OPTIONS = ["Egal / Beratung", "[ARTIST_1]", "[ARTIST_2]"];
export const STYLE_OPTIONS = [
  "Blackwork",
  "Fine-Line",
  "Realism",
  "Geometric",
  "Lettering",
  "Custom / unsicher",
];
