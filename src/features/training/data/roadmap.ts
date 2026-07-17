import { Award, ShieldCheck, Sparkles } from "lucide-react";
import type { BadgeKey } from "../types";

export type RoadmapStop = { id: number; label: string; short: string };

export const ROADMAP: RoadmapStop[] = [
  { id: 0, label: "Welcome", short: "Welcome" },
  { id: 1, label: "Why Confidentiality Matters", short: "Why" },
  { id: 2, label: "What is Confidential Information", short: "What" },
  // { id: 3, label: "Your Responsibilities", short: "Responsibilities" },
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

export const BADGES: Record<BadgeKey, { label: string; icon: typeof Award }> = {
  learner: { label: "Learning Milestone", icon: Sparkles },
  practitioner: { label: "Practitioner", icon: ShieldCheck },
  champion: { label: "Confidentiality Champion", icon: Award },
};

/* -------------------------------------------------------------------------- */
/*  Root App                                                                  */
/* -------------------------------------------------------------------------- */
