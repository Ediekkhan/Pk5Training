import {
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import SignatureCanvas from "react-signature-canvas";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Eye,
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
  PartyPopper,
  Radio,
  RotateCw,
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
  X,
} from "lucide-react";
import { Button, Card, Checkbox, Field, SlideHead } from "../components/primitives";
import { BulletList, SectionLabel } from "../components/slide-content";
import {
  ASSESSMENT,
  CONFIDENTIAL_TOPICS,
  CONSEQUENCE_TOPICS,
  DOS,
  DONTS,
  KC1,
  KC2,
  KC3,
  RESPONSIBILITIES,
  SECURITY,
  TAKEAWAYS,
  type KCQuestion,
} from "../data";

export function SlideWhat({
  completed,
  setCompleted,
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
        setTimeout(() => {
          setCelebrate(false);
          setView("overview");
        }, 1600);
      }
      return next;
    });
  };

  const unlockedThrough = completed.size; // index that is unlocked but not yet completed

  if (view === "overview") {
    return (
      <div>
        <SlideHead
          kicker="Chapter 4 · Guided Module"
          title="What Counts as  “PK5 Mining Confidential Information”?"
          sub="Work through 12 short topics in order. Each unlocks the next."
        />
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gold-dark">
              Progress
            </div>
            <div className="font-display text-lg font-extrabold text-charcoal">
              {completed.size} of {CONFIDENTIAL_TOPICS.length} topics completed
            </div>
          </div>
          <div className="min-w-45 flex-1 sm:max-w-xs">
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
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.03 }}
                whileHover={unlocked ? { y: -2 } : {}}
                onClick={() => unlocked && setView(idx)}
                disabled={!unlocked}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-soft transition-all ${
                  done
                    ? "border-gold/60 bg-primary-soft ring-1 ring-gold/40"
                    : unlocked
                      ? "border-border bg-white hover:border-gold/50 hover:shadow-elevated"
                      : "border-border bg-muted/40 cursor-not-allowed"
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
                <div
                  className={`mb-3 grid size-11 place-items-center rounded-xl transition-all ${
                    done
                      ? "gold-gradient text-white shadow-gold"
                      : unlocked
                        ? "bg-primary-soft text-gold-dark group-hover:gold-gradient group-hover:text-white"
                        : "bg-muted text-muted-foreground/50"
                  }`}
                >
                  <t.icon className="size-5" />
                </div>
                <div
                  className={`font-display text-sm font-bold ${unlocked ? "text-charcoal" : "text-muted-foreground/60"}`}
                >
                  {t.title}
                </div>
                <div
                  className={`mt-0.5 text-xs ${unlocked ? "text-muted-foreground" : "text-muted-foreground/50"}`}
                >
                  {t.short}
                </div>
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 grid place-items-center bg-charcoal/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="flex flex-col items-center gap-3 rounded-3xl bg-white p-8 shadow-elevated"
              >
                <div className="grid size-16 place-items-center rounded-full gold-gradient text-white shadow-gold">
                  <PartyPopper className="size-8" />
                </div>
                <div className="font-display text-2xl font-extrabold text-charcoal">
                  All 12 topics completed!
                </div>
                <div className="text-sm text-muted-foreground">
                  Module complete — you can continue.
                </div>
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
  const canNext =
    idx < CONFIDENTIAL_TOPICS.length - 1 && (completed.has(idx) || completed.size > idx);

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
          <motion.div
            className="h-full gold-gradient"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4 }}
          />
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
            <div className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">
              Confidential topic
            </div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">
              {t.title}
            </h2>
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
          {/* <div>
            <SectionLabel>Your responsibilities</SectionLabel>
            <BulletList items={t.responsibilities} />
          </div> */}
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
