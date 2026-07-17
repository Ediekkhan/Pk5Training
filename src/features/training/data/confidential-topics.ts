import type { ComponentType } from "react";
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

export type IconType = ComponentType<{ className?: string }>;

export type ConfidentialTopic = {
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

export const CONFIDENTIAL_TOPICS: ConfidentialTopic[] = [
  {
    icon: Map,
    title: "Geological Data",
    short: "Exploration & survey findings",
    definition:
      "Data from exploration, drilling, sampling and geological surveys that reveals the location, grade or extent of mineral deposits.",
    why: "It is the foundation of PK5 Mining's competitive edge. Leaked survey results can move markets and enable competitors to stake nearby ground.",
    examples: [
      "Drill core assay results",
      "Ore body models & resource estimates",
      "Unpublished exploration maps",
    ],
    risks: ["Loss of competitive advantage", "Land-claim disputes", "Insider trading exposure"],
    responsibilities: [
      "Store data on approved systems only",
      "Only share with permit-cleared teams",
      "Verify recipients before any transfer",
    ],
    bestPractices: [
      "Encrypt all geological files",
      "Use watermarking on shared reports",
      "Log every export request",
    ],
    didYouKnow:
      "A single leaked assay result has, in the industry, moved competitor share prices by more than 20% overnight.",
    read: "~40s read",
  },
  {
    icon: FileText,
    title: "Mining Reports",
    short: "Operational documentation",
    definition:
      "Internal reports covering production, safety, environmental performance and site operations.",
    why: "They contain non-public operational detail that could be misused by competitors, activists, or bad actors.",
    examples: [
      "Daily production summaries",
      "Shift-by-shift safety logs",
      "Environmental compliance reports",
    ],
    risks: ["Regulatory scrutiny", "Media misinterpretation", "Community trust damage"],
    responsibilities: [
      "Distribute reports on a need-to-know basis",
      "Never email reports to personal accounts",
      "Return printed copies to secure storage",
    ],
    bestPractices: [
      "Use the report portal instead of email",
      "Mark drafts 'Confidential — Draft'",
      "Purge outdated reports responsibly",
    ],
    didYouKnow: "Regulators may request historical reports up to 7 years after they were filed.",
    read: "~35s read",
  },
  {
    icon: DollarSign,
    title: "Financial Records",
    short: "Revenue, costs, forecasts",
    definition:
      "Management accounts, forecasts, unit costs, tax positions and any information that materially affects PK5 Mining's financial picture.",
    why: "Premature or selective disclosure can breach securities laws and undermine investor confidence.",
    examples: [
      "Quarterly earnings before release",
      "Cost-per-tonne breakdowns",
      "Capital expenditure plans",
    ],
    risks: ["Insider trading violations", "Loss of investor trust", "Regulatory sanctions"],
    responsibilities: [
      "Never discuss unreleased figures externally",
      "Route enquiries to Investor Relations",
      "Treat forecasts as strictly confidential",
    ],
    bestPractices: [
      "Follow the disclosure calendar",
      "Use blackout periods responsibly",
      "Escalate leaks immediately",
    ],
    didYouKnow:
      "Even a casual mention of unreleased earnings can constitute a material disclosure.",
    read: "~35s read",
  },
  {
    icon: Users,
    title: "Employee Information",
    short: "HR & personal data",
    definition:
      "Personal data, contracts, compensation, performance reviews and health information relating to employees.",
    why: "Employees trust PK5 Mining to safeguard their personal data — and privacy law requires it.",
    examples: [
      "Salary and benefit details",
      "Medical or safety incident records",
      "Performance reviews",
    ],
    risks: ["Privacy law breach & fines", "Erosion of employee trust", "Reputational damage"],
    responsibilities: [
      "Access only what your role requires",
      "Never share HR data casually",
      "Report exposed records immediately",
    ],
    bestPractices: [
      "Use role-based access",
      "Anonymise data where possible",
      "Lock HR files when unattended",
    ],
    didYouKnow:
      "Under most privacy regimes, employee records are protected for the entire employment period plus several years after.",
    read: "~30s read",
  },
  {
    icon: UserCircle,
    title: "Customer Information",
    short: "Client details & history",
    definition:
      "Customer identities, order histories, pricing arrangements and any commercially sensitive dealings.",
    why: "Our clients share information under strict confidentiality expectations, backed by contract.",
    examples: ["Long-term offtake agreements", "Customer-specific pricing", "Purchase forecasts"],
    risks: ["Breach of client contract", "Loss of key accounts", "Litigation"],
    responsibilities: [
      "Verify identity before sharing anything",
      "Use secure client portals",
      "Follow the client data policy",
    ],
    bestPractices: [
      "Log every customer data access",
      "Redact where possible",
      "Never mix customer data across accounts",
    ],
    didYouKnow:
      "Most customer NDAs continue in force for 3–5 years after the commercial relationship ends.",
    read: "~35s read",
  },
  {
    icon: Handshake,
    title: "Contracts",
    short: "Legal agreements",
    definition:
      "All executed and draft agreements with suppliers, customers, partners, contractors and regulators.",
    why: "Contract terms reveal commercial strategy, pricing and obligations that competitors could exploit.",
    examples: ["Joint venture agreements", "Supply and offtake contracts", "Consulting agreements"],
    risks: ["Loss of negotiating leverage", "Contractual disputes", "Regulatory issues"],
    responsibilities: [
      "Route contracts through Legal",
      "Never share drafts externally",
      "Store originals in the contract vault",
    ],
    bestPractices: [
      "Use redlines only in the approved tool",
      "Version-control all drafts",
      "Shred obsolete printed copies",
    ],
    didYouKnow:
      "A single leaked contract clause has, in past cases, cost mining companies millions in re-negotiated terms.",
    read: "~35s read",
  },
  {
    icon: Mail,
    title: "Internal Communications",
    short: "Emails, chats, memos",
    definition:
      "Emails, chat messages, meeting notes and internal memos discussing PK5 Mining's business.",
    why: "Even ordinary conversations often contain non-public detail that could damage the company if shared.",
    examples: ["Executive email threads", "Leadership meeting notes", "Sensitive Slack channels"],
    risks: ["Public misinterpretation", "Regulatory exposure", "Trust breakdown internally"],
    responsibilities: [
      "Treat internal messages as private",
      "Never forward externally",
      "Report accidental sends",
    ],
    bestPractices: [
      "Use company channels only",
      "Avoid confidential detail in subject lines",
      "Be mindful in public spaces",
    ],
    didYouKnow:
      "Screenshots of internal messages are one of the top three sources of confidentiality incidents industry-wide.",
    read: "~30s read",
  },
  {
    icon: Target,
    title: "Business Strategies",
    short: "Plans, roadmaps, initiatives",
    definition:
      "Strategic plans, roadmaps, M&A activity, expansion plans and other forward-looking initiatives.",
    why: "Strategic intent is often more valuable than data — competitors can pre-empt or block our moves.",
    examples: ["Expansion into new regions", "Acquisition targets", "Product or service roadmaps"],
    risks: ["Competitive counter-moves", "Loss of first-mover advantage", "Deal collapse"],
    responsibilities: [
      "Discuss strategy only in trusted rooms",
      "Never post strategy detail publicly",
      "Use code names where required",
    ],
    bestPractices: [
      "Compartmentalise information",
      "Restrict physical printouts",
      "Follow the deal-team protocol",
    ],
    didYouKnow:
      "M&A leaks have derailed roughly 1 in 10 announced deals across the resources sector.",
    read: "~35s read",
  },
  {
    icon: Tag,
    title: "Pricing Information",
    short: "Rate structures & margins",
    definition: "Pricing strategies, margin structures, customer-specific rates and cost bases.",
    why: "Pricing insight allows competitors to undercut us and customers to demand better terms.",
    examples: ["Customer discount schedules", "Tender pricing", "Margin analysis"],
    risks: ["Loss of contracts", "Reduced margins", "Anti-competitive allegations"],
    responsibilities: [
      "Never share pricing outside the deal team",
      "Treat tender data as top-tier confidential",
      "Watch out for social-engineering enquiries",
    ],
    bestPractices: [
      "Use approved quoting tools",
      "Never quote from memory",
      "Verify identity of every enquirer",
    ],
    didYouKnow:
      "Sharing pricing with competitors — even accidentally — can trigger antitrust investigations.",
    read: "~30s read",
  },
  {
    icon: Truck,
    title: "Supplier Agreements",
    short: "Vendor terms & pricing",
    definition:
      "Terms, pricing and performance data covering PK5 Mining's supplier and contractor relationships.",
    why: "Supplier terms reveal our cost base and could damage partner relationships if exposed.",
    examples: ["Master supply agreements", "Contractor rates", "Supplier performance scorecards"],
    risks: ["Higher input costs", "Broken supplier trust", "Contract disputes"],
    responsibilities: [
      "Only share terms with authorised teams",
      "Never discuss supplier rates casually",
      "Use the vendor portal",
    ],
    bestPractices: [
      "Segment supplier data by category",
      "Require NDAs before sharing detail",
      "Archive expired agreements securely",
    ],
    didYouKnow:
      "Suppliers often have contractual audit rights — a leak of their terms can trigger those audits.",
    read: "~30s read",
  },
  {
    icon: FlaskConical,
    title: "Research & Development",
    short: "Innovation & IP",
    definition:
      "Research programs, pilot studies, process innovations, patents in progress and other proprietary IP.",
    why: "R&D is where tomorrow's advantage is built — leaks give it away for free.",
    examples: ["Extraction process trials", "Automation pilots", "Patent applications in progress"],
    risks: ["Loss of patent priority", "Competitor imitation", "Reduced R&D ROI"],
    responsibilities: [
      "Protect research data at all times",
      "Only publish through approved channels",
      "Report suspected IP theft",
    ],
    bestPractices: [
      "Use segregated R&D networks",
      "Require NDAs for all research partners",
      "Log every access to lab data",
    ],
    didYouKnow:
      "In many jurisdictions, public disclosure — even a conference slide — can invalidate a patent.",
    read: "~35s read",
  },
  {
    icon: Building2,
    title: "Company Assets",
    short: "Physical & digital property",
    definition:
      "All physical assets, systems, tooling, code, digital platforms and infrastructure owned by PK5 Mining.",
    why: "Details about our assets — where they are, how they're configured — could be exploited for theft or sabotage.",
    examples: [
      "Site layouts and access schedules",
      "System architecture diagrams",
      "Vehicle & equipment inventories",
    ],
    risks: ["Theft & sabotage", "Cyber intrusion", "Safety incidents"],
    responsibilities: [
      "Never share site or system detail publicly",
      "Report suspicious surveillance",
      "Follow physical security protocols",
    ],
    bestPractices: [
      "Use approved asset registers",
      "Restrict floor plans and diagrams",
      "Escort external visitors at all times",
    ],
    didYouKnow:
      "Publicly posted site photos have been used by criminals to plan resource-sector thefts.",
    read: "~35s read",
  },
];
