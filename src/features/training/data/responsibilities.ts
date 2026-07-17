import {
  AlertTriangle,
  Archive,
  Award,
  Building2,
  DollarSign,
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
  Radio,
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
} from "lucide-react";
import type { IconType } from "./confidential-topics";

export type ResponsibilityDetail = {
  icon: IconType;
  title: string;
  critical?: boolean;
  detail: string;
  why: string;
  bestPractice: string;
  example: string;
};

export const RESPONSIBILITIES: ResponsibilityDetail[] = [
  {
    icon: Lock,
    title: "Keep company information secure at all times",
    critical: true,
    detail:
      "Treat every piece of PK5 Mining information as confidential unless it has been formally released.",
    why: "Even seemingly minor data — a project code name, a supplier's rate — can combine with other leaks to cause serious harm.",
    bestPractice: "When in doubt, don't share. Ask your supervisor or Compliance first.",
    example:
      "Storing a draft geological report on a personal cloud drive to 'work from home' is a breach — use the approved VPN and secure workspace instead.",
  },
  {
    icon: KeyRound,
    title: "Use strong, unique passwords for every account",
    detail:
      "Every business system needs its own strong password, ideally generated and stored in the approved password manager.",
    why: "Reused passwords mean that a single third-party breach can unlock every one of your work accounts.",
    bestPractice: "Enable multi-factor authentication on every account that supports it.",
    example:
      "Using the same password for your email and the financial reporting portal doubles the impact of any compromise.",
  },
  {
    icon: Monitor,
    title: "Lock your computer when stepping away",
    detail: "Lock your screen every single time you step away — even for a minute.",
    why: "Most unauthorised access incidents happen from within trusted offices, not from external attackers.",
    bestPractice: "Use Windows + L, or Ctrl + Cmd + Q on Mac. Make it muscle memory.",
    example:
      "A contractor waiting for a meeting reads through emails left open on an unlocked laptop — a confidentiality breach, without any hacking.",
  },
  {
    icon: Shield,
    title: "Never share confidential files without approval",
    critical: true,
    detail:
      "Any external sharing of confidential material must go through the approved sharing workflow and be authorised by the data owner.",
    why: "Unofficial sharing bypasses access controls, audit logs and legal safeguards.",
    bestPractice:
      "Use approved secure-transfer tools — never personal email, WhatsApp or personal cloud drives.",
    example:
      "Emailing a contract PDF to a vendor's Gmail address is a breach — send it via the contract portal with an NDA on file.",
  },
  {
    icon: Trash2,
    title: "Dispose of sensitive documents securely",
    detail:
      "Confidential paper documents must be shredded or placed in secure disposal bins. Digital files must be deleted from approved locations only.",
    why: "'Dumpster diving' remains a common source of leaks. Simple deletion often does not remove data from backups.",
    bestPractice: "Never put confidential printouts in a regular recycling bin.",
    example:
      "A discarded printout of a compensation review, recovered from an ordinary bin, becomes a HR & privacy incident.",
  },
  {
    icon: AlertTriangle,
    title: "Report suspected breaches immediately",
    critical: true,
    detail:
      "If you suspect any confidentiality breach — even accidental — report it immediately through the approved channel.",
    why: "Fast reporting massively reduces the damage a breach can cause. There is no penalty for reporting in good faith.",
    bestPractice:
      "Report to your supervisor and to security@pk5mining as soon as you become aware of the issue.",
    example:
      "You realise you replied-all to an external contact with a confidential attachment — report it now, don't wait.",
  },
];

export const DOS = [
  "Follow company policies",
  "Encrypt sensitive files",
  "Verify email recipients",
  "Keep workspaces secure",
];
export const DONTS = [
  "Share passwords",
  "Leave documents unattended",
  "Discuss info publicly",
  "Upload files to personal cloud",
];

export const SECURITY = [
  { icon: KeyRound, title: "Password Protection", desc: "Strong, unique, rotated regularly" },
  { icon: Fingerprint, title: "Multi-Factor Auth", desc: "Verify with a second device" },
  { icon: Mail, title: "Secure Email", desc: "Verify recipients & encrypt" },
  { icon: Monitor, title: "Device Security", desc: "Lock, patch, and encrypt" },
  { icon: Wifi, title: "Safe Internet", desc: "Trusted networks & VPN only" },
  { icon: Archive, title: "Physical Docs", desc: "Locked storage & shredding" },
];
