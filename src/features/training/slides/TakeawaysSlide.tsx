import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Card, SlideHead } from "../components/primitives";
import { BADGES, TAKEAWAYS } from "../data";
import { stagger } from "../motion";
import type { BadgeKey } from "../types";

export function SlideTakeaways({ badges }: { badges: Set<BadgeKey> }) {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2">
      <div>
        <SlideHead
          kicker="Wrap up"
          title="Key takeaways"
          sub="Five principles to carry with you — every shift, every screen, every conversation."
        />
        <ul className="space-y-3">
          {TAKEAWAYS.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-soft"
            >
              <div className="grid size-7 shrink-0 place-items-center rounded-full gold-gradient text-white shadow-gold">
                <Check className="size-4" strokeWidth={3} />
              </div>
              <span className="text-[15px] font-medium text-charcoal">{t}</span>
            </motion.li>
          ))}
        </ul>
        <motion.p {...stagger(0.5)} className="mt-6 text-sm italic text-muted-foreground">
          "The trust we build today is the foundation we mine on tomorrow."
        </motion.p>
      </div>

      <div>
        <Card className="p-6">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gold-dark">
            Your badges
          </div>
          <div className="mb-5 font-display text-xl font-extrabold text-charcoal">
            {badges.size} of 3 earned
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k, i) => {
              const B = BADGES[k];
              const earned = badges.has(k);
              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`flex flex-col items-center rounded-2xl border p-4 text-center ${earned
                    ? "border-gold/40 bg-primary-soft"
                    : "border-dashed border-border bg-white/50"
                    }`}
                >
                  <div
                    className={`mb-2 grid size-14 place-items-center rounded-2xl ${earned
                      ? "gold-gradient text-white shadow-gold"
                      : "bg-muted text-muted-foreground/50"
                      }`}
                  >
                    <B.icon className="size-6" />
                  </div>
                  <div
                    className={`text-xs font-bold ${earned ? "text-charcoal" : "text-muted-foreground/60"}`}
                  >
                    {B.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
