import { motion } from "motion/react";
import { Fingerprint, Lock, Shield } from "lucide-react";

export function ShieldIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-4/5 w-4/5">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.79 0.13 82)" />
          <stop offset="1" stopColor="oklch(0.62 0.14 72)" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="200"
        cy="200"
        r="150"
        fill="oklch(0.97 0.03 82)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.path
        d="M200 90 L290 130 V210 C290 265 250 300 200 315 C150 300 110 265 110 210 V130 Z"
        fill="url(#g1)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.path
        d="M170 200 L192 222 L235 175"
        stroke="white"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      />
    </svg>
  );
}
