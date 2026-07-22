import { motion } from "motion/react";
import { SlideHead } from "../components/primitives";
import { SECURITY } from "../data";

export function SlideSecurity() {
  return (
    <div>
      <SlideHead
        kicker="Chapter 6"
        title="Data security best practices"
        sub="Six habits that meaningfully reduce risk — every day."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECURITY.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft"
          >
            <div className="mb-4 grid size-12 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
              <s.icon className="size-5" />
            </div>
            <div className="font-display text-base font-bold text-charcoal">{s.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
