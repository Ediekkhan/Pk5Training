import {
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { motion } from "motion/react";
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

export function SlideDosDonts() {
  return (
    <div>
      <SlideHead
        kicker="Chapter 4"
        title="Do's & Don'ts"
        sub="Small habits, big impact. Keep this list top of mind."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-success/30 bg-[oklch(0.97_0.05_155)] p-6 shadow-soft">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-[oklch(0.42_0.15_155)]">
            <div className="grid size-7 place-items-center rounded-full bg-success text-white">
              <Check className="size-4" strokeWidth={3} />
            </div>
            Do
          </div>
          <ul className="space-y-3">
            {DOS.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-start gap-2.5 text-sm text-charcoal"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} /> {d}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-destructive/25 bg-[oklch(0.98_0.03_27)] p-6 shadow-soft">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-destructive">
            <div className="grid size-7 place-items-center rounded-full bg-destructive text-white">
              <X className="size-4" strokeWidth={3} />
            </div>
            Don't
          </div>
          <ul className="space-y-3">
            {DONTS.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-start gap-2.5 text-sm text-charcoal"
              >
                <X className="mt-0.5 size-4 shrink-0 text-destructive" strokeWidth={3} /> {d}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
