
import { AnimatePresence, motion } from "motion/react";
import {
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SlideHead } from "../components/primitives";
import { BulletList, SectionLabel } from "../components/slide-content";
import {
  WHAT_CONFIDENTIAL,
} from "../data";
import type { ComponentType } from "react";

export type IconType = ComponentType<{ className?: string }>;


export function SlideWhatIntro() {

  return (
    <div>
      <SlideHead
        kicker="Chapter 3"
        title="What is confidential information?"
        sub="A quick primer before you explore each of the twelve categories in detail."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {WHAT_CONFIDENTIAL.map((c, i) => {
          const Icon = c.icon;
          const gold = c.gold;
          return (
            <motion.div
              key={c.heading}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={[
                "group flex flex-col rounded-2xl p-6 shadow-soft transition-shadow hover:shadow-elevated",
                gold
                  ? "gold-gradient text-white border border-gold/40 shadow-gold"
                  : "bg-white border border-border hover:border-gold/40",
              ].join(" ")}
            >
              <div
                className={[
                  "mb-4 grid size-12 place-items-center rounded-xl",
                  gold
                    ? "bg-white/15 text-white ring-1 ring-white/30"
                    : "gold-gradient text-white shadow-gold",
                ].join(" ")}
              >
                <Icon className="size-6" />
              </div>
              <div
                className={[
                  "font-display text-xl font-bold tracking-tight",
                  gold ? "text-white" : "text-charcoal",
                ].join(" ")}
              >
                {c.heading}
              </div>
              {c.intro && (
                <p
                  className={[
                    "mt-2 text-sm leading-relaxed",
                    gold ? "text-white/95" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {c.intro}
                </p>
              )}
              {c.bullets && c.bullets.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2
                        className={[
                          "mt-0.5 size-4 shrink-0",
                          gold ? "text-white" : "text-gold-dark",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "text-sm leading-relaxed",
                          gold ? "text-white/95" : "text-charcoal/85",
                        ].join(" ")}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-primary-soft p-4"
      >
        <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-dark" />
        <p className="text-sm font-medium text-charcoal">
          Next up: explore the twelve categories of confidential information at PK5 Mining in detail.
        </p>
      </motion.div>
    </div>
  );
}