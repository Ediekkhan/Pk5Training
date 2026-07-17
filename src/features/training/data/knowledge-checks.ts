export type KCType = "mc" | "tf" | "scenario";
export type KCQuestion = {
  type: KCType;
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

export const KC1: KCQuestion[] = [
  {
    type: "mc",
    q: "Confidentiality at PK5 Mining primarily helps to:",
    options: [
      "Protect competitive advantage, comply with law, and maintain trust",
      "Slow down internal collaboration",
      "Restrict access to public information",
      "Increase the cost of doing business",
    ],
    correct: 0,
    explain:
      "Confidentiality protects our edge, meets legal duties, and keeps the trust of our people and partners.",
  },
  {
    type: "tf",
    q: "Only executives are responsible for protecting confidential information.",
    options: ["True", "False"],
    correct: 1,
    explain: "Every employee shares responsibility — from site to boardroom.",
  },
  {
    type: "mc",
    q: "Which is an example of confidential information?",
    options: [
      "The company website URL",
      "Unpublished drill assay results",
      "A public press release",
      "The office address",
    ],
    correct: 1,
    explain: "Unpublished exploration data is one of the most sensitive categories we hold.",
  },
  {
    type: "scenario",
    q: "A friend outside work asks how your project is going. What do you do?",
    options: [
      "Share the interesting details in confidence",
      "Talk in general terms without disclosing specifics",
      "Send a copy of the internal update",
      "Post about it on social media",
    ],
    correct: 1,
    explain:
      "You can talk about your work in general terms — never share internal detail or documents.",
  },
];

export const KC2: KCQuestion[] = [
  {
    type: "mc",
    q: "You need to send a contract to an external vendor. You should:",
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
    type: "tf",
    q: "Reusing one strong password across all your accounts is a good practice.",
    options: ["True", "False"],
    correct: 1,
    explain: "Each account needs a unique password — reuse turns one breach into many.",
  },
  {
    type: "scenario",
    q: "You spot a stranger reading documents at a colleague's desk. You should:",
    options: [
      "Ignore it, they may be a visitor",
      "Politely ask who they are and notify security",
      "Take a photo and post it internally",
      "Assume the colleague authorised it",
    ],
    correct: 1,
    explain:
      "Verify politely and let security investigate — most on-site incidents start with unchallenged access.",
  },
  {
    type: "mc",
    q: "The safest way to dispose of confidential paperwork is:",
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

export const KC3: KCQuestion[] = [
  {
    type: "mc",
    q: "Which is NOT typically a consequence of a confidentiality breach?",
    options: [
      "Fines and lawsuits",
      "Reputation damage",
      "Guaranteed promotion",
      "Loss of investor confidence",
    ],
    correct: 2,
    explain: "Breaches carry real personal and business risk — there is no upside.",
  },
  {
    type: "scenario",
    q: "You've accidentally emailed a confidential file to the wrong person. You should:",
    options: [
      "Do nothing and hope they don't notice",
      "Ask the recipient to delete it and move on",
      "Report it immediately through the approved channel",
      "Send another email asking them not to open it",
    ],
    correct: 2,
    explain:
      "Fast reporting massively reduces the damage. There is no penalty for good-faith reporting.",
  },
  {
    type: "tf",
    q: "A single confidentiality lapse can affect share price, contracts, and safety.",
    options: ["True", "False"],
    correct: 0,
    explain:
      "Breaches ripple across many parts of the business — financial, legal, operational and human.",
  },
  {
    type: "mc",
    q: "The most important habit to leave with is:",
    options: [
      "Ask when unsure",
      "Assume everything is fine",
      "Only worry about digital files",
      "Trust that IT will catch mistakes",
    ],
    correct: 0,
    explain:
      "'Ask when unsure' beats every other habit — it prevents most incidents before they start.",
  },
];
