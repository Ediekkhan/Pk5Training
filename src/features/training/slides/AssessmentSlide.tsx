import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  RotateCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button, Card, SlideHead } from "../components/primitives";
import { ASSESSMENT } from "../data";

export function SlideAssessment({
  answers,
  setAnswers,
  submitted,
  setSubmitted,
  score,
  pct,
  passed,
  onContinue,
  onReviewTraining,
  onRetake,
  overallProgress,
}: {
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  pct: number;
  passed: boolean;
  onContinue: () => void;
  onReviewTraining: () => void;
  onRetake: () => void;
  overallProgress: number;
}) {
  const [qi, setQi] = useState(0);
  const total = ASSESSMENT.length;
  const q = ASSESSMENT[qi];
  const picked = answers[qi];
  const hasPicked = picked !== undefined;
  const isLast = qi === total - 1;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  const select = (oi: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [qi]: oi });
  };

  const submit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl">
        <SlideHead
          kicker="Final Assessment"
          title={passed ? "Assessment passed" : "Almost there"}
          sub={
            passed
              ? "You've demonstrated a strong understanding of PK5 Mining's confidentiality standards."
              : "You have not achieved the required passing score. Please review the training content and try the assessment again."
          }
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div
              className={`relative flex flex-col items-center gap-2 p-8 text-center ${passed ? "bg-[oklch(0.97_0.06_155)]" : "bg-primary-soft"}`}
            >
              <motion.div
                initial={{ scale: 0, rotate: passed ? -180 : 0 }}
                animate={{ scale: 1, rotate: 0, x: passed ? 0 : [0, -6, 6, -4, 4, 0] }}
                transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                className={`grid size-16 place-items-center rounded-full text-white shadow-gold ${passed ? "bg-success" : "gold-gradient"}`}
              >
                {passed ? (
                  <CheckCircle2 className="size-9" strokeWidth={2.5} />
                ) : (
                  <RotateCw className="size-8" strokeWidth={2.5} />
                )}
              </motion.div>
              <div className="font-display text-5xl font-extrabold tracking-tight text-charcoal">
                {pct}%
              </div>
              <div className="text-sm font-medium text-charcoal/80">
                {score} of {total} correct · {passed ? "Passed" : "Did not pass"} (80% required)
              </div>
              <div
                className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${passed ? "bg-success text-white" : "bg-charcoal text-white"}`}
              >
                {passed ? (
                  <>
                    <ShieldCheck className="size-3" /> Confidentiality Confirmed
                  </>
                ) : (
                  <>
                    <AlertTriangle className="size-3" /> Review Required
                  </>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-dark">
                Question review
              </div>
              <div className="space-y-2">
                {ASSESSMENT.map((qq, idx) => {
                  const correct = answers[idx] === qq.correct;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-border bg-white p-3 text-sm"
                    >
                      <div
                        className={`grid size-6 shrink-0 place-items-center rounded-full ${correct ? "bg-success text-white" : "bg-destructive text-white"}`}
                      >
                        {correct ? (
                          <Check className="size-3.5" strokeWidth={3} />
                        ) : (
                          <X className="size-3.5" strokeWidth={3} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-charcoal">
                          Q{idx + 1}. {qq.q}
                        </div>
                        {!correct && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Correct answer:{" "}
                            <span className="font-medium text-charcoal">
                              {qq.options[qq.correct]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                {passed ? (
                  <Button size="lg" onClick={onContinue}>
                    Continue to Acknowledgement <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={onReviewTraining}>
                      <ArrowLeft className="size-4" /> Review Training
                    </Button>
                    <Button onClick={onRetake}>
                      <RotateCw className="size-4" /> Retake Assessment
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  const innerPct = (answeredCount / total) * 100;

  return (
    <div className="mx-auto max-w-3xl">
      <SlideHead
        kicker="Final Assessment"
        title="Final Assessment"
        sub="Complete this short assessment to confirm your understanding before acknowledging the confidentiality policy."
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-gold" /> Estimated 2–3 minutes
        </div>
        <div className="font-semibold text-charcoal">
          Question {qi + 1} <span className="text-muted-foreground">of {total}</span>
        </div>
      </div>

      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full gold-gradient"
          initial={false}
          animate={{ width: `${innerPct}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>
      <div className="mb-6 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>{answeredCount} answered</span>
        <span className="font-mono">
          Overall training progress · {Math.round(overallProgress)}%
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qi}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="p-6 sm:p-8">
            <div className="mb-6 font-display text-xl font-extrabold leading-snug text-charcoal sm:text-2xl">
              {q.q}
            </div>
            <div className="space-y-2.5">
              {q.options.map((o, oi) => {
                const isPicked = picked === oi;
                return (
                  <button
                    key={o}
                    onClick={() => select(oi)}
                    className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left text-[15px] font-medium transition-all ${
                      isPicked
                        ? "border-gold bg-primary-soft text-charcoal shadow-soft"
                        : "border-border bg-white text-charcoal hover:border-gold/50 hover:-translate-y-0.5 hover:shadow-soft"
                    }`}
                    aria-pressed={isPicked}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${isPicked ? "border-transparent gold-gradient text-white shadow-gold" : "border-border text-muted-foreground"}`}
                    >
                      {isPicked ? (
                        <Check className="size-3.5" strokeWidth={3} />
                      ) : (
                        String.fromCharCode(65 + oi)
                      )}
                    </span>
                    <span className="flex-1">{o}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQi(Math.max(0, qi - 1))}
          disabled={qi === 0}
        >
          <ArrowLeft className="size-4" /> Previous
        </Button>
        <div className="flex items-center gap-1.5">
          {ASSESSMENT.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setQi(idx)}
              aria-label={`Go to question ${idx + 1}`}
              className={`size-2 rounded-full transition-all ${idx === qi ? "w-6 gold-gradient" : answers[idx] !== undefined ? "bg-gold/40" : "bg-border"}`}
            />
          ))}
        </div>
        {isLast ? (
          <Button size="sm" onClick={submit} disabled={!allAnswered}>
            <Check className="size-4" /> Submit Assessment
          </Button>
        ) : (
          <Button size="sm" onClick={() => setQi(qi + 1)} disabled={!hasPicked}>
            Next <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
