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

export function SlideCompletionPrompt({
  ready,
  onSubmit,
}: {
  ready: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <SlideHead
        kicker="Ready to submit"
        title="Submit your training record"
        sub="You're one click away from completing your PK5 Mining Confidentiality Training."
      />
      <Card className="p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 grid size-16 place-items-center rounded-full gold-gradient text-white shadow-gold"
        >
          <ShieldCheck className="size-8" />
        </motion.div>
        <p className="text-sm leading-relaxed text-charcoal">
          Click below to submit your acknowledgement and signature. Your completion will be
          recorded.
        </p>
        <div className="mt-6">
          <Button size="lg" onClick={onSubmit} disabled={!ready}>
            <Check className="size-4" /> Submit & complete training
          </Button>
        </div>
      </Card>
    </div>
  );
}
