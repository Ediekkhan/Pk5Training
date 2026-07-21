import { Handshake, Users, Target, Landmark, Gavel, FlaskConical, Radio, AlertTriangle, DollarSign, Shield, Heart, UserCircle } from "lucide-react";
import { IconType } from "./confidential-topics";

type EffectTopic = {
  icon: IconType;
  title: string;
  short: string;
  explanation: string;
  miningExample: string;
  pk5Impact: string;
  prevention: string[];
  didYouKnow: string;
  readTime: string;
};

const EFFECT_TOPICS: EffectTopic[] = [
  {
    icon: Handshake, title: "Loss of Client Trust", short: "Partners walk away",
    explanation: "When sensitive client information leaks, buyers, offtakers and JV partners lose faith in our ability to safeguard shared data.",
    miningExample: "A leaked offtake term sheet reaches a rival smelter, and the client suspends further discussions with PK5.",
    pk5Impact: "Cancelled contracts, damaged long-term relationships, harder onboarding of new partners.",
    prevention: ["Share commercial terms only with the deal team", "Use approved secure channels for client documents", "Log every external share and expiry"],
    didYouKnow: "81% of B2B buyers say a single confidentiality breach would end the partnership permanently.",
    readTime: "≈ 35 sec read",
  },
  {
    icon: Users, title: "Loss of Employee Trust", short: "Culture erodes internally",
    explanation: "When personal data, salaries or investigation details leak, employees lose confidence that PK5 will protect them.",
    miningExample: "Payroll spreadsheets circulate on WhatsApp after being left on an unlocked laptop at site.",
    pk5Impact: "Spikes in resignations, union disputes, higher recruitment costs, and lower engagement scores.",
    prevention: ["Lock devices when unattended", "Restrict HR files to People & Culture only", "Report suspected leaks to HR immediately"],
    didYouKnow: "Employees who witness one internal privacy breach are 3× more likely to leave within a year.",
    readTime: "≈ 30 sec read",
  },
  {
    icon: Target, title: "Competitive Intelligence Leaks", short: "Rivals gain the edge",
    explanation: "Exploration data, cost models and expansion plans in the wrong hands hand competitors years of catch-up work for free.",
    miningExample: "A junior geologist posts drill assay photos on social media, revealing a promising new deposit.",
    pk5Impact: "Rivals stake adjacent tenements, bidding wars inflate acquisition costs, PK5's first-mover advantage disappears.",
    prevention: ["Never photograph internal maps or logs", "Treat all exploration data as strictly confidential", "Report tenement enquiries from outsiders"],
    didYouKnow: "In mining, 60% of competitive losses trace back to insider disclosures — not to superior competitor research.",
    readTime: "≈ 40 sec read",
  },
  {
    icon: Landmark, title: "Insider Trading Risk", short: "Illegal share dealing",
    explanation: "Leaked material non-public information — production numbers, discoveries, M&A — can trigger illegal share trading by tippees.",
    miningExample: "A contractor overhears quarterly production shortfall and short-sells PK5 shares before the announcement.",
    pk5Impact: "Regulator investigations, personal criminal charges, mandatory disclosure, share price volatility.",
    prevention: ["Respect the trading blackout calendar", "Never discuss unreleased results outside the deal team", "Escalate suspected tipping to Compliance"],
    didYouKnow: "ASIC and the SEC treat 'tipping' — passing information to someone else who trades — as insider trading, even if you don't trade yourself.",
    readTime: "≈ 40 sec read",
  },
  {
    icon: Gavel, title: "Contract & NDA Violations", short: "Breach of legal duty",
    explanation: "Every supplier, partner and employee contract contains confidentiality clauses. Leaks put PK5 in direct breach.",
    miningExample: "Draft supplier pricing shared with a competing bidder violates the NDA signed with the incumbent vendor.",
    pk5Impact: "Injunctions, damages, terminated contracts, and future partners demanding tougher terms.",
    prevention: ["Read the confidentiality clause before sharing", "Route contract documents through Legal", "Never forward drafts externally without approval"],
    didYouKnow: "Australian courts have awarded damages exceeding $50M for a single NDA breach in the resources sector.",
    readTime: "≈ 35 sec read",
  },
  {
    icon: FlaskConical, title: "Intellectual Property Theft", short: "Innovations copied",
    explanation: "Proprietary processes, ore-processing chemistry and equipment designs are IP. Once disclosed, protection often becomes impossible.",
    miningExample: "A leaked flow-sheet for a new leach process is replicated by a competitor within nine months.",
    pk5Impact: "Loss of technology edge, wasted R&D investment, patent applications potentially invalidated.",
    prevention: ["Mark IP documents 'Restricted'", "Do not share process details with vendors without an NDA", "Log all external technical disclosures"],
    didYouKnow: "In many jurisdictions, once technical information is public, it can no longer be patented — even by the original inventor.",
    readTime: "≈ 40 sec read",
  },
  {
    icon: Radio, title: "Data Breach Escalation", short: "Small leak, big incident",
    explanation: "A single credential or file leak often opens the door for attackers to move laterally, escalating into a full-scale breach.",
    miningExample: "A reused password from a leaked file gives attackers access to the OT network controlling a processing plant.",
    pk5Impact: "Multi-day outages, ransom demands, mandatory notifications to the OAIC and affected parties.",
    prevention: ["Use unique passwords and MFA", "Report lost devices within one hour", "Never reuse work passwords elsewhere"],
    didYouKnow: "The average cost of a data breach in the mining and energy sector reached USD 5.6M in 2024 — 30% above the cross-industry average.",
    readTime: "≈ 40 sec read",
  },
  {
    icon: AlertTriangle, title: "Media & PR Fallout", short: "Story spins out of control",
    explanation: "Once confidential information reaches journalists, PK5 loses control of the narrative and cannot correct the record quickly.",
    miningExample: "An internal incident briefing is leaked to a reporter before the community and regulator are informed.",
    pk5Impact: "Days of adverse coverage, share price impact, and permanent Google search history.",
    prevention: ["Route every media enquiry to Communications", "Never confirm 'no comment' details", "Report leak suspicions immediately"],
    didYouKnow: "The first 24 hours of a story shape 80% of public perception — before PK5 can even issue a statement.",
    readTime: "≈ 35 sec read",
  },
  {
    icon: DollarSign, title: "Loss of Bidding Advantage", short: "Tenders undercut",
    explanation: "When bid prices, cost bases or negotiation floors leak, competitors price just below us and win the work.",
    miningExample: "Haulage tender pricing shared casually at an industry event allows a rival to submit a $2M lower bid.",
    pk5Impact: "Lost tenders, weakened margin on the tenders we do win, cascading impact on procurement leverage.",
    prevention: ["Keep bid economics inside the tender team", "Never discuss pricing at industry events", "Use code names for active tenders"],
    didYouKnow: "Just 1% margin erosion across PK5's procurement portfolio equates to tens of millions in lost profit each year.",
    readTime: "≈ 35 sec read",
  },
  {
    icon: Shield, title: "Environmental & Safety Data Misuse", short: "Selective use of raw data",
    explanation: "Raw environmental or safety data taken out of context can be weaponised by opponents before PK5 has interpreted it.",
    miningExample: "A partial water-monitoring dataset is leaked and framed as a spill before test results are complete.",
    pk5Impact: "Regulator inspections, community protests, delayed permits, and reputational damage that outlasts the facts.",
    prevention: ["Never share raw monitoring data externally", "Route data requests through Environment & Regulatory Affairs", "Publish only reviewed, contextualised information"],
    didYouKnow: "A single mis-framed dataset can delay a mining approval by 12–18 months, even when the underlying data is compliant.",
    readTime: "≈ 40 sec read",
  },
  {
    icon: Heart, title: "Community Relations Breakdown", short: "Social licence at risk",
    explanation: "Host communities expect PK5 to communicate directly and honestly. Leaks that reach them first damage the social licence to operate.",
    miningExample: "A leaked land-access negotiation plan reaches a traditional owner group before formal consultation begins.",
    pk5Impact: "Trust erosion, harder future consultations, protests, and challenges to operating approvals.",
    prevention: ["Let Community Relations lead every disclosure", "Never speculate publicly about community matters", "Respect embargoes on sensitive announcements"],
    didYouKnow: "In Australia, loss of social licence is the #1 reason approved mining projects fail to reach production.",
    readTime: "≈ 40 sec read",
  },
  {
    icon: UserCircle, title: "Personal Career Consequences", short: "You are personally accountable",
    explanation: "Individual employees who cause a confidentiality breach face disciplinary action, dismissal and — in serious cases — personal legal liability.",
    miningExample: "An employee who forwards a confidential geology report to a friend is dismissed and referred to the police.",
    pk5Impact: "Loss of a valued colleague, investigation costs, and a chilling effect on internal collaboration.",
    prevention: ["Only share on a need-to-know basis", "Ask if you're unsure — never assume", "Report your own mistakes promptly — self-reporting is treated favourably"],
    didYouKnow: "In most PK5 breach investigations, employees who self-report early face far lighter consequences than those who are found out later.",
    readTime: "≈ 40 sec read",
  },
];