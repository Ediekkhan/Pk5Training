import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Completion } from "./components/Completion";
import { Login } from "./components/Login";
import { ThankYou } from "./components/ThankYou";
import { TrainingShell } from "./components/TrainingShell";
import type { CompletionData, Stage, TrainingUser } from "./types";

export function TrainingPage() {
  const [stage, setStage] = useState<Stage>("login");
  const [user, setUser] = useState<TrainingUser | null>(null);
  const [completion, setCompletion] = useState<CompletionData | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-[oklch(0.985_0.005_82)]">
      <AnimatePresence mode="wait">
        {stage === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Login
              onLogin={(id) => {
                setUser({ id });
                setStage("training");
              }}
            />
          </motion.div>
        )}
        {stage === "training" && (
          <motion.div
            key="training"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <TrainingShell
              user={user!}
              onComplete={(data) => {
                setCompletion(data);
                setStage("complete");
              }}
              onExit={() => {
                setUser(null);
                setStage("login");
              }}
            />
          </motion.div>
        )}
        {stage === "complete" && completion && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Completion
              data={completion}
              onContinue={() => setStage("thankyou")}
              onRestart={() => setStage("training")}
              onExit={() => {
                setUser(null);
                setCompletion(null);
                setStage("login");
              }}
            />
          </motion.div>
        )}
        {stage === "thankyou" && completion && (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ThankYou
              data={completion}
              onDashboard={() => {
                setCompletion(null);
                setStage("training");
              }}
              onExit={() => {
                setUser(null);
                setCompletion(null);
                setStage("login");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
