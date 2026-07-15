import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode, type ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";
import SignatureCanvas from "react-signature-canvas";
import {
  Shield, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check, X, Award,
  FileText, DollarSign, Users, UserCircle, Handshake, Mail, Target,
  Tag, Truck, FlaskConical, Map, KeyRound, Monitor, Trash2, AlertTriangle,
  Fingerprint, Wifi, Archive, Sparkles, Download, RotateCw, LogOut,
  CheckCircle2, ShieldCheck, Scale, TrendingDown, Heart, Gavel, Building2,
  Menu, ChevronDown, ChevronRight, PartyPopper, HardHat, Radio, Landmark,
  Home, Compass,
} from "lucide-react";
import logo from "../assets/pk5logo.png";

export const Route = createFileRoute("/")({ component: App });

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative grid size-32 place-items-center">
        <img src={logo} alt="PK5 Mining Logo" />
      </div>
    </div>
  );
}

function Button({
  children, variant = "primary", size = "md", className = "", disabled, onClick, type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const sizes = {
    sm: "h-9 px-4 text-sm rounded-lg",
    md: "h-11 px-6 text-sm rounded-xl",
    lg: "h-13 px-8 text-base rounded-2xl",
  };
  const variants = {
    primary: "gold-gradient text-white shadow-gold hover:brightness-105 active:brightness-95 disabled:opacity-40 disabled:shadow-none",
    ghost: "bg-transparent text-foreground hover:bg-muted disabled:opacity-40",
    outline: "border border-border bg-white text-foreground hover:bg-muted disabled:opacity-40",
    dark: "bg-charcoal text-white hover:bg-charcoal/90 disabled:opacity-40",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card shadow-soft ${className}`}>
      {children}
    </div>
  );
}

function Field({
  label, icon, value, onChange, type = "text", placeholder, trailing, autoComplete,
}: {
  label: string; icon?: ReactNode; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; trailing?: ReactNode; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-charcoal">{label}</span>
      <div className="group flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-3.5 transition-all focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/10">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-muted-foreground/70 outline-none"
        />
        {trailing}
      </div>
    </label>
  );
}

function Checkbox({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative grid size-5 place-items-center rounded-md border transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${checked ? "gold-gradient border-transparent" : "border-border bg-white hover:border-gold/50"
        }`}
    >
      <AnimatePresence>
        {checked && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Check className="size-3.5 text-white" strokeWidth={3.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function SlideHead({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-dark"
        >
          {kicker}
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-charcoal sm:text-4xl md:text-[44px]"
      >
        {title}
      </motion.h1>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

function stagger(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.15 + delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type IconType = ComponentType<{ className?: string }>;

type ConfidentialTopic = {
  icon: IconType;
  title: string;
  short: string;
  definition: string;
  why: string;
  examples: string[];
  risks: string[];
  responsibilities: string[];
  bestPractices: string[];
  didYouKnow: string;
  read: string;
};

const CONFIDENTIAL_TOPICS: ConfidentialTopic[] = [
  {
    icon: Map, title: "Geological Data", short: "Exploration & survey findings",
    definition: "Data from exploration, drilling, sampling and geological surveys that reveals the location, grade or extent of mineral deposits.",
    why: "It is the foundation of PK5 Mining's competitive edge. Leaked survey results can move markets and enable competitors to stake nearby ground.",
    examples: ["Drill core assay results", "Ore body models & resource estimates", "Unpublished exploration maps"],
    risks: ["Loss of competitive advantage", "Land-claim disputes", "Insider trading exposure"],
    responsibilities: ["Store data on approved systems only", "Only share with permit-cleared teams", "Verify recipients before any transfer"],
    bestPractices: ["Encrypt all geological files", "Use watermarking on shared reports", "Log every export request"],
    didYouKnow: "A single leaked assay result has, in the industry, moved competitor share prices by more than 20% overnight.",
    read: "~40s read",
  },
  {
    icon: FileText, title: "Mining Reports", short: "Operational documentation",
    definition: "Internal reports covering production, safety, environmental performance and site operations.",
    why: "They contain non-public operational detail that could be misused by competitors, activists, or bad actors.",
    examples: ["Daily production summaries", "Shift-by-shift safety logs", "Environmental compliance reports"],
    risks: ["Regulatory scrutiny", "Media misinterpretation", "Community trust damage"],
    responsibilities: ["Distribute reports on a need-to-know basis", "Never email reports to personal accounts", "Return printed copies to secure storage"],
    bestPractices: ["Use the report portal instead of email", "Mark drafts 'Confidential — Draft'", "Purge outdated reports responsibly"],
    didYouKnow: "Regulators may request historical reports up to 7 years after they were filed.",
    read: "~35s read",
  },
  {
    icon: DollarSign, title: "Financial Records", short: "Revenue, costs, forecasts",
    definition: "Management accounts, forecasts, unit costs, tax positions and any information that materially affects PK5 Mining's financial picture.",
    why: "Premature or selective disclosure can breach securities laws and undermine investor confidence.",
    examples: ["Quarterly earnings before release", "Cost-per-tonne breakdowns", "Capital expenditure plans"],
    risks: ["Insider trading violations", "Loss of investor trust", "Regulatory sanctions"],
    responsibilities: ["Never discuss unreleased figures externally", "Route enquiries to Investor Relations", "Treat forecasts as strictly confidential"],
    bestPractices: ["Follow the disclosure calendar", "Use blackout periods responsibly", "Escalate leaks immediately"],
    didYouKnow: "Even a casual mention of unreleased earnings can constitute a material disclosure.",
    read: "~35s read",
  },
  {
    icon: Users, title: "Employee Information", short: "HR & personal data",
    definition: "Personal data, contracts, compensation, performance reviews and health information relating to employees.",
    why: "Employees trust PK5 Mining to safeguard their personal data — and privacy law requires it.",
    examples: ["Salary and benefit details", "Medical or safety incident records", "Performance reviews"],
    risks: ["Privacy law breach & fines", "Erosion of employee trust", "Reputational damage"],
    responsibilities: ["Access only what your role requires", "Never share HR data casually", "Report exposed records immediately"],
    bestPractices: ["Use role-based access", "Anonymise data where possible", "Lock HR files when unattended"],
    didYouKnow: "Under most privacy regimes, employee records are protected for the entire employment period plus several years after.",
    read: "~30s read",
  },
  {
    icon: UserCircle, title: "Customer Information", short: "Client details & history",
    definition: "Customer identities, order histories, pricing arrangements and any commercially sensitive dealings.",
    why: "Our clients share information under strict confidentiality expectations, backed by contract.",
    examples: ["Long-term offtake agreements", "Customer-specific pricing", "Purchase forecasts"],
    risks: ["Breach of client contract", "Loss of key accounts", "Litigation"],
    responsibilities: ["Verify identity before sharing anything", "Use secure client portals", "Follow the client data policy"],
    bestPractices: ["Log every customer data access", "Redact where possible", "Never mix customer data across accounts"],
    didYouKnow: "Most customer NDAs continue in force for 3–5 years after the commercial relationship ends.",
    read: "~35s read",
  },
  {
    icon: Handshake, title: "Contracts", short: "Legal agreements",
    definition: "All executed and draft agreements with suppliers, customers, partners, contractors and regulators.",
    why: "Contract terms reveal commercial strategy, pricing and obligations that competitors could exploit.",
    examples: ["Joint venture agreements", "Supply and offtake contracts", "Consulting agreements"],
    risks: ["Loss of negotiating leverage", "Contractual disputes", "Regulatory issues"],
    responsibilities: ["Route contracts through Legal", "Never share drafts externally", "Store originals in the contract vault"],
    bestPractices: ["Use redlines only in the approved tool", "Version-control all drafts", "Shred obsolete printed copies"],
    didYouKnow: "A single leaked contract clause has, in past cases, cost mining companies millions in re-negotiated terms.",
    read: "~35s read",
  },
  {
    icon: Mail, title: "Internal Communications", short: "Emails, chats, memos",
    definition: "Emails, chat messages, meeting notes and internal memos discussing PK5 Mining's business.",
    why: "Even ordinary conversations often contain non-public detail that could damage the company if shared.",
    examples: ["Executive email threads", "Leadership meeting notes", "Sensitive Slack channels"],
    risks: ["Public misinterpretation", "Regulatory exposure", "Trust breakdown internally"],
    responsibilities: ["Treat internal messages as private", "Never forward externally", "Report accidental sends"],
    bestPractices: ["Use company channels only", "Avoid confidential detail in subject lines", "Be mindful in public spaces"],
    didYouKnow: "Screenshots of internal messages are one of the top three sources of confidentiality incidents industry-wide.",
    read: "~30s read",
  },
  {
    icon: Target, title: "Business Strategies", short: "Plans, roadmaps, initiatives",
    definition: "Strategic plans, roadmaps, M&A activity, expansion plans and other forward-looking initiatives.",
    why: "Strategic intent is often more valuable than data — competitors can pre-empt or block our moves.",
    examples: ["Expansion into new regions", "Acquisition targets", "Product or service roadmaps"],
    risks: ["Competitive counter-moves", "Loss of first-mover advantage", "Deal collapse"],
    responsibilities: ["Discuss strategy only in trusted rooms", "Never post strategy detail publicly", "Use code names where required"],
    bestPractices: ["Compartmentalise information", "Restrict physical printouts", "Follow the deal-team protocol"],
    didYouKnow: "M&A leaks have derailed roughly 1 in 10 announced deals across the resources sector.",
    read: "~35s read",
  },
  {
    icon: Tag, title: "Pricing Information", short: "Rate structures & margins",
    definition: "Pricing strategies, margin structures, customer-specific rates and cost bases.",
    why: "Pricing insight allows competitors to undercut us and customers to demand better terms.",
    examples: ["Customer discount schedules", "Tender pricing", "Margin analysis"],
    risks: ["Loss of contracts", "Reduced margins", "Anti-competitive allegations"],
    responsibilities: ["Never share pricing outside the deal team", "Treat tender data as top-tier confidential", "Watch out for social-engineering enquiries"],
    bestPractices: ["Use approved quoting tools", "Never quote from memory", "Verify identity of every enquirer"],
    didYouKnow: "Sharing pricing with competitors — even accidentally — can trigger antitrust investigations.",
    read: "~30s read",
  },
  {
    icon: Truck, title: "Supplier Agreements", short: "Vendor terms & pricing",
    definition: "Terms, pricing and performance data covering PK5 Mining's supplier and contractor relationships.",
    why: "Supplier terms reveal our cost base and could damage partner relationships if exposed.",
    examples: ["Master supply agreements", "Contractor rates", "Supplier performance scorecards"],
    risks: ["Higher input costs", "Broken supplier trust", "Contract disputes"],
    responsibilities: ["Only share terms with authorised teams", "Never discuss supplier rates casually", "Use the vendor portal"],
    bestPractices: ["Segment supplier data by category", "Require NDAs before sharing detail", "Archive expired agreements securely"],
    didYouKnow: "Suppliers often have contractual audit rights — a leak of their terms can trigger those audits.",
    read: "~30s read",
  },
  {
    icon: FlaskConical, title: "Research & Development", short: "Innovation & IP",
    definition: "Research programs, pilot studies, process innovations, patents in progress and other proprietary IP.",
    why: "R&D is where tomorrow's advantage is built — leaks give it away for free.",
    examples: ["Extraction process trials", "Automation pilots", "Patent applications in progress"],
    risks: ["Loss of patent priority", "Competitor imitation", "Reduced R&D ROI"],
    responsibilities: ["Protect research data at all times", "Only publish through approved channels", "Report suspected IP theft"],
    bestPractices: ["Use segregated R&D networks", "Require NDAs for all research partners", "Log every access to lab data"],
    didYouKnow: "In many jurisdictions, public disclosure — even a conference slide — can invalidate a patent.",
    read: "~35s read",
  },
  {
    icon: Building2, title: "Company Assets", short: "Physical & digital property",
    definition: "All physical assets, systems, tooling, code, digital platforms and infrastructure owned by PK5 Mining.",
    why: "Details about our assets — where they are, how they're configured — could be exploited for theft or sabotage.",
    examples: ["Site layouts and access schedules", "System architecture diagrams", "Vehicle & equipment inventories"],
    risks: ["Theft & sabotage", "Cyber intrusion", "Safety incidents"],
    responsibilities: ["Never share site or system detail publicly", "Report suspicious surveillance", "Follow physical security protocols"],
    bestPractices: ["Use approved asset registers", "Restrict floor plans and diagrams", "Escort external visitors at all times"],
    didYouKnow: "Publicly posted site photos have been used by criminals to plan resource-sector thefts.",
    read: "~35s read",
  },
];

type ResponsibilityDetail = {
  icon: IconType;
  title: string;
  critical?: boolean;
  detail: string;
  why: string;
  bestPractice: string;
  example: string;
};

const RESPONSIBILITIES: ResponsibilityDetail[] = [
  {
    icon: Lock, title: "Keep company information secure at all times", critical: true,
    detail: "Treat every piece of PK5 Mining information as confidential unless it has been formally released.",
    why: "Even seemingly minor data — a project code name, a supplier's rate — can combine with other leaks to cause serious harm.",
    bestPractice: "When in doubt, don't share. Ask your supervisor or Compliance first.",
    example: "Storing a draft geological report on a personal cloud drive to 'work from home' is a breach — use the approved VPN and secure workspace instead.",
  },
  {
    icon: KeyRound, title: "Use strong, unique passwords for every account",
    detail: "Every business system needs its own strong password, ideally generated and stored in the approved password manager.",
    why: "Reused passwords mean that a single third-party breach can unlock every one of your work accounts.",
    bestPractice: "Enable multi-factor authentication on every account that supports it.",
    example: "Using the same password for your email and the financial reporting portal doubles the impact of any compromise.",
  },
  {
    icon: Monitor, title: "Lock your computer when stepping away",
    detail: "Lock your screen every single time you step away — even for a minute.",
    why: "Most unauthorised access incidents happen from within trusted offices, not from external attackers.",
    bestPractice: "Use Windows + L, or Ctrl + Cmd + Q on Mac. Make it muscle memory.",
    example: "A contractor waiting for a meeting reads through emails left open on an unlocked laptop — a confidentiality breach, without any hacking.",
  },
  {
    icon: Shield, title: "Never share confidential files without approval", critical: true,
    detail: "Any external sharing of confidential material must go through the approved sharing workflow and be authorised by the data owner.",
    why: "Unofficial sharing bypasses access controls, audit logs and legal safeguards.",
    bestPractice: "Use approved secure-transfer tools — never personal email, WhatsApp or personal cloud drives.",
    example: "Emailing a contract PDF to a vendor's Gmail address is a breach — send it via the contract portal with an NDA on file.",
  },
  {
    icon: Trash2, title: "Dispose of sensitive documents securely",
    detail: "Confidential paper documents must be shredded or placed in secure disposal bins. Digital files must be deleted from approved locations only.",
    why: "'Dumpster diving' remains a common source of leaks. Simple deletion often does not remove data from backups.",
    bestPractice: "Never put confidential printouts in a regular recycling bin.",
    example: "A discarded printout of a compensation review, recovered from an ordinary bin, becomes a HR & privacy incident.",
  },
  {
    icon: AlertTriangle, title: "Report suspected breaches immediately", critical: true,
    detail: "If you suspect any confidentiality breach — even accidental — report it immediately through the approved channel.",
    why: "Fast reporting massively reduces the damage a breach can cause. There is no penalty for reporting in good faith.",
    bestPractice: "Report to your supervisor and to security@pk5mining as soon as you become aware of the issue.",
    example: "You realise you replied-all to an external contact with a confidential attachment — report it now, don't wait.",
  },
];

const DOS = ["Follow company policies", "Encrypt sensitive files", "Verify email recipients", "Keep workspaces secure"];
const DONTS = ["Share passwords", "Leave documents unattended", "Discuss info publicly", "Upload files to personal cloud"];

const SECURITY = [
  { icon: KeyRound, title: "Password Protection", desc: "Strong, unique, rotated regularly" },
  { icon: Fingerprint, title: "Multi-Factor Auth", desc: "Verify with a second device" },
  { icon: Mail, title: "Secure Email", desc: "Verify recipients & encrypt" },
  { icon: Monitor, title: "Device Security", desc: "Lock, patch, and encrypt" },
  { icon: Wifi, title: "Safe Internet", desc: "Trusted networks & VPN only" },
  { icon: Archive, title: "Physical Docs", desc: "Locked storage & shredding" },
];

type ConsequenceTopic = {
  icon: IconType;
  title: string;
  short: string;
  explanation: string;
  miningExample: string;
  businessImpact: string;
  employeeImpact: string;
  prevention: string[];
};

const CONSEQUENCE_TOPICS: ConsequenceTopic[] = [
  {
    icon: TrendingDown, title: "Financial Loss", short: "Direct revenue & margin impact",
    explanation: "Confidentiality breaches lead to lost contracts, weakened negotiating positions, fines and remediation costs.",
    miningExample: "A leaked pricing schedule allows a competitor to undercut a $40M offtake tender.",
    businessImpact: "Revenue decline, margin compression, additional remediation and legal spend.",
    employeeImpact: "Reduced bonuses, hiring freezes, potential layoffs in affected teams.",
    prevention: ["Restrict pricing to deal teams only", "Follow the approved tender workflow", "Report suspicious enquiries immediately"],
  },
  {
    icon: Gavel, title: "Legal Action", short: "Civil & criminal exposure",
    explanation: "Contract breaches, privacy violations and IP loss can all trigger lawsuits and criminal investigations.",
    miningExample: "A contractor sues PK5 Mining after their commercially sensitive rates are leaked to a competitor.",
    businessImpact: "Litigation costs, damages, injunctions, management distraction.",
    employeeImpact: "Personal legal exposure and disciplinary action for those responsible.",
    prevention: ["Handle contracts via Legal only", "Never share drafts externally", "Escalate suspected breaches to Compliance"],
  },
  {
    icon: Landmark, title: "Regulatory Penalties", short: "Fines & sanctions",
    explanation: "Regulators impose penalties for breaches of privacy, securities, environmental and industry-specific rules.",
    miningExample: "Premature disclosure of quarterly production data breaches securities laws and triggers a regulator fine.",
    businessImpact: "Multi-million-dollar fines, licence conditions, ongoing regulator oversight.",
    employeeImpact: "Individuals can face personal fines or industry bans.",
    prevention: ["Respect blackout periods", "Route disclosures through Investor Relations", "Follow the disclosure calendar"],
  },
  {
    icon: AlertTriangle, title: "Reputation Damage", short: "Loss of public trust",
    explanation: "A single high-profile leak can erode years of reputation-building and dominate the news cycle.",
    miningExample: "Leaked internal emails misrepresenting a safety incident go viral.",
    businessImpact: "Brand damage, harder recruitment, community protests.",
    employeeImpact: "Pride and morale drop; recruiting friends and family becomes harder.",
    prevention: ["Treat internal communications as private", "Route media queries to Communications", "Never post about internal matters"],
  },
  {
    icon: Target, title: "Loss of Business Opportunities", short: "Deals & partnerships evaporate",
    explanation: "Partners and customers walk away from companies that cannot be trusted with sensitive information.",
    miningExample: "A joint-venture partner terminates negotiations after a term-sheet leak.",
    businessImpact: "Lost deals, weakened pipeline, harder future partnerships.",
    employeeImpact: "Teams see their projects cancelled and career opportunities shrink.",
    prevention: ["Use code names for sensitive deals", "Compartmentalise deal-team information", "Only share on a need-to-know basis"],
  },
  {
    icon: TrendingDown, title: "Loss of Investor Confidence", short: "Share price & funding impact",
    explanation: "Investors punish companies with weak information controls — through the share price and reduced access to capital.",
    miningExample: "A selective disclosure incident wipes 8% off the share price in a day.",
    businessImpact: "Higher cost of capital, cancelled financings, activist attention.",
    employeeImpact: "Equity compensation loses value; growth projects get shelved.",
    prevention: ["Follow the disclosure policy", "Never discuss unreleased results externally", "Report any suspected selective disclosure"],
  },
  {
    icon: HardHat, title: "Operational Disruption", short: "Work stoppages & delays",
    explanation: "Breaches often trigger urgent investigations, system lockdowns and process changes that pause operations.",
    miningExample: "A ransomware incident traceable to a shared password halts production at a site for 48 hours.",
    businessImpact: "Lost production, missed shipments, contractual penalties.",
    employeeImpact: "Overtime, shift changes and additional workload on affected teams.",
    prevention: ["Never share passwords", "Follow patch and update prompts", "Use MFA on every account"],
  },
  {
    icon: Shield, title: "Safety Risks", short: "Risk to people on site",
    explanation: "Leaked site information — access routes, schedules, security details — can create direct physical safety risks.",
    miningExample: "Publicly posted site layouts assist an intrusion attempt at a remote camp.",
    businessImpact: "Incident investigations, insurance impacts, potential regulatory action.",
    employeeImpact: "Direct risk to personal safety and wellbeing.",
    prevention: ["Never post site photos externally", "Restrict site layouts to authorised staff", "Report suspicious enquiries or surveillance"],
  },
  {
    icon: Radio, title: "Cybersecurity Incidents", short: "Systems compromised",
    explanation: "Confidentiality lapses are the leading entry point for cyber incidents — phishing, credential theft and social engineering.",
    miningExample: "A finance team member is phished after their role and email are exposed in a data leak.",
    businessImpact: "Incident response costs, potential ransom, regulatory notifications.",
    employeeImpact: "Account lockouts, mandatory retraining, potential disciplinary action.",
    prevention: ["Verify suspicious emails via a second channel", "Use MFA everywhere", "Report phishing attempts immediately"],
  },
  {
    icon: Heart, title: "Community Relationship Damage", short: "Local trust erodes",
    explanation: "Confidentiality lapses that affect host communities can permanently damage the social licence to operate.",
    miningExample: "Leaked environmental incident data reaches the community before PK5 Mining can explain the response.",
    businessImpact: "Protests, permit challenges, delayed approvals for future projects.",
    employeeImpact: "Difficult conversations at home; harder to recruit locally.",
    prevention: ["Let Community Relations lead sensitive disclosures", "Never speculate publicly about incidents", "Respect embargoes and holding statements"],
  },
];

const TAKEAWAYS = [
  "Keep information confidential",
  "Follow company policies",
  "Report suspicious activity",
  "Protect company assets",
  "Ask when unsure",
];

/* -------------------------------------------------------------------------- */
/*  Knowledge Check data                                                      */
/* -------------------------------------------------------------------------- */

type KCType = "mc" | "tf" | "scenario";
type KCQuestion = {
  type: KCType;
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

const KC1: KCQuestion[] = [
  {
    type: "mc", q: "Confidentiality at PK5 Mining primarily helps to:",
    options: [
      "Protect competitive advantage, comply with law, and maintain trust",
      "Slow down internal collaboration",
      "Restrict access to public information",
      "Increase the cost of doing business",
    ],
    correct: 0,
    explain: "Confidentiality protects our edge, meets legal duties, and keeps the trust of our people and partners.",
  },
  {
    type: "tf", q: "Only executives are responsible for protecting confidential information.",
    options: ["True", "False"], correct: 1,
    explain: "Every employee shares responsibility — from site to boardroom.",
  },
  {
    type: "mc", q: "Which is an example of confidential information?",
    options: ["The company website URL", "Unpublished drill assay results", "A public press release", "The office address"],
    correct: 1,
    explain: "Unpublished exploration data is one of the most sensitive categories we hold.",
  },
  {
    type: "scenario", q: "A friend outside work asks how your project is going. What do you do?",
    options: [
      "Share the interesting details in confidence",
      "Talk in general terms without disclosing specifics",
      "Send a copy of the internal update",
      "Post about it on social media",
    ],
    correct: 1,
    explain: "You can talk about your work in general terms — never share internal detail or documents.",
  },
];

const KC2: KCQuestion[] = [
  {
    type: "mc", q: "You need to send a contract to an external vendor. You should:",
    options: [
      "Email it from your personal account",
      "Upload it to your personal cloud drive",
      "Use the approved secure transfer tool",
      "Print it and mail it via regular post",
    ],
    correct: 2,
    explain: "Approved secure transfer tools give you encryption, audit and access controls.",
  },
  {
    type: "tf", q: "Reusing one strong password across all your accounts is a good practice.",
    options: ["True", "False"], correct: 1,
    explain: "Each account needs a unique password — reuse turns one breach into many.",
  },
  {
    type: "scenario", q: "You spot a stranger reading documents at a colleague's desk. You should:",
    options: [
      "Ignore it, they may be a visitor",
      "Politely ask who they are and notify security",
      "Take a photo and post it internally",
      "Assume the colleague authorised it",
    ],
    correct: 1,
    explain: "Verify politely and let security investigate — most on-site incidents start with unchallenged access.",
  },
  {
    type: "mc", q: "The safest way to dispose of confidential paperwork is:",
    options: [
      "Regular recycling bin",
      "Home wastepaper basket",
      "Secure shredding or a designated disposal bin",
      "Leaving it on your desk for cleaners",
    ],
    correct: 2,
    explain: "Use shredding or secure disposal bins — never regular waste.",
  },
];

const KC3: KCQuestion[] = [
  {
    type: "mc", q: "Which is NOT typically a consequence of a confidentiality breach?",
    options: ["Fines and lawsuits", "Reputation damage", "Guaranteed promotion", "Loss of investor confidence"],
    correct: 2,
    explain: "Breaches carry real personal and business risk — there is no upside.",
  },
  {
    type: "scenario", q: "You've accidentally emailed a confidential file to the wrong person. You should:",
    options: [
      "Do nothing and hope they don't notice",
      "Ask the recipient to delete it and move on",
      "Report it immediately through the approved channel",
      "Send another email asking them not to open it",
    ],
    correct: 2,
    explain: "Fast reporting massively reduces the damage. There is no penalty for good-faith reporting.",
  },
  {
    type: "tf", q: "A single confidentiality lapse can affect share price, contracts, and safety.",
    options: ["True", "False"], correct: 0,
    explain: "Breaches ripple across many parts of the business — financial, legal, operational and human.",
  },
  {
    type: "mc", q: "The most important habit to leave with is:",
    options: [
      "Ask when unsure",
      "Assume everything is fine",
      "Only worry about digital files",
      "Trust that IT will catch mistakes",
    ],
    correct: 0,
    explain: "'Ask when unsure' beats every other habit — it prevents most incidents before they start.",
  },
];

type Quiz = { q: string; options: string[]; correct: number; explain?: string };

const ASSESSMENT: Quiz[] = [
  {
    q: "Which best defines 'confidential information' at PK5 Mining?",
    options: [
      "Anything printed on company letterhead",
      "Non-public information whose disclosure could harm the company, its people, or its partners",
      "Only files marked with a red 'Confidential' stamp",
      "Information older than five years",
    ],
    correct: 1,
  },
  {
    q: "Which of the following is an example of confidential information?",
    options: [
      "The company's public website URL",
      "A press release already issued to media",
      "Unpublished geological survey data",
      "The company's registered street address",
    ],
    correct: 2,
  },
  {
    q: "As a PK5 Mining employee, your core responsibility is to:",
    options: [
      "Share information freely with colleagues to speed up work",
      "Protect confidential information at all times and follow company policy",
      "Store business files on your personal devices for convenience",
      "Discuss projects openly outside of work to build your network",
    ],
    correct: 1,
  },
  {
    q: "You've finished reviewing a printed confidential report. What should you do with it?",
    options: [
      "Recycle it with regular paper",
      "Leave it on your desk for tomorrow",
      "Shred it or place it in a designated secure-disposal bin",
      "Take it home to review again later",
    ],
    correct: 2,
  },
  {
    q: "Which is the strongest password practice?",
    options: [
      "Reuse one strong password across every account",
      "Use a unique, complex password per account and enable multi-factor authentication",
      "Share your password with IT so they can help faster",
      "Write your password on a sticky note under your keyboard",
    ],
    correct: 1,
  },
  {
    q: "You receive an unexpected email asking you to click a link and 'verify' your credentials. You should:",
    options: [
      "Click the link quickly to avoid account lockout",
      "Forward it to all colleagues as a warning",
      "Do not click, and report it to IT / security",
      "Reply with your credentials to prove account ownership",
    ],
    correct: 2,
  },
  {
    q: "The best physical-security habit when leaving your desk is to:",
    options: [
      "Lock your screen and secure any sensitive documents",
      "Leave documents open so colleagues can consult them",
      "Trust that the office is safe and leave everything as-is",
      "Log out only at the end of the day",
    ],
    correct: 0,
  },
  {
    q: "A colleague asks you to send a confidential report to their personal email because they cannot access their work account. You should:",
    options: [
      "Send the report immediately",
      "Share it through a personal cloud drive",
      "Decline and advise them to follow the approved company process",
      "Print the report and leave it on their desk",
    ],
    correct: 2,
  },
  {
    q: "Which is NOT a possible consequence of a confidentiality breach?",
    options: [
      "Legal action and financial penalties",
      "Damage to the company's reputation",
      "Disciplinary action up to termination",
      "A guaranteed promotion for transparency",
    ],
    correct: 3,
  },
  {
    q: "If you suspect a confidentiality breach has occurred, you should:",
    options: [
      "Wait and see if anyone notices",
      "Report it immediately through the approved reporting channel",
      "Handle it privately without informing anyone",
      "Post about it on social media to warn others",
    ],
    correct: 1,
  },
];

/* -------------------------------------------------------------------------- */
/*  Roadmap                                                                   */
/* -------------------------------------------------------------------------- */

type RoadmapStop = { id: number; label: string; short: string };

const ROADMAP: RoadmapStop[] = [
  { id: 0, label: "Welcome", short: "Welcome" },
  { id: 1, label: "Why Confidentiality Matters", short: "Why" },
  { id: 2, label: "What is Confidential Information", short: "What" },
  { id: 3, label: "Your Responsibilities", short: "Responsibilities" },
  { id: 4, label: "Knowledge Check 1", short: "Check 1" },
  { id: 5, label: "Do's & Don'ts", short: "Do's & Don'ts" },
  { id: 6, label: "Real-Life Scenarios", short: "Scenarios" },
  { id: 7, label: "Data Security Best Practices", short: "Security" },
  { id: 8, label: "Knowledge Check 2", short: "Check 2" },
  { id: 9, label: "Consequences of Breaches", short: "Consequences" },
  { id: 10, label: "Key Takeaways", short: "Takeaways" },
  { id: 11, label: "Knowledge Check 3", short: "Check 3" },
  { id: 12, label: "Final Assessment", short: "Assessment" },
  { id: 13, label: "Acknowledgement", short: "Acknowledgement" },
  { id: 14, label: "Completion", short: "Completion" },
];

/* -------------------------------------------------------------------------- */
/*  Root App                                                                  */
/* -------------------------------------------------------------------------- */

type Stage = "login" | "training" | "complete" | "thankyou";

function App() {
  const [stage, setStage] = useState<Stage>("login");
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [completion, setCompletion] = useState<{
    signature: string;
    fullName: string;
    employeeId: string;
    department: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[oklch(0.985_0.005_82)]">
      <AnimatePresence mode="wait">
        {stage === "login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Login onLogin={(id) => { setUser({ id }); setStage("training"); }} />
          </motion.div>
        )}
        {stage === "training" && (
          <motion.div key="training" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Training
              user={user!}
              onComplete={(data) => { setCompletion(data); setStage("complete"); }}
              onExit={() => { setUser(null); setStage("login"); }}
            />
          </motion.div>
        )}
        {stage === "complete" && completion && (
          <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Completion
              data={completion}
              onContinue={() => setStage("thankyou")}
              onRestart={() => setStage("training")}
              onExit={() => { setUser(null); setCompletion(null); setStage("login"); }}
            />
          </motion.div>
        )}
        {stage === "thankyou" && completion && (
          <motion.div key="thankyou" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <ThankYou
              data={completion}
              onDashboard={() => { setCompletion(null); setStage("training"); }}
              onExit={() => { setUser(null); setCompletion(null); setStage("login"); }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Login                                                                     */
/* -------------------------------------------------------------------------- */

function Login({ onLogin }: { onLogin: (id: string) => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!id.trim() || pw.length < 4) {
      setErr("Please enter your ID and a password of at least 4 characters.");
      return;
    }
    setErr("");
    setLoading(true);
    setTimeout(() => onLogin(id.trim()), 700);
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-charcoal lg:block">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.9 0.15 82) 0, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.8 0.15 82) 0, transparent 45%)",
        }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo className="[&_.text-charcoal]:text-white [&_.text-muted-foreground]:text-white/60" />
          <div className="max-w-md space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <Sparkles className="size-3.5 text-gold" /> Enterprise Onboarding
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight">
              Protect what <span className="text-gold-gradient">powers</span> our mission.
            </h1>
            <p className="text-lg leading-relaxed text-white/70">
              A concise, interactive training on confidentiality — designed for the people who keep PK5 Mining moving.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[{ n: "15", l: "Stops" }, { n: "7–10", l: "Minutes" }, { n: "3", l: "Badges" }].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-extrabold text-gold">{s.n}</div>
                  <div className="text-xs text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Lock className="size-3.5" />
            Secure connection · TLS encrypted · PK5 Mining © {new Date().getFullYear()}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <div className="mb-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sign in with your employee credentials to begin training.</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <Field label="Employee ID or Email" icon={<UserCircle className="size-4" />} value={id} onChange={setId} placeholder="e.g. PK-4821 or you@pk5mining.com" autoComplete="username" />
            <Field
              label="Password" icon={<Lock className="size-4" />} value={pw} onChange={setPw}
              type={show ? "text" : "password"} placeholder="Enter your password" autoComplete="current-password"
              trailing={
                <button type="button" onClick={() => setShow((v) => !v)} className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted" aria-label={show ? "Hide password" : "Show password"}>
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <Checkbox checked={remember} onChange={setRemember} />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="font-semibold text-charcoal hover:text-gold">Forgot password?</button>
            </div>
            {err && <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">{err}</div>}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : (<>Sign in & start training <ArrowRight className="size-4" /></>)}
            </Button>
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" /> Secure login · Your session is encrypted end-to-end
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Training                                                                  */
/* -------------------------------------------------------------------------- */

type BadgeKey = "learner" | "practitioner" | "champion";
const BADGES: Record<BadgeKey, { label: string; icon: typeof Award }> = {
  learner: { label: "Learning Milestone", icon: Sparkles },
  practitioner: { label: "Practitioner", icon: ShieldCheck },
  champion: { label: "Confidentiality Champion", icon: Award },
};

function Training({
  user, onComplete, onExit,
}: {
  user: { id: string };
  onComplete: (d: { signature: string; fullName: string; employeeId: string; department: string }) => void;
  onExit: () => void;
}) {
  const total = ROADMAP.length; // 15
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [maxIndex, setMaxIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Progress state
  const [topicsCompleted, setTopicsCompleted] = useState<Set<number>>(new Set());
  const [consequencesViewed, setConsequencesViewed] = useState<Set<number>>(new Set());
  const [kc1Answers, setKc1Answers] = useState<Record<number, number>>({});
  const [kc2Answers, setKc2Answers] = useState<Record<number, number>>({});
  const [kc3Answers, setKc3Answers] = useState<Record<number, number>>({});
  const [badges, setBadges] = useState<Set<BadgeKey>>(new Set());

  // Ack
  const [ack, setAck] = useState(false);
  const [fullName, setFullName] = useState("");
  const [empId, setEmpId] = useState(user.id.includes("@") ? "" : user.id);
  const [dept, setDept] = useState("");
  const [sigData, setSigData] = useState<string>("");
  const [sigMode, setSigMode] = useState<"draw" | "type">("draw");
  const [typedSig, setTypedSig] = useState("");
  const sigRef = useRef<SignatureCanvas | null>(null);

  // Final assessment
  const [assessAnswers, setAssessAnswers] = useState<Record<number, number>>({});
  const [assessSubmitted, setAssessSubmitted] = useState(false);
  const assessScore = useMemo(
    () => ASSESSMENT.reduce((a, q, idx) => a + (assessAnswers[idx] === q.correct ? 1 : 0), 0),
    [assessAnswers]
  );
  const assessPct = Math.round((assessScore / ASSESSMENT.length) * 100);
  const assessPassed = assessSubmitted && assessPct >= 80;

  const awardBadge = (b: BadgeKey) => setBadges((s) => new Set(s).add(b));

  // Badge awards from KC completion
  useEffect(() => {
    if (Object.keys(kc1Answers).length === KC1.length) awardBadge("learner");
  }, [kc1Answers]);
  useEffect(() => {
    if (Object.keys(kc2Answers).length === KC2.length) awardBadge("practitioner");
  }, [kc2Answers]);
  useEffect(() => {
    if (Object.keys(kc3Answers).length === KC3.length) awardBadge("champion");
  }, [kc3Answers]);

  // Section completion for roadmap
  const isSectionComplete = (idx: number): boolean => {
    switch (idx) {
      case 0: return maxIndex > 0;
      case 1: return maxIndex > 1;
      case 2: return topicsCompleted.size >= CONFIDENTIAL_TOPICS.length;
      case 3: return maxIndex > 3;
      case 4: return Object.keys(kc1Answers).length === KC1.length;
      case 5: return maxIndex > 5;
      case 6: return maxIndex > 6;
      case 7: return maxIndex > 7;
      case 8: return Object.keys(kc2Answers).length === KC2.length;
      case 9: return consequencesViewed.size >= CONSEQUENCE_TOPICS.length;
      case 10: return maxIndex > 10;
      case 11: return Object.keys(kc3Answers).length === KC3.length;
      case 12: return assessPassed;
      case 13: return false; // complete via submit
      case 14: return false;
      default: return false;
    }
  };

  const canAdvance = useMemo(() => {
    if (i === 2) return topicsCompleted.size >= CONFIDENTIAL_TOPICS.length;
    if (i === 4) return Object.keys(kc1Answers).length === KC1.length;
    if (i === 8) return Object.keys(kc2Answers).length === KC2.length;
    if (i === 9) return consequencesViewed.size >= CONSEQUENCE_TOPICS.length;
    if (i === 11) return Object.keys(kc3Answers).length === KC3.length;
    if (i === 12) return assessPassed;
    if (i === 13) {
      const sig = sigMode === "draw" ? sigData : typedSig.trim();
      return ack && fullName.trim() && empId.trim() && dept.trim() && !!sig;
    }
    return true;
  }, [i, topicsCompleted, kc1Answers, kc2Answers, kc3Answers, consequencesViewed, assessPassed, ack, fullName, empId, dept, sigData, typedSig, sigMode]);

  const go = (n: number) => {
    if (n < 0 || n > total - 1) return;
    // Prevent jumping ahead past furthest-reached
    if (n > maxIndex + 1) return;
    // Gating on forward moves
    if (n > i && !canAdvance) return;
    setDir(n > i ? 1 : -1);
    setI(n);
    setMaxIndex((m) => Math.max(m, n));
    setDrawerOpen(false);
  };

  const finish = () => {
    const signature = sigMode === "draw" ? sigData : typedSig.trim();
    onComplete({ signature, fullName: fullName.trim(), employeeId: empId.trim(), department: dept.trim() });
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") {
        if (i < total - 1) { if (canAdvance) go(i + 1); }
        else if (canAdvance) finish();
      }
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, canAdvance]);

  const progress = ((i + 1) / total) * 100;

  const roadmapStates = ROADMAP.map((r) => ({
    ...r,
    completed: isSectionComplete(r.id),
    current: r.id === i,
    locked: r.id > maxIndex,
  }));

  const slides: ReactNode[] = [
    <SlideWelcome key="s0" onStart={() => go(1)} />,
    <SlideWhy key="s1" />,
    <SlideWhat key="s2" completed={topicsCompleted} setCompleted={setTopicsCompleted} />,
    <SlideResponsibilities key="s3" />,
    <SlideKnowledgeCheck key="s4" title="Knowledge Check 1" kicker="Reinforce · Chapters 1–3" questions={KC1} answers={kc1Answers} setAnswers={setKc1Answers} onContinue={() => go(5)} />,
    <SlideDosDonts key="s5" />,
    <SlideScenarios key="s6" />,
    <SlideSecurity key="s7" />,
    <SlideKnowledgeCheck key="s8" title="Knowledge Check 2" kicker="Reinforce · Chapters 4–6" questions={KC2} answers={kc2Answers} setAnswers={setKc2Answers} onContinue={() => go(9)} />,
    <SlideConsequencesModule key="s9" viewed={consequencesViewed} setViewed={setConsequencesViewed} />,
    <SlideTakeaways key="s10" badges={badges} />,
    <SlideKnowledgeCheck key="s11" title="Knowledge Check 3" kicker="Final reinforcement" questions={KC3} answers={kc3Answers} setAnswers={setKc3Answers} onContinue={() => go(12)} />,
    <SlideAssessment
      key="s12"
      answers={assessAnswers} setAnswers={setAssessAnswers}
      submitted={assessSubmitted} setSubmitted={setAssessSubmitted}
      score={assessScore} pct={assessPct} passed={assessPassed}
      onContinue={() => go(13)}
      onReviewTraining={() => go(0)}
      onRetake={() => { setAssessAnswers({}); setAssessSubmitted(false); }}
      overallProgress={progress}
    />,
    <SlideAck
      key="s13"
      ack={ack} setAck={setAck}
      fullName={fullName} setFullName={setFullName}
      empId={empId} setEmpId={setEmpId}
      dept={dept} setDept={setDept}
      sigMode={sigMode} setSigMode={setSigMode}
      typedSig={typedSig} setTypedSig={setTypedSig}
      sigRef={sigRef} setSigData={setSigData} sigData={sigData}
    />,
    <SlideCompletionPrompt key="s14" ready={true} onSubmit={finish} />,
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-black backdrop-blur-xl">
        <div className="mx-auto flex max-w-350 items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="grid size-9 place-items-center rounded-lg border border-border bg-white text-charcoal lg:hidden"
              aria-label="Open roadmap"
            >
              <Menu className="size-4" />
            </button>
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="hidden size-9 place-items-center rounded-lg border border-border bg-white text-charcoal lg:grid"
              aria-label="Toggle roadmap"
            >
              <Menu className="size-4" />
            </button>
            {/* <Logo /> in navbar */}
            <div className={`flex items-center gap-2.5 `}>
              <div className="relative grid size-14 place-items-center">
                <img src={logo} alt="PK5 Mining Logo" />
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k) => {
              const B = BADGES[k];
              const earned = badges.has(k);
              return (
                <motion.div
                  key={k}
                  animate={{ scale: earned ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                  className={`grid size-9 place-items-center rounded-full border transition-all ${earned ? "gold-gradient border-transparent text-white shadow-gold" : "border-dashed border-border bg-white text-muted-foreground/40"
                    }`}
                  title={B.label}
                >
                  <B.icon className="size-4" />
                </motion.div>
              );
            })}
          </div>
          <button onClick={onExit} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
            <LogOut className="size-3.5" /> Exit
          </button>
        </div>
      </header>

      {/* Body: sidebar + stage */}
      <div className="mx-auto flex w-full max-w-350 flex-1 gap-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Desktop roadmap sidebar */}
        <aside
          className={`sticky top-19 hidden h-[calc(100vh-140px)] shrink-0 overflow-y-auto rounded-2xl border border-border bg-white/70 backdrop-blur transition-all lg:block ${sidebarOpen ? "w-72" : "w-16"
            }`}
        >
          <RoadmapList
            stops={roadmapStates}
            collapsed={!sidebarOpen}
            onJump={(id) => go(id)}
          />
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm lg:hidden"
                onClick={() => setDrawerOpen(false)}
              />
              <motion.aside
                initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto border-r border-border bg-white lg:hidden"
              >
                <div className="flex items-center justify-between border-b border-border p-4">
                  <div className="font-display text-sm font-extrabold text-charcoal">Training Roadmap</div>
                  <button onClick={() => setDrawerOpen(false)} className="grid size-8 place-items-center rounded-lg hover:bg-muted">
                    <X className="size-4" />
                  </button>
                </div>
                <RoadmapList stops={roadmapStates} collapsed={false} onJump={(id) => go(id)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Slide stage */}
        <main className="min-w-0 flex-1">
          <div className="relative">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {slides[i]}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Bottom nav */}
      <nav className="sticky bottom-0 z-30 border-t border-border/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-350 items-center gap-4 px-4 py-3.5 sm:px-6">
          <Button variant="outline" size="sm" onClick={() => go(i - 1)} disabled={i === 0}>
            <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-charcoal truncate">
                {i + 1}. {ROADMAP[i]?.label} <span className="text-muted-foreground">· {i + 1} of {total}</span>
              </span>
              <span className="font-mono font-semibold text-gold">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div className="h-full gold-gradient" initial={false} animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
            </div>
          </div>

          {i < total - 1 ? (
            <Button size="sm" onClick={() => go(i + 1)} disabled={!canAdvance}>
              <span className="hidden sm:inline">Next</span> <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={finish} disabled={!canAdvance}>
              <Check className="size-4" /> <span className="hidden sm:inline">Complete</span>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Roadmap list                                                              */
/* -------------------------------------------------------------------------- */

function RoadmapList({
  stops, collapsed, onJump,
}: {
  stops: (RoadmapStop & { completed: boolean; current: boolean; locked: boolean })[];
  collapsed: boolean;
  onJump: (id: number) => void;
}) {
  return (
    <div className="p-3">
      {!collapsed && (
        <div className="mb-3 px-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-dark">Roadmap</div>
          <div className="mt-0.5 font-display text-sm font-extrabold text-charcoal">Your learning journey</div>
        </div>
      )}
      <ol className="space-y-1">
        {stops.map((s) => {
          const disabled = s.locked;
          const state = s.current ? "current" : s.completed ? "done" : s.locked ? "locked" : "open";
          return (
            <li key={s.id}>
              <button
                onClick={() => !disabled && onJump(s.id)}
                disabled={disabled}
                title={s.label}
                className={`group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition-all ${state === "current" ? "bg-primary-soft ring-1 ring-gold/40 text-charcoal" :
                  state === "done" ? "text-charcoal hover:bg-muted" :
                    state === "open" ? "text-charcoal hover:bg-muted" :
                      "text-muted-foreground/50 cursor-not-allowed"
                  }`}
              >
                <div className={`grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-all ${state === "current" ? "gold-gradient text-white shadow-gold" :
                  state === "done" ? "bg-success text-white" :
                    state === "locked" ? "bg-muted text-muted-foreground/60" :
                      "border border-border bg-white text-muted-foreground"
                  }`}>
                  {state === "done" ? <Check className="size-3.5" strokeWidth={3} /> :
                    state === "locked" ? <Lock className="size-3" /> :
                      s.id + 1}
                </div>
                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold">{s.label}</div>
                  </div>
                )}
                {!collapsed && state === "current" && <ChevronRight className="size-4 shrink-0 text-gold" />}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Slides                                                                    */
/* -------------------------------------------------------------------------- */

function SlideWelcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <motion.div {...stagger(0)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" /> 7–10 minute training
        </motion.div>
        <motion.h1 {...stagger(0.05)} className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-charcoal sm:text-5xl md:text-6xl">
          Welcome to <span className="text-gold-gradient">PK5 Mining</span> Confidentiality Training
        </motion.h1>
        <motion.p {...stagger(0.15)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Protecting confidential information is everyone's responsibility. This interactive walkthrough
          guides you through what matters most — one clear step at a time.
        </motion.p>
        <motion.div {...stagger(0.25)} className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onStart}>Start training <ArrowRight className="size-4" /></Button>
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
        <div className="relative flex h-full items-center justify-center rounded-[32px] border border-border bg-white shadow-elevated">
          <ShieldIllustration />
        </div>
      </motion.div>
    </div>
  );
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-4/5 w-4/5">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.79 0.13 82)" />
          <stop offset="1" stopColor="oklch(0.62 0.14 72)" />
        </linearGradient>
      </defs>
      <motion.circle cx="200" cy="200" r="150" fill="oklch(0.97 0.03 82)" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }} />
      <motion.path d="M200 90 L290 130 V210 C290 265 250 300 200 315 C150 300 110 265 110 210 V130 Z" fill="url(#g1)" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} />
      <motion.path d="M170 200 L192 222 L235 175" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.6 }} />
    </svg>
  );
}

function SlideWhy() {
  const points = [
    { icon: Building2, text: "Protect company assets", detail: "Our data, systems and operations are competitive advantages worth protecting." },
    { icon: Users, text: "Protect employees", detail: "Personal and safety information belongs only to authorised people." },
    { icon: UserCircle, text: "Protect clients", detail: "Client trust is built on our ability to handle their information responsibly." },
    { icon: Heart, text: "Maintain trust", detail: "Trust from partners, communities and colleagues takes years to build and moments to lose." },
    { icon: Scale, text: "Meet legal obligations", detail: "Confidentiality is not optional — it's built into law and every contract we sign." },
  ];
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2">
      <div>
        <SlideHead kicker="Chapter 1" title="Why confidentiality matters" sub="In a mining company, confidential information is any information that isn't public yet and would cause harm — competitive, financial, legal, safety, or reputational if the wrong person got hold of it.  Confidentiality safeguards every part of our business and everyone in it." />
        <div className="space-y-3">
          {points.map((p, i) => (
            <motion.div key={p.text}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-gold-dark">
                <p.icon className="size-5" />
              </div>
              <span className="text-[15px] font-medium text-charcoal">{p.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/30 bg-primary-soft p-4"
        >
          <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-dark" />
          <p className="text-sm font-medium text-charcoal">
            Every employee shares responsibility for protecting confidential information.
          </p>
        </motion.div>
      </div>

      {/* <QuizCard quiz={QUIZ_1} onPass={onQuizPass} passed={badges.has("learner")} /> */}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Guided "What is Confidential Info" module                                 */
/* -------------------------------------------------------------------------- */

function SlideWhat({
  completed, setCompleted,
}: {
  completed: Set<number>;
  setCompleted: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  const [view, setView] = useState<"overview" | number>("overview");
  const [celebrate, setCelebrate] = useState(false);

  const markCompleted = (idx: number) => {
    setCompleted((prev) => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      if (next.size === CONFIDENTIAL_TOPICS.length) {
        setCelebrate(true);
        setTimeout(() => { setCelebrate(false); setView("overview"); }, 1600);
      }
      return next;
    });
  };

  const unlockedThrough = completed.size; // index that is unlocked but not yet completed

  if (view === "overview") {
    return (
      <div>
        <SlideHead kicker="Chapter 2 · Guided Module" title="What is confidential information?" sub="Work through 12 short topics in order. Each unlocks the next." />
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gold-dark">Progress</div>
            <div className="font-display text-lg font-extrabold text-charcoal">
              {completed.size} of {CONFIDENTIAL_TOPICS.length} topics completed
            </div>
          </div>
          <div className="min-w-[180px] flex-1 sm:max-w-xs">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full gold-gradient"
                initial={false}
                animate={{ width: `${(completed.size / CONFIDENTIAL_TOPICS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CONFIDENTIAL_TOPICS.map((t, idx) => {
            const done = completed.has(idx);
            const unlocked = idx <= unlockedThrough;
            return (
              <motion.button
                key={t.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.03 }}
                whileHover={unlocked ? { y: -2 } : {}}
                onClick={() => unlocked && setView(idx)}
                disabled={!unlocked}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-soft transition-all ${done ? "border-gold/60 bg-primary-soft ring-1 ring-gold/40" :
                  unlocked ? "border-border bg-white hover:border-gold/50 hover:shadow-elevated" :
                    "border-border bg-muted/40 cursor-not-allowed"
                  }`}
              >
                {done && (
                  <div className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-success text-white shadow-sm">
                    <Check className="size-3.5" strokeWidth={3} />
                  </div>
                )}
                {!unlocked && (
                  <div className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-muted text-muted-foreground/60">
                    <Lock className="size-3" />
                  </div>
                )}
                <div className={`mb-3 grid size-11 place-items-center rounded-xl transition-all ${done ? "gold-gradient text-white shadow-gold" :
                  unlocked ? "bg-primary-soft text-gold-dark group-hover:gold-gradient group-hover:text-white" :
                    "bg-muted text-muted-foreground/50"
                  }`}>
                  <t.icon className="size-5" />
                </div>
                <div className={`font-display text-sm font-bold ${unlocked ? "text-charcoal" : "text-muted-foreground/60"}`}>{t.title}</div>
                <div className={`mt-0.5 text-xs ${unlocked ? "text-muted-foreground" : "text-muted-foreground/50"}`}>{t.short}</div>
                {done && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    <Check className="size-2.5" strokeWidth={3} /> Completed
                  </div>
                )}
                {!done && unlocked && idx === unlockedThrough && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    Start here
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {celebrate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 grid place-items-center bg-charcoal/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 20 }} animate={{ y: 0 }}
                className="flex flex-col items-center gap-3 rounded-3xl bg-white p-8 shadow-elevated"
              >
                <div className="grid size-16 place-items-center rounded-full gold-gradient text-white shadow-gold">
                  <PartyPopper className="size-8" />
                </div>
                <div className="font-display text-2xl font-extrabold text-charcoal">All 12 topics completed!</div>
                <div className="text-sm text-muted-foreground">Module complete — you can continue.</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Detail view
  const idx = view;
  const t = CONFIDENTIAL_TOPICS[idx];
  const canPrev = idx > 0;
  const canNext = idx < CONFIDENTIAL_TOPICS.length - 1 && (completed.has(idx) || completed.size > idx);

  const goTopic = (n: number) => {
    if (n < 0 || n > CONFIDENTIAL_TOPICS.length - 1) return;
    if (n > completed.size) return; // locked
    setView(n);
  };

  const pct = (completed.size / CONFIDENTIAL_TOPICS.length) * 100;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setView("overview")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-muted"
        >
          <ArrowLeft className="size-3.5" /> Back to overview
        </button>
        <div className="text-xs font-semibold text-muted-foreground">
          Topic <span className="text-charcoal">{idx + 1}</span> of {CONFIDENTIAL_TOPICS.length}
        </div>
      </div>

      <div className="mb-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full gold-gradient" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
          <span>{Math.round(pct)}% complete</span>
          <span>{CONFIDENTIAL_TOPICS.length - completed.size} topics remaining</span>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border bg-primary-soft/50 p-6 sm:flex-row sm:items-center">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
            <t.icon className="size-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">Confidential topic</div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">{t.title}</h2>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="size-3" /> {t.read}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <SectionLabel>Definition</SectionLabel>
            <p className="text-sm leading-relaxed text-charcoal">{t.definition}</p>
          </div>
          <div>
            <SectionLabel>Why it's confidential</SectionLabel>
            <p className="text-sm leading-relaxed text-charcoal">{t.why}</p>
          </div>
          <div>
            <SectionLabel>Mining-specific examples</SectionLabel>
            <BulletList items={t.examples} />
          </div>
          <div>
            <SectionLabel>Risks if disclosed</SectionLabel>
            <BulletList items={t.risks} tone="warn" />
          </div>
          <div>
            <SectionLabel>Your responsibilities</SectionLabel>
            <BulletList items={t.responsibilities} />
          </div>
          <div>
            <SectionLabel>Best practices</SectionLabel>
            <BulletList items={t.bestPractices} tone="good" />
          </div>
          <div className="md:col-span-2 rounded-2xl border border-gold/30 bg-primary-soft p-4">
            <div className="mb-1 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
              <Sparkles className="size-3" /> Did you know?
            </div>
            <p className="text-sm font-medium text-charcoal">{t.didYouKnow}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-5">
          <Button variant="outline" size="sm" onClick={() => goTopic(idx - 1)} disabled={!canPrev}>
            <ArrowLeft className="size-4" /> Previous topic
          </Button>
          {completed.has(idx) ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-xs font-bold text-[oklch(0.4_0.15_155)]">
              <Check className="size-3.5" strokeWidth={3} /> Completed
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                markCompleted(idx);
                if (idx < CONFIDENTIAL_TOPICS.length - 1) setTimeout(() => setView(idx + 1), 300);
              }}
            >
              Mark complete <Check className="size-4" />
            </Button>
          )}
          <Button size="sm" onClick={() => goTopic(idx + 1)} disabled={!canNext}>
            Next topic <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-dark">{children}</div>;
}

function BulletList({ items, tone = "neutral" }: { items: string[]; tone?: "neutral" | "good" | "warn" }) {
  const dot = tone === "good" ? "bg-success" : tone === "warn" ? "bg-destructive" : "bg-gold";
  return (
    <ul className="space-y-1.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-2 text-sm leading-relaxed text-charcoal">
          <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${dot}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*  Responsibilities accordion                                                */
/* -------------------------------------------------------------------------- */

function SlideResponsibilities() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <SlideHead kicker="Chapter 3" title="Your responsibilities" sub="Tap each item to explore what it means in practice." />
      <div className="space-y-3">
        {RESPONSIBILITIES.map((r, idx) => {
          const isOpen = open === idx;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`overflow-hidden rounded-2xl border shadow-soft transition-colors ${r.critical ? "border-gold/40" : "border-border"
                } ${isOpen ? "bg-white" : "bg-white"}`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : idx)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div className={`grid size-11 shrink-0 place-items-center rounded-xl ${r.critical ? "gold-gradient text-white shadow-gold" : "bg-muted text-charcoal"
                  }`}>
                  <r.icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-semibold leading-snug text-charcoal">{r.title}</div>
                  {r.critical && (
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
                      <AlertTriangle className="size-3" /> Critical
                    </div>
                  )}
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className="size-5 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 border-t border-border bg-[oklch(0.99_0.005_82)] p-5 md:grid-cols-2">
                      <div>
                        <SectionLabel>In detail</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{r.detail}</p>
                      </div>
                      <div>
                        <SectionLabel>Why it matters</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{r.why}</p>
                      </div>
                      <div>
                        <SectionLabel>Best practice</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{r.bestPractice}</p>
                      </div>
                      <div>
                        <SectionLabel>Real workplace example</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal italic">{r.example}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Knowledge Check slide                                                     */
/* -------------------------------------------------------------------------- */

function SlideKnowledgeCheck({
  title, kicker, questions, answers, setAnswers, onContinue,
}: {
  title: string;
  kicker: string;
  questions: KCQuestion[];
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  onContinue: () => void;
}) {
  const [qi, setQi] = useState(0);
  const q = questions[qi];
  const picked = answers[qi];
  const answered = picked !== undefined;
  const correct = answered && picked === q.correct;
  const done = Object.keys(answers).length === questions.length;

  const select = (oi: number) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  const encouragement = correct
    ? ["Correct! Great job.", "Nailed it!", "Exactly right.", "Correct — well done."][qi % 4]
    : "Almost there. Here's the correct answer.";

  return (
    <div className="mx-auto max-w-3xl">
      <SlideHead kicker={kicker} title={title} sub="A short reinforcement check — not scored. Take your time." />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 font-medium text-muted-foreground">
          {q.type === "tf" ? "True or False" : q.type === "scenario" ? "Scenario" : "Multiple choice"}
        </div>
        <div className="font-semibold text-charcoal">
          Question {qi + 1} <span className="text-muted-foreground">of {questions.length}</span>
        </div>
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full gold-gradient" initial={false} animate={{ width: `${((qi + 1) / questions.length) * 100}%` }} transition={{ duration: 0.35 }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qi}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="p-6 sm:p-8">
            <div className="mb-6 font-display text-xl font-extrabold leading-snug text-charcoal sm:text-2xl">
              {q.q}
            </div>
            <div className="space-y-2.5">
              {q.options.map((o, oi) => {
                const isPicked = picked === oi;
                const good = answered && oi === q.correct;
                const bad = answered && isPicked && oi !== q.correct;
                return (
                  <button
                    key={o}
                    onClick={() => select(oi)}
                    disabled={answered}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${good ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" :
                      bad ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive" :
                        isPicked ? "border-gold bg-primary-soft text-charcoal" :
                          "border-border bg-white text-charcoal hover:border-gold/50"
                      }`}
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${good ? "border-success bg-success text-white" :
                      bad ? "border-destructive bg-destructive text-white" :
                        isPicked ? "border-transparent gold-gradient text-white shadow-gold" :
                          "border-border text-muted-foreground"
                      }`}>
                      {good ? <Check className="size-3.5" strokeWidth={3} /> :
                        bad ? <X className="size-3.5" strokeWidth={3} /> :
                          String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{o}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 flex items-start gap-3 rounded-xl p-4 text-sm ${correct ? "bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" : "bg-primary-soft text-charcoal"
                    }`}
                >
                  {correct ? <Sparkles className="mt-0.5 size-4 shrink-0" /> : <RotateCw className="mt-0.5 size-4 shrink-0" />}
                  <div>
                    <div className="font-semibold">{encouragement}</div>
                    <div className="mt-0.5 text-xs opacity-90">{q.explain}</div>
                    {!correct && (
                      <div className="mt-1 text-xs">
                        Correct answer: <span className="font-semibold">{q.options[q.correct]}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => setQi(Math.max(0, qi - 1))} disabled={qi === 0}>
          <ArrowLeft className="size-4" /> Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setQi(idx)}
              aria-label={`Go to question ${idx + 1}`}
              className={`size-2 rounded-full transition-all ${idx === qi ? "w-6 gold-gradient" : answers[idx] !== undefined ? "bg-gold/40" : "bg-border"
                }`}
            />
          ))}
        </div>
        {qi < questions.length - 1 ? (
          <Button size="sm" onClick={() => setQi(qi + 1)} disabled={!answered}>
            Next <ArrowRight className="size-4" />
          </Button>
        ) : done ? (
          <Button size="sm" onClick={onContinue}>
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button size="sm" disabled>
            Continue <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Do's & Don'ts / Scenarios / Security                                      */
/* -------------------------------------------------------------------------- */

function SlideDosDonts() {
  return (
    <div>
      <SlideHead kicker="Chapter 4" title="Do's & Don'ts" sub="Small habits, big impact. Keep this list top of mind." />
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
              <motion.li key={d}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
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
              <motion.li key={d}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
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

function SlideScenarios() {
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
      <SlideHead kicker="Chapter 5" title="Real-life scenarios" sub="Tap each choice to see which action protects PK5 Mining." />
      <div className="grid gap-4 lg:grid-cols-3">
        {SCENARIOS.map((s, i) => <ScenarioCard key={i} {...s} delay={i * 0.1} />)}
      </div>
    </div>
  );
}

function ScenarioCard({
  q, options, explain, delay,
}: {
  q: string;
  options: { text: string; correct: boolean }[];
  explain: string;
  delay: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + delay }}
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
              className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${good ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" :
                bad ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive" :
                  "border-border bg-white text-charcoal hover:border-gold/50"
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
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden text-xs leading-relaxed text-muted-foreground"
          >
            <div className="rounded-lg bg-muted p-3">{explain}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideSecurity() {
  return (
    <div>
      <SlideHead kicker="Chapter 6" title="Data security best practices" sub="Six habits that meaningfully reduce risk — every day." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECURITY.map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
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

/* -------------------------------------------------------------------------- */
/*  Consequences module                                                       */
/* -------------------------------------------------------------------------- */

function SlideConsequencesModule({
  viewed, setViewed,
}: {
  viewed: Set<number>;
  setViewed: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
  const [view, setView] = useState<"overview" | number>("overview");

  const markViewed = (idx: number) => {
    setViewed((prev) => {
      if (prev.has(idx)) return prev;
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  if (view === "overview") {
    return (
      <div>
        <SlideHead kicker="Chapter 7 · Interactive Module" title="Consequences of confidentiality breaches" sub="Explore each consequence — in any order. All 10 must be viewed to continue." />

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gold-dark">Progress</div>
            <div className="font-display text-lg font-extrabold text-charcoal">
              {viewed.size} of {CONSEQUENCE_TOPICS.length} consequences explored
            </div>
          </div>
          <div className="min-w-[180px] flex-1 sm:max-w-xs">
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full gold-gradient"
                initial={false}
                animate={{ width: `${(viewed.size / CONSEQUENCE_TOPICS.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CONSEQUENCE_TOPICS.map((c, idx) => {
            const done = viewed.has(idx);
            return (
              <motion.button
                key={c.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.03 }}
                onClick={() => { markViewed(idx); setView(idx); }}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated ${done ? "border-gold/60 bg-primary-soft ring-1 ring-gold/40" : "border-border bg-white hover:border-gold/50"
                  }`}
              >
                {done && (
                  <div className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-success text-white shadow-sm">
                    <Check className="size-3.5" strokeWidth={3} />
                  </div>
                )}
                <div className="absolute inset-x-0 top-0 h-0.5 gold-gradient" />
                <div className={`mb-3 grid size-10 place-items-center rounded-xl ${done ? "gold-gradient text-white shadow-gold" : "bg-primary-soft text-gold-dark group-hover:gold-gradient group-hover:text-white transition-all"
                  }`}>
                  <c.icon className="size-5" />
                </div>
                <div className="font-display text-sm font-bold text-charcoal">{c.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{c.short}</div>
                {done && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    <Eye className="size-2.5" /> Viewed
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  const idx = view;
  const c = CONSEQUENCE_TOPICS[idx];
  const pct = (viewed.size / CONSEQUENCE_TOPICS.length) * 100;

  const goTopic = (n: number) => {
    if (n < 0 || n > CONSEQUENCE_TOPICS.length - 1) return;
    markViewed(n);
    setView(n);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setView("overview")}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-muted"
        >
          <ArrowLeft className="size-3.5" /> Back to overview
        </button>
        <div className="text-xs font-semibold text-muted-foreground">
          Consequence <span className="text-charcoal">{idx + 1}</span> of {CONSEQUENCE_TOPICS.length}
        </div>
      </div>

      <div className="mb-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div className="h-full gold-gradient" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">{viewed.size} of {CONSEQUENCE_TOPICS.length} explored</div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border bg-primary-soft/50 p-6 sm:flex-row sm:items-center">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
            <c.icon className="size-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">Consequence</div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">{c.title}</h2>
            <div className="mt-1 text-xs text-muted-foreground">{c.short}</div>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <SectionLabel>What happens</SectionLabel>
            <p className="text-sm leading-relaxed text-charcoal">{c.explanation}</p>
          </div>
          <div>
            <SectionLabel>Mining-related example</SectionLabel>
            <p className="text-sm leading-relaxed italic text-charcoal">{c.miningExample}</p>
          </div>
          <div>
            <SectionLabel>Business impact</SectionLabel>
            <p className="text-sm leading-relaxed text-charcoal">{c.businessImpact}</p>
          </div>
          <div>
            <SectionLabel>Employee impact</SectionLabel>
            <p className="text-sm leading-relaxed text-charcoal">{c.employeeImpact}</p>
          </div>
          <div>
            <SectionLabel>Prevention strategies</SectionLabel>
            <BulletList items={c.prevention} tone="good" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-5">
          <Button variant="outline" size="sm" onClick={() => goTopic(idx - 1)} disabled={idx === 0}>
            <ArrowLeft className="size-4" /> Previous
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold-dark">
            <Eye className="size-3.5" /> Viewed
          </div>
          <Button size="sm" onClick={() => goTopic(idx + 1)} disabled={idx === CONSEQUENCE_TOPICS.length - 1}>
            Next <ArrowRight className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Takeaways                                                                 */
/* -------------------------------------------------------------------------- */

function SlideTakeaways({ badges }: { badges: Set<BadgeKey> }) {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2">
      <div>
        <SlideHead kicker="Wrap up" title="Key takeaways" sub="Five principles to carry with you — every shift, every screen, every conversation." />
        <ul className="space-y-3">
          {TAKEAWAYS.map((t, i) => (
            <motion.li key={t}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
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
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gold-dark">Your badges</div>
          <div className="mb-5 font-display text-xl font-extrabold text-charcoal">
            {badges.size} of 3 earned
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k, i) => {
              const B = BADGES[k];
              const earned = badges.has(k);
              return (
                <motion.div key={k}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`flex flex-col items-center rounded-2xl border p-4 text-center ${earned ? "border-gold/40 bg-primary-soft" : "border-dashed border-border bg-white/50"
                    }`}
                >
                  <div className={`mb-2 grid size-14 place-items-center rounded-2xl ${earned ? "gold-gradient text-white shadow-gold" : "bg-muted text-muted-foreground/50"
                    }`}>
                    <B.icon className="size-6" />
                  </div>
                  <div className={`text-xs font-bold ${earned ? "text-charcoal" : "text-muted-foreground/60"}`}>
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

/* -------------------------------------------------------------------------- */
/*  Final Assessment                                                          */
/* -------------------------------------------------------------------------- */

function SlideAssessment({
  answers, setAnswers, submitted, setSubmitted,
  score, pct, passed,
  onContinue, onReviewTraining, onRetake, overallProgress,
}: {
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  pct: number;
  passed: boolean;
  onContinue: () => void;
  onReviewTraining: () => void;
  onRetake: () => void;
  overallProgress: number;
}) {
  const [qi, setQi] = useState(0);
  const total = ASSESSMENT.length;
  const q = ASSESSMENT[qi];
  const picked = answers[qi];
  const hasPicked = picked !== undefined;
  const isLast = qi === total - 1;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  const select = (oi: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [qi]: oi });
  };

  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl">
        <SlideHead
          kicker="Final Assessment"
          title={passed ? "Assessment passed" : "Almost there"}
          sub={passed
            ? "You've demonstrated a strong understanding of PK5 Mining's confidentiality standards."
            : "You have not achieved the required passing score. Please review the training content and try the assessment again."}
        />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <Card className="overflow-hidden">
            <div className={`relative flex flex-col items-center gap-2 p-8 text-center ${passed ? "bg-[oklch(0.97_0.06_155)]" : "bg-primary-soft"}`}>
              <motion.div
                initial={{ scale: 0, rotate: passed ? -180 : 0 }}
                animate={{ scale: 1, rotate: 0, x: passed ? 0 : [0, -6, 6, -4, 4, 0] }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                className={`grid size-16 place-items-center rounded-full text-white shadow-gold ${passed ? "bg-success" : "gold-gradient"}`}
              >
                {passed ? <CheckCircle2 className="size-9" strokeWidth={2.5} /> : <RotateCw className="size-8" strokeWidth={2.5} />}
              </motion.div>
              <div className="font-display text-5xl font-extrabold tracking-tight text-charcoal">{pct}%</div>
              <div className="text-sm font-medium text-charcoal/80">
                {score} of {total} correct · {passed ? "Passed" : "Did not pass"} (80% required)
              </div>
              <div className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${passed ? "bg-success text-white" : "bg-charcoal text-white"}`}>
                {passed ? <><ShieldCheck className="size-3" /> Confidentiality Confirmed</> : <><AlertTriangle className="size-3" /> Review Required</>}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-dark">Question review</div>
              <div className="space-y-2">
                {ASSESSMENT.map((qq, idx) => {
                  const correct = answers[idx] === qq.correct;
                  return (
                    <div key={idx} className="flex items-start gap-3 rounded-xl border border-border bg-white p-3 text-sm">
                      <div className={`grid size-6 shrink-0 place-items-center rounded-full ${correct ? "bg-success text-white" : "bg-destructive text-white"}`}>
                        {correct ? <Check className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={3} />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-charcoal">Q{idx + 1}. {qq.q}</div>
                        {!correct && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Correct answer: <span className="font-medium text-charcoal">{qq.options[qq.correct]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                {passed ? (
                  <Button size="lg" onClick={onContinue}>
                    Continue to Acknowledgement <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={onReviewTraining}>
                      <ArrowLeft className="size-4" /> Review Training
                    </Button>
                    <Button onClick={onRetake}>
                      <RotateCw className="size-4" /> Retake Assessment
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const innerPct = (answeredCount / total) * 100;

  return (
    <div className="mx-auto max-w-3xl">
      <SlideHead
        kicker="Final Assessment"
        title="Final Assessment"
        sub="Complete this short assessment to confirm your understanding before acknowledging the confidentiality policy."
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-gold" /> Estimated 2–3 minutes
        </div>
        <div className="font-semibold text-charcoal">
          Question {qi + 1} <span className="text-muted-foreground">of {total}</span>
        </div>
      </div>

      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full gold-gradient" initial={false} animate={{ width: `${innerPct}%` }} transition={{ duration: 0.35 }} />
      </div>
      <div className="mb-6 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{answeredCount} answered</span>
        <span className="font-mono">Overall training progress · {Math.round(overallProgress)}%</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={qi} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <Card className="p-6 sm:p-8">
            <div className="mb-6 font-display text-xl font-extrabold leading-snug text-charcoal sm:text-2xl">{q.q}</div>
            <div className="space-y-2.5">
              {q.options.map((o, oi) => {
                const isPicked = picked === oi;
                return (
                  <button
                    key={o}
                    onClick={() => select(oi)}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left text-[15px] font-medium transition-all ${isPicked ? "border-gold bg-primary-soft text-charcoal shadow-soft" :
                      "border-border bg-white text-charcoal hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-soft"
                      }`}
                    aria-pressed={isPicked}
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${isPicked ? "border-transparent gold-gradient text-white shadow-gold" : "border-border text-muted-foreground"}`}>
                      {isPicked ? <Check className="size-3.5" strokeWidth={3} /> : String.fromCharCode(65 + oi)}
                    </span>
                    <span className="flex-1">{o}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => setQi(Math.max(0, qi - 1))} disabled={qi === 0}>
          <ArrowLeft className="size-4" /> Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {ASSESSMENT.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setQi(idx)}
              aria-label={`Go to question ${idx + 1}`}
              className={`size-2 rounded-full transition-all ${idx === qi ? "w-6 gold-gradient" : answers[idx] !== undefined ? "bg-gold/40" : "bg-border"}`}
            />
          ))}
        </div>
        {isLast ? (
          <Button size="sm" onClick={submit} disabled={!allAnswered}>
            <Check className="size-4" /> Submit Assessment
          </Button>
        ) : (
          <Button size="sm" onClick={() => setQi(qi + 1)} disabled={!hasPicked}>
            Next <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Acknowledgement                                                           */
/* -------------------------------------------------------------------------- */

function SlideAck(props: {
  ack: boolean; setAck: (b: boolean) => void;
  fullName: string; setFullName: (s: string) => void;
  empId: string; setEmpId: (s: string) => void;
  dept: string; setDept: (s: string) => void;
  sigMode: "draw" | "type"; setSigMode: (m: "draw" | "type") => void;
  typedSig: string; setTypedSig: (s: string) => void;
  sigRef: React.RefObject<SignatureCanvas | null>;
  setSigData: (s: string) => void;
  sigData: string;
}) {
  const {
    ack, setAck, fullName, setFullName, empId, setEmpId, dept, setDept,
    sigMode, setSigMode, typedSig, setTypedSig, sigRef, setSigData,
  } = props;
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const clearSig = () => { sigRef.current?.clear(); setSigData(""); };
  const captureSig = () => {
    const c = sigRef.current;
    if (!c || c.isEmpty()) { setSigData(""); return; }
    setSigData(c.toDataURL("image/png"));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <SlideHead kicker="Final step" title="Acknowledgement & signature" sub="Confirm your understanding and sign to complete the training." />

      <Card className="overflow-hidden">
        <div className="border-b border-border bg-primary-soft/50 p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <div className="pt-0.5">
              <Checkbox checked={ack} onChange={setAck} />
            </div>
            <span className="text-sm font-medium leading-relaxed text-charcoal">
              I acknowledge that I have completed the PK5 Mining Confidentiality Training and understand my
              responsibility to protect confidential company information.
            </span>
          </label>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <Field label="Full Name" value={fullName} onChange={setFullName} placeholder="Jane Doe" />
          <Field label="Employee ID" value={empId} onChange={setEmpId} placeholder="PK-4821" />
          <Field label="Department" value={dept} onChange={setDept} placeholder="Operations" />
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-charcoal">Date</span>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-border bg-muted px-3.5 text-sm text-charcoal">
              {today}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-charcoal">Signature</span>
            <div className="inline-flex rounded-lg bg-muted p-1">
              {(["draw", "type"] as const).map((m) => (
                <button key={m}
                  onClick={() => setSigMode(m)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all ${sigMode === m ? "bg-white text-charcoal shadow-sm" : "text-muted-foreground"
                    }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {sigMode === "draw" ? (
            <div className="relative rounded-xl border border-dashed border-border bg-[oklch(0.99_0.005_82)]">
              <SignatureCanvas
                ref={sigRef}
                onEnd={captureSig}
                penColor="#1A1A1A"
                canvasProps={{ className: "h-40 w-full rounded-xl" }}
              />
              <button type="button" onClick={clearSig}
                className="absolute right-2 top-2 rounded-md bg-white px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm hover:text-charcoal"
              >
                Clear
              </button>
              {!props.sigData && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-muted-foreground/70">
                  Draw your signature here
                </div>
              )}
            </div>
          ) : (
            <input
              value={typedSig}
              onChange={(e) => setTypedSig(e.target.value)}
              placeholder="Type your full name"
              className="h-24 w-full rounded-xl border border-dashed border-border bg-[oklch(0.99_0.005_82)] px-4 text-center font-[cursive] text-3xl text-charcoal outline-none focus:border-gold"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            />
          )}
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By signing, you agree that this record constitutes your legal acknowledgement.
      </p>
    </div>
  );
}

function SlideCompletionPrompt({ ready, onSubmit }: { ready: boolean; onSubmit: () => void }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <SlideHead kicker="Ready to submit" title="Submit your training record" sub="You're one click away from completing your PK5 Mining Confidentiality Training." />
      <Card className="p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 grid size-16 place-items-center rounded-full gold-gradient text-white shadow-gold"
        >
          <ShieldCheck className="size-8" />
        </motion.div>
        <p className="text-sm leading-relaxed text-charcoal">
          Click below to submit your acknowledgement and signature. Your completion will be recorded.
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

/* -------------------------------------------------------------------------- */
/*  Completion                                                                */
/* -------------------------------------------------------------------------- */

function Completion({
  data, onContinue, onRestart, onExit,
}: {
  data: { signature: string; fullName: string; employeeId: string; department: string };
  onContinue: () => void;
  onRestart: () => void;
  onExit: () => void;
}) {
  const [confetti, setConfetti] = useState<{ x: number; y: number; c: string; r: number }[]>([]);
  useEffect(() => {
    const colors = ["#C89B3C", "#1A1A1A", "#E8C36B", "#F5E6C3"];
    setConfetti(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        c: colors[Math.floor(Math.random() * colors.length)],
        r: Math.random() * 360,
      }))
    );
  }, []);

  const downloadCert = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Certificate — ${data.fullName}</title>
      <style>
        body { font-family: 'Helvetica Neue', sans-serif; margin: 0; padding: 60px; color: #1A1A1A; }
        .cert { border: 12px double #C89B3C; padding: 60px; text-align: center; }
        h1 { font-size: 42px; margin: 0 0 8px; letter-spacing: -1px; }
        .k { color: #C89B3C; text-transform: uppercase; letter-spacing: 3px; font-size: 12px; }
        .name { font-size: 48px; margin: 30px 0 10px; }
        .meta { color: #666; font-size: 14px; }
        .sig { margin-top: 60px; }
        img { max-height: 80px; }
      </style></head><body><div class="cert">
        <div class="k">PK5 Mining</div>
        <h1>Certificate of Completion</h1>
        <p class="meta">This certifies that</p>
        <div class="name">${data.fullName}</div>
        <p class="meta">Employee ID ${data.employeeId} · ${data.department}</p>
        <p style="margin-top:30px; font-size:18px;">has successfully completed the<br><strong>Confidentiality Training Program</strong></p>
        <div class="sig">
          ${data.signature.startsWith("data:") ? `<img src="${data.signature}" />` : `<div style="font-family:'Brush Script MT',cursive;font-size:36px">${data.signature}</div>`}
          <div style="border-top:1px solid #1A1A1A; width:260px; margin:8px auto 0; padding-top:6px; font-size:12px;">Signature · ${new Date().toLocaleDateString()}</div>
        </div>
      </div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PK5-Confidentiality-Certificate-${data.employeeId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <motion.div
            key={i}
            initial={{ x: `${c.x}vw`, y: `${c.y}vh`, rotate: c.r, opacity: 1 }}
            animate={{ y: "110vh", rotate: c.r + 360 }}
            transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeIn" }}
            className="absolute size-2 rounded-sm"
            style={{ backgroundColor: c.c }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-6 grid size-24 place-items-center rounded-full gold-gradient shadow-gold"
        >
          <CheckCircle2 className="size-12 text-white" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl"
        >
          Training completed <span className="text-gold-gradient">successfully</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Thank you, <span className="font-semibold text-charcoal">{data.fullName}</span>, for
          completing the PK5 Mining Confidentiality Training. Your acknowledgement and digital
          signature have been recorded.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
              <Award className="size-3" /> Completion badge earned
            </div>
            <div className="flex items-center justify-center gap-6">
              {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k, i) => {
                const B = BADGES[k];
                return (
                  <motion.div key={k}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 300, damping: 18 }}
                    className="flex flex-col items-center"
                  >
                    <div className="grid size-16 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
                      <B.icon className="size-7" />
                    </div>
                    <div className="mt-2 text-[11px] font-semibold text-charcoal">{B.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={downloadCert}>
            <Download className="size-4" /> Download certificate
          </Button>
          <Button size="lg" variant="outline" onClick={onContinue}>
            Continue <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="ghost" onClick={onRestart}>
            <RotateCw className="size-4" /> Restart
          </Button>
          <Button size="lg" variant="ghost" onClick={onExit}>
            <LogOut className="size-4" /> Exit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Thank You                                                                 */
/* -------------------------------------------------------------------------- */

function ThankYou({
  data, onDashboard, onExit,
}: {
  data: { fullName: string };
  onDashboard: () => void;
  onExit: () => void;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 15% 20%, oklch(0.9 0.15 82 / 0.15) 0, transparent 50%), radial-gradient(circle at 85% 80%, oklch(0.8 0.15 82 / 0.12) 0, transparent 45%)",
      }} />

      {/* Gold accent lines */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 top-24 h-px w-full origin-left gold-gradient opacity-40"
      />
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-24 right-0 h-px w-full origin-right gold-gradient opacity-40"
      />

      <div className="relative w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-center"
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }}
          className="mx-auto mb-6 grid size-24 place-items-center rounded-full gold-gradient shadow-gold"
        >
          <Award className="size-12 text-white" strokeWidth={2.2} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-dark"
        >
          <ShieldCheck className="size-3" /> Confidentiality Champion
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="font-display text-5xl font-extrabold tracking-tight text-charcoal sm:text-6xl"
        >
          Thank <span className="text-gold-gradient">You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Thank you, <span className="font-semibold text-charcoal">{data.fullName}</span>, for
          completing the PK5 Mining Confidentiality Training. By protecting confidential
          information, you help safeguard our people, our operations, our partners, and our future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
          className="mx-auto mt-8 max-w-md"
        >
          <ShieldIllustration />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Compass className="size-3.5 text-gold" />
          PK5 Mining © {new Date().getFullYear()} · Confidentiality Program
        </motion.div>
      </div>
    </div>
  );
}
