import type { ReactNode } from "react";
import { Check, X } from "lucide-react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
      {children}
    </div>
  );
}

export function BulletList({
  items,
  tone = "neutral",
}: {
  items: string[];
  tone?: "neutral" | "good" | "warn";
}) {
  const dot = tone === "good" ? "bg-success" : tone === "warn" ? "bg-destructive" : "bg-gold";
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-sm leading-relaxed text-charcoal">
          <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
