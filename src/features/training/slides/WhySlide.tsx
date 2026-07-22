import { motion } from "motion/react";
import { Building2, Heart, Scale, Sparkles, UserCircle, Users } from "lucide-react";
import { SlideHead } from "../components/primitives";

export function SlideWhy() {
  const points = [
    {
      icon: Building2,
      text: "Protect company assets",
      detail: "Our data, systems and operations are competitive advantages worth protecting.",
    },
    {
      icon: Users,
      text: "Protect employees",
      detail: "Personal and safety information belongs only to authorised people.",
    },
    {
      icon: UserCircle,
      text: "Protect clients",
      detail: "Client trust is built on our ability to handle their information responsibly.",
    },
    {
      icon: Heart,
      text: "Maintain trust",
      detail:
        "Trust from partners, communities and colleagues takes years to build and moments to lose.",
    },
    {
      icon: Scale,
      text: "Meet legal obligations",
      detail: "Confidentiality is not optional — it's built into law and every contract we sign.",
    },
  ];
  
  return (
    <div>
      <SlideHead
        kicker="Chapter 1"
        title="Why confidentiality matters"
        sub="Mining companies handle several categories of sensitive information that don't come up in most other industries. A leak can cost a company its competitive edge, delay a listing, trigger a market investigation, damage relationships with landowners and communities, or put people's safety at risk. Confidentiality safeguards every part of our business — and everyone in it."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {points.map((p, i) => (
          <motion.div
            key={p.text}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft"
          >
            <div className="mb-3 grid size-11 place-items-center rounded-xl gold-gradient text-white shadow-gold">
              <p.icon className="size-5" />
            </div>
            <div className="font-display text-base font-bold text-charcoal">{p.text}</div>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-start gap-3 rounded-2xl border border-gold/30 bg-primary-soft p-4"
      >
        <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-dark" />
        <p className="text-sm font-medium text-charcoal">
          Every employee shares responsibility for protecting confidential information — from site
          to boardroom.
        </p>
      </motion.div>
    </div>
  );
}
