import { Check, ChevronRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import type { RoadmapStop } from "../data";

export function RoadmapList({
  stops,
  collapsed,
  onJump,
}: {
  stops: (RoadmapStop & { completed: boolean; current: boolean; locked: boolean })[];
  collapsed: boolean;
  onJump: (id: number) => void;
}) {
  return (
    <div className="p-3">
      {!collapsed && (
        <div className="mb-3 px-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-dark">
            Roadmap
          </div>
          <div className="mt-0.5 font-display text-sm font-extrabold text-charcoal">
            Your learning journey
          </div>
        </div>
      )}
      <ol className="space-y-1">
        {stops.map((s) => {
          const disabled = s.locked;
          const state = s.current ? "current" : s.completed ? "done" : s.locked ? "locked" : "open";
          return (
            <li key={s.id}>
              <button
                onClick={() => !disabled && onJump(s.id)}
                disabled={disabled}
                title={s.label}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition-all ${
                  state === "current"
                    ? "bg-primary-soft ring-1 ring-gold/40 text-charcoal"
                    : state === "done"
                      ? "text-charcoal hover:bg-muted"
                      : state === "open"
                        ? "text-charcoal hover:bg-muted"
                        : "text-muted-foreground/50 cursor-not-allowed"
                }`}
              >
                <div
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-all ${
                    state === "current"
                      ? "gold-gradient text-white shadow-gold"
                      : state === "done"
                        ? "bg-success text-white"
                        : state === "locked"
                          ? "bg-muted text-muted-foreground/60"
                          : "border border-border bg-white text-muted-foreground"
                  }`}
                >
                  {state === "done" ? (
                    <Check className="size-3.5" strokeWidth={3} />
                  ) : state === "locked" ? (
                    <Lock className="size-3" />
                  ) : (
                    s.id + 1
                  )}
                </div>
                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold">{s.label}</div>
                  </div>
                )}
                {!collapsed && state === "current" && (
                  <ChevronRight className="size-4 shrink-0 text-gold" />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
