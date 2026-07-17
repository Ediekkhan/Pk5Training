import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ROADMAP } from "../data";
import { Button } from "./primitives";

export function TrainingNavigation({
  currentIndex,
  total,
  progress,
  canAdvance,
  onPrevious,
  onNext,
  onFinish,
}: {
  currentIndex: number;
  total: number;
  progress: number;
  canAdvance: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}) {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-border/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-350 items-center gap-4 px-4 py-3.5 sm:px-6">
        <Button variant="outline" size="sm" onClick={onPrevious} disabled={currentIndex === 0}>
          <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex-1">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="truncate font-semibold text-charcoal">
              {currentIndex + 1}. {ROADMAP[currentIndex]?.label}{" "}
              <span className="text-muted-foreground">
                · {currentIndex + 1} of {total}
              </span>
            </span>
            <span className="font-mono font-semibold text-gold">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="gold-gradient h-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {currentIndex < total - 1 ? (
          <Button size="sm" onClick={onNext} disabled={!canAdvance}>
            <span className="hidden sm:inline">Next</span> <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button size="sm" onClick={onFinish} disabled={!canAdvance}>
            <Check className="size-4" /> <span className="hidden sm:inline">Complete</span>
          </Button>
        )}
      </div>
    </nav>
  );
}
