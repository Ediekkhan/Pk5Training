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

export type ConsequenceTopic = {
  icon: IconType;
  title: string;
  short: string;
  explanation: string;
  miningExample: string;
  businessImpact: string;
  employeeImpact: string;
  prevention: string[];
};

export const CONSEQUENCE_TOPICS: ConsequenceTopic[] = [
  {
    icon: TrendingDown, title: "Disciplinary Action", short: "Workplace Discipline",
    explanation: "Employees may face disciplinary measures, ranging from formal warnings to termination of employment, depending on the severity of the breach.",
    miningExample: "An employee shares confidential exploration results or internal reports with an unauthorized third party.",
    businessImpact: "Loss of confidential information, reputational damage, and reduced trust within the organization",
    employeeImpact: "Loss of employment, disciplinary records, and reduced future career opportunities.",
    prevention: ["Follow confidentiality policies", "Share information only with authorized personnel", "Report suspected breaches immediately"],
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
    icon: Landmark, title: "Termination of Contractor or Supplier Agreements", short: "Contract Termination",
    explanation: "A contractor's or supplier's agreement may be suspended or terminated if they breach confidentiality obligations.",
    miningExample: "A supplier discloses confidential mine plans or equipment specifications to a competitor without authorization.",
    businessImpact: "Disruption to operations, legal disputes, and increased costs to replace contractors or suppliers.",
    employeeImpact: "Contractors may lose current and future business opportunities with the company.",
    prevention: ["Comply with confidentiality agreements", "Share information only with authorized parties", "Protect sensitive company data at all times"],
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
    icon: TrendingDown, title: "Breach of confidence", short: "Share price & funding impact",
    explanation: "The individual or organization may be held legally responsible for damages resulting from a breach of confidentiality or contractual obligations.",
    miningExample: "A contractor discloses confidential exploration data in violation of a non-disclosure agreement, resulting in legal action for financial losses.",
    businessImpact: "Higher cost of capital, cancelled financings, activist attention.",
    employeeImpact: "Employees or contractors may face legal claims, financial liability, and damage to their professional reputation.",
    prevention: ["Understand and comply with confidentiality agreements", "Handle sensitive information responsibly", "Seek guidance before sharing confidential information"],
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

export const TAKEAWAYS = [
  "Keep information confidential",
  "Follow company policies",
  "Report suspicious activity",
  "Protect company assets",
  "Ask when unsure",
];

/* -------------------------------------------------------------------------- */
/*  Knowledge Check data                                                      */
/* -------------------------------------------------------------------------- */
