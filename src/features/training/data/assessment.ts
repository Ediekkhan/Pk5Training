export type Quiz = { q: string; options: string[]; correct: number; explain?: string };

export const ASSESSMENT: Quiz[] = [
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
