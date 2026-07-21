import { motion } from "motion/react";
import {
  Award,
  Compass,
  Home,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Button, Logo } from "./primitives";
import { ShieldIllustration } from "./ShieldIllustration";

export function ThankYou({
  data,
  onDashboard,
  onExit,
}: {
  data: { fullName: string };
  onDashboard: () => void;
  onExit: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, oklch(0.9 0.15 82 / 0.15) 0, transparent 50%), radial-gradient(circle at 85% 80%, oklch(0.8 0.15 82 / 0.12) 0, transparent 45%)",
        }}
      />

      {/* Gold accent lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 top-24 h-px w-full origin-left gold-gradient opacity-40"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-24 right-0 h-px w-full origin-right gold-gradient opacity-40"
      />

      <div className="relative w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }}
          className="mx-auto mb-6 grid size-24 place-items-center rounded-full gold-gradient shadow-gold"
        >
          <Award className="size-12 text-white" strokeWidth={2.2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-dark"
        >
          <ShieldCheck className="size-3" /> Confidentiality Champion
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="font-display text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl"
        >
          Thank <span className="text-gold-gradient">You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Thank you, <span className="font-semibold text-charcoal">{data.fullName}</span>, for
          completing the PK5 Mining Confidentiality Training. By protecting confidential
          information, you help safeguard our people, our operations, our partners, and our future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mx-auto mt-8 max-w-md"
        >
          <ShieldIllustration />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={onDashboard}>
            <Home className="size-4" /> Return to Dashboard
          </Button>
          <Button size="lg" variant="outline" onClick={onExit}>
            <LogOut className="size-4" /> Exit Training
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Compass className="size-3.5 text-gold" />
          PK5 Mining © {new Date().getFullYear()} · Confidentiality Program
        </motion.div>
      </div>
    </div>
  );
}
