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
