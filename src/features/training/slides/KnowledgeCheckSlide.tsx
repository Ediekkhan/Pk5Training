import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, RotateCw, Sparkles, X } from "lucide-react";
import { Button, Card, SlideHead } from "../components/primitives";
import { type KCQuestion } from "../data";

export function SlideKnowledgeCheck({
  title,
  kicker,
  questions,
  answers,
  setAnswers,
  onContinue,
}: {
  title: string;
  kicker: string;
  questions: KCQuestion[];
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  onContinue: () => void;
}) {
  const [qi, setQi] = useState(0);
  const q = questions[qi];
  const picked = answers[qi];
  const answered = picked !== undefined;
  const correct = answered && picked === q.correct;
  const done = Object.keys(answers).length === questions.length;

  const select = (oi: number) => {
    if (answered) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  const encouragement = correct
    ? ["Correct! Great job.", "Nailed it!", "Exactly right.", "Correct — well done."][qi % 4]
    : "Almost there. Here's the correct answer.";

  return (
    <div className="mx-auto max-w-3xl">
      <SlideHead
        kicker={kicker}
        title={title}
        sub="A short reinforcement check — not scored. Take your time."
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 font-medium text-muted-foreground">
          {q.type === "tf"
            ? "True or False"
            : q.type === "scenario"
              ? "Scenario"
              : "Multiple choice"}
        </div>
        <div className="font-semibold text-charcoal">
          Question {qi + 1} <span className="text-muted-foreground">of {questions.length}</span>
        </div>
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full gold-gradient"
          initial={false}
          animate={{ width: `${((qi + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.35 }}
        />
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
                const good = answered && oi === q.correct;
                const bad = answered && isPicked && oi !== q.correct;
                return (
                  <button
                    key={o}
                    onClick={() => select(oi)}
                    disabled={answered}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                      good
                        ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]"
                        : bad
                          ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive"
                          : isPicked
                            ? "border-gold bg-primary-soft text-charcoal"
                            : "border-border bg-white text-charcoal hover:border-gold/50"
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                        good
                          ? "border-success bg-success text-white"
                          : bad
                            ? "border-destructive bg-destructive text-white"
                            : isPicked
                              ? "border-transparent gold-gradient text-white shadow-gold"
                              : "border-border text-muted-foreground"
                      }`}
                    >
                      {good ? (
                        <Check className="size-3.5" strokeWidth={3} />
                      ) : bad ? (
                        <X className="size-3.5" strokeWidth={3} />
                      ) : (
                        String.fromCharCode(65 + oi)
                      )}
                    </span>
                    <span className="flex-1">{o}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 flex items-start gap-3 rounded-xl p-4 text-sm ${
                    correct
                      ? "bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]"
                      : "bg-primary-soft text-charcoal"
                  }`}
                >
                  {correct ? (
                    <Sparkles className="mt-0.5 size-4 shrink-0" />
                  ) : (
                    <RotateCw className="mt-0.5 size-4 shrink-0" />
                  )}
                  <div>
                    <div className="font-semibold">{encouragement}</div>
                    <div className="mt-0.5 text-xs opacity-90">{q.explain}</div>
                    {!correct && (
                      <div className="mt-1 text-xs">
                        Correct answer:{" "}
                        <span className="font-semibold">{q.options[q.correct]}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setQi(idx)}
              aria-label={`Go to question ${idx + 1}`}
              className={`size-2 rounded-full transition-all ${
                idx === qi
                  ? "w-6 gold-gradient"
                  : answers[idx] !== undefined
                    ? "bg-gold/40"
                    : "bg-border"
              }`}
            />
          ))}
        </div>
        {qi < questions.length - 1 ? (
          <Button size="sm" onClick={() => setQi(qi + 1)} disabled={!answered}>
            Next <ArrowRight className="size-4" />
          </Button>
        ) : done ? (
          <Button size="sm" onClick={onContinue}>
            Continue <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button size="sm" disabled>
            Continue <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
