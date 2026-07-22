
import { BookOpen, FileLock2, Lock } from "lucide-react";
import { IconType } from "../slides/WhatIsConfidentialSlide";


export type WhatConfidential = {
    icon: IconType;
    heading: string;
    intro?: string;
    bullets?: string[];
    gold?: boolean;
};

export const WHAT_CONFIDENTIAL: WhatConfidential[] = [
    {
        icon: BookOpen,
        heading: "Definition",
        intro:
            "Information that is not publicly available and whose unauthorized disclosure, alteration, or misuse could negatively impact PK5 Mining, its employees, business partners, customers, operations, or competitive position.",
        bullets: ["The foundation for everything you'll explore throughout this training."],
        gold: true,
    },
    {
        icon: Lock,
        heading: "Why Protect It?",
        intro: "Protecting confidential information helps:",
        bullets: [
            "Preserve PK5 Mining's competitive advantage",
            "Maintain trust with employees, investors, regulators, and partners",
            "Safeguard sensitive operational and exploration data",
            "Prevent legal, financial, and reputational damage",
            "Ensure compliance with company policies and regulatory obligations",
        ],
    },
    {
        icon: FileLock2,
        heading: "Your Role",
        intro: "Every employee has a responsibility to:",
        bullets: [
            "Treat non-public information as confidential",
            "Follow company confidentiality policies",
            "Share information only with authorized individuals",
            "Protect company information inside and outside the workplace",
            "Report suspected confidentiality breaches immediately",
        ],
    },
];