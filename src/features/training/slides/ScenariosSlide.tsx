import {
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import SignatureCanvas from "react-signature-canvas";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  Award,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Eye,
  FileText,
  Fingerprint,
  FlaskConical,
  Gavel,
  Handshake,
  HardHat,
  Heart,
  KeyRound,
  Landmark,
  Lock,
  Mail,
  Map,
  Monitor,
  PartyPopper,
  Radio,
  RotateCw,
  Scale,
  Shield,
  ShieldCheck,
  Sparkles,
  Tag,
  Target,
  Trash2,
  TrendingDown,
  Truck,
  UserCircle,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { Button, Card, Checkbox, Field, SlideHead } from "../components/primitives";
import { BulletList, SectionLabel } from "../components/slide-content";
import {
  ASSESSMENT,
  CONFIDENTIAL_TOPICS,
  CONSEQUENCE_TOPICS,
  DOS,
  DONTS,
  KC1,
  KC2,
  KC3,
  RESPONSIBILITIES,
  SECURITY,
  TAKEAWAYS,
  type KCQuestion,
} from "../data";
import { stagger } from "../motion";
import type { BadgeKey } from "../types";

export function SlideScenarios() {
  const SCENARIOS = [
    {
      q: "A supplier requests geological reports before management approval.",
      options: [
        { text: "Share the report", correct: false },
        { text: "Decline & notify supervisor", correct: true },
      ],
      explain: "Route the request through your supervisor and the approved sharing process.",
    },
    {
      q: "You find a USB drive in the parking lot.",
      options: [
        { text: "Plug it in to identify the owner", correct: false },
        { text: "Hand it to IT unopened", correct: true },
      ],
      explain: "Unknown drives can carry malware. Let IT investigate safely.",
    },
    {
      q: "A journalist calls asking about a recent internal decision.",
      options: [
        { text: "Answer briefly to be helpful", correct: false },
        { text: "Refer them to Corporate Communications", correct: true },
      ],
      explain: "Only authorised spokespeople should respond to media queries.",
    },
  ];
  return (
    <div>
      <SlideHead
        kicker="Chapter 5"
        title="Real-life scenarios"
        sub="Tap each choice to see which action protects PK5 Mining."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {SCENARIOS.map((s, i) => (
          <ScenarioCard key={i} {...s} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
}

function ScenarioCard({
  q,
  options,
  explain,
  delay,
}: {
  q: string;
  options: { text: string; correct: boolean }[];
  explain: string;
  delay: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + delay }}
      className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-soft"
    >
      <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
        <FileText className="size-3" /> Scenario
      </div>
      <p className="mb-5 text-[15px] font-medium leading-snug text-charcoal">{q}</p>
      <div className="mt-auto space-y-2">
        {options.map((o, idx) => {
          const isPicked = picked === idx;
          const revealed = picked !== null;
          const good = revealed && o.correct;
          const bad = revealed && isPicked && !o.correct;
          return (
            <button
              key={o.text}
              onClick={() => picked === null && setPicked(idx)}
              disabled={picked !== null && !isPicked && !o.correct}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                good
                  ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]"
                  : bad
                    ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive"
                    : "border-border bg-white text-charcoal hover:border-gold/50"
              }`}
            >
              {o.text}
              {good && <Check className="size-4 text-success" strokeWidth={3} />}
              {bad && <X className="size-4 text-destructive" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden text-xs leading-relaxed text-muted-foreground"
          >
            <div className="rounded-lg bg-muted p-3">{explain}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
