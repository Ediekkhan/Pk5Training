import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { SlideHead } from "../components/primitives";
import { SectionLabel } from "../components/slide-content";
import { RESPONSIBILITIES } from "../data";

export function SlideResponsibilities() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <SlideHead
        kicker="Chapter 3"
        title="Your responsibilities"
        sub="Tap each item to explore what it means in practice."
      />
      <div className="space-y-3">
        {RESPONSIBILITIES.map((r, idx) => {
          const isOpen = open === idx;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`overflow-hidden rounded-2xl border shadow-soft transition-colors ${r.critical ? "border-gold/40" : "border-border"
                } ${isOpen ? "bg-white" : "bg-white"}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl ${r.critical ? "gold-gradient text-white shadow-gold" : "bg-muted text-charcoal"
                    }`}
                >
                  <r.icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-semibold leading-snug text-charcoal">
                    {r.title}
                  </div>
                  {r.critical && (
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
                      <AlertTriangle className="size-3" /> Critical
                    </div>
                  )}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="size-5 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 border-t border-border bg-[oklch(0.99_0.005_82)] p-5 md:grid-cols-2">
                      <div>
                        <SectionLabel>In detail</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{r.detail}</p>
                      </div>
                      <div>
                        <SectionLabel>Why it matters</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{r.why}</p>
                      </div>
                      <div>
                        <SectionLabel>Best practice</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{r.bestPractice}</p>
                      </div>
                      <div>
                        <SectionLabel>Real workplace example</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal italic">{r.example}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
