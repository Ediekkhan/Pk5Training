import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/primitives";
import { stagger } from "../motion";
import { ShieldIllustration } from "../components/ShieldIllustration";

export function SlideWelcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <motion.div
          {...stagger(0)}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="size-1.5 rounded-full bg-success" /> 7–10 minute training
        </motion.div>
        <motion.h1
          {...stagger(0.05)}
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-charcoal sm:text-5xl md:text-6xl"
        >
          Welcome to <span className="text-gold-gradient">PK5 Mining</span> Confidentiality Training
        </motion.h1>
        <motion.p
          {...stagger(0.15)}
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          Protecting confidential information is everyone's responsibility. This interactive
          walkthrough guides you through what matters most — one clear step at a time.
        </motion.p>
        <motion.div {...stagger(0.25)} className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onStart}>
            Start training <ArrowRight className="size-4" />
          </Button>
          <div className="text-xs text-muted-foreground">Use ← → keys to navigate</div>
        </motion.div>
        <motion.div {...stagger(0.35)} className="mt-10 grid max-w-md grid-cols-3 gap-3">
          {[
            { n: "15", l: "Stops" },
            { n: "3", l: "Knowledge checks" },
            { n: "3", l: "Badges" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-white p-4 shadow-soft">
              <div className="font-display text-2xl font-extrabold text-charcoal">{s.n}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-square w-full max-w-lg"
      >
        <div className="absolute inset-0 rounded-[36px] gold-gradient opacity-10 blur-3xl" />
        <div className="relative flex h-full items-center justify-center rounded-4xl border border-border bg-white shadow-elevated">
          <ShieldIllustration />
        </div>
      </motion.div>
    </div>
  );
}
