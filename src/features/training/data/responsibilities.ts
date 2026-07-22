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
    icon: Lock, title: "Keep company information secure at all times", critical: true,
    detail: "Store files only in approved company systems (shared drives, approved cloud platforms) — never on personal laptops, personal email, or unapproved apps. If you're not sure whether a system is approved, ask IT before using it.",
    why: "Even seemingly minor data — a project code name, a supplier's rate — can combine with other leaks to cause serious harm.",
    bestPractice: "When in doubt, don't share. Ask your supervisor or Compliance first.",
    example: "Storing a draft geological report on a personal cloud drive to 'work from home' is a breach — use the approved VPN and secure workspace instead.",
  },
    {
    icon: Shield, title: "Never share confidential files without approval", critical: true,
    detail: " Before sending a file outside your immediate team — especially externally — verify the request with your supervisor and keep a record of what was shared and why. This applies even if the request seems to come from someone senior or in a hurry; verify first.",
    why: "Unofficial sharing bypasses access controls, audit logs and legal safeguards.",
    bestPractice: "Use approved secure-transfer tools — never personal email, WhatsApp or personal cloud drives.",
    example: "Emailing a contract PDF to a vendor's Gmail address is a breach — send it via the contract portal with an NDA on file.",
  },
    {
    icon: AlertTriangle, title: "Report suspected breaches immediately", critical: true,
    detail: "If you suspect a leak, a lost device, unauthorized access, or a phishing attempt, contact your security or IT team within the hour — not at the end of the day. Early reporting is often the difference between a contained incident and a serious one.",
    why: "Fast reporting massively reduces the damage a breach can cause. There is no penalty for reporting in good faith.",
    bestPractice: "Report to your supervisor as soon as you become aware of the issue.",
    example: "You realise you replied-all to an external contact with a confidential attachment — report it now, don't wait.",
  },
  {
    icon: KeyRound, title: "Use strong, unique passwords for every account",
    detail: "Combine length and complexity, and use a different password for every system — reusing passwords means one breach can expose everything. Use a company-approved password manager rather than writing passwords down or reusing familiar patterns.",
    why: "Reused passwords mean that a single third-party breach can unlock every one of your work accounts.",
    bestPractice: "Enable multi-factor authentication on every account that supports it.",
    example: "Using the same password for your email and the financial reporting portal doubles the impact of any compromise.",
  },
  {
    icon: Monitor, title: "Lock your computer when stepping away",
    detail: " Even for a short coffee break. An unlocked screen at a mine site office, a shared workspace, or an airport lounge is an open door to confidential data.",
    why: "Most unauthorised access incidents happen from within trusted offices, not from external attackers.",
    bestPractice: "Use Win+L (Windows) or Ctrl+Cmd+Q (Mac) every time you step away.",
    example: "A contractor waiting for a meeting reads through emails left open on an unlocked laptop — a confidentiality breach, without any hacking.",
  },
  {
    icon: Trash2, title: "Dispose of sensitive documents  properly",
    detail: " Shred physical documents rather than binning them. Wipe devices before disposal or reassignment. Purge cloud copies and shared drafts once they're no longer needed — delete isn't the same as properly disposed of if backups or shared links remain active.",
    why: "'Dumpster diving' remains a common source of leaks. Simple deletion often does not remove data from backups.",
    bestPractice: "Never put confidential printouts in a regular recycling bin.",
    example: "A discarded printout of a compensation review, recovered from an ordinary bin, becomes a HR & privacy incident.",
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
