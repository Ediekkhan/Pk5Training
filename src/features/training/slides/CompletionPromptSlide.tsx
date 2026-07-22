import { motion } from "motion/react";
import { Check, ShieldCheck } from "lucide-react";
import { Button, Card, SlideHead } from "../components/primitives";

export function SlideCompletionPrompt({
  ready,
  submitting,
  error,
  onSubmit,
}: {
  ready: boolean;
  submitting: boolean;
  error: string;
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <SlideHead
        kicker="Ready to submit"
        title="Submit your training record"
        sub="You're one click away from completing your PK5 Mining Confidentiality Training."
      />
      <Card className="p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 grid size-16 place-items-center rounded-full gold-gradient text-white shadow-gold"
        >
          <ShieldCheck className="size-8" />
        </motion.div>
        <p className="text-sm leading-relaxed text-charcoal">
          Click below to submit your acknowledgement and signature. Your completion will be
          recorded.
        </p>
        <div className="mt-6">
          <Button size="lg" onClick={onSubmit} disabled={!ready}>
            <Check className="size-4" />
            {submitting ? "Submitting…" : "Submit & complete training"}
          </Button>
        </div>
        {error && (
          <p className="mt-4 text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        )}
      </Card>
    </div>
  );
}
