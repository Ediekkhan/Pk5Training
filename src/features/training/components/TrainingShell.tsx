import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import SignatureCanvas from "react-signature-canvas";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Lock,
  LogOut,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
// import logo from "@/assets/pk5logo.png";
// import { Button } from "./primitives";
import { RoadmapList } from "./RoadmapList";
import {
  ASSESSMENT,
  BADGES,
  CONFIDENTIAL_TOPICS,
  CONSEQUENCE_TOPICS,
  KC1,
  KC2,
  KC3,
  ROADMAP,
} from "../data";
import type { BadgeKey, CompletionData, TrainingUser } from "../types";
import { SlideWelcome } from "../slides/WelcomeSlide";
import { SlideWhy } from "../slides/WhySlide";
import { SlideEffectsModule } from "../slides/EffectsSlide";
import { SlideWhat } from "../slides/ConfidentialInfoSlide";
import { SlideResponsibilities } from "../slides/ResponsibilitiesSlide";
import { SlideKnowledgeCheck } from "../slides/KnowledgeCheckSlide";
import { SlideDosDonts } from "../slides/DosAndDontsSlide";
import { SlideScenarios } from "../slides/ScenariosSlide";
import { SlideSecurity } from "../slides/SecuritySlide";
import { SlideConsequencesModule } from "../slides/ConsequencesSlide";
import { SlideTakeaways } from "../slides/TakeawaysSlide";
import { SlideAssessment } from "../slides/AssessmentSlide";
import { SlideAck } from "../slides/AcknowledgementSlide";
import { SlideCompletionPrompt } from "../slides/CompletionPromptSlide";
import { useTrainingProgress } from "../hooks/useTrainingProgress";
import { TrainingHeader } from "./TrainingHeader";
import { TrainingNavigation } from "./TrainingNavigation";

export function TrainingShell({
  user,
  onComplete,
  onExit,
}: {
  user: { id: string };
  onComplete: (d: {
    signature: string;
    fullName: string;
    employeeId: string;
    department: string;
  }) => void;
  onExit: () => void;
}) {
  const {
    total,
    i,
    dir,
    sidebarOpen,
    setSidebarOpen,
    drawerOpen,
    setDrawerOpen,
    topicsCompleted,
    setTopicsCompleted,
    consequencesViewed,
    setConsequencesViewed,
    kc1Answers,
    setKc1Answers,
    kc2Answers,
    setKc2Answers,
    kc3Answers,
    setKc3Answers,
    badges,
    ack,
    setAck,
    fullName,
    setFullName,
    empId,
    setEmpId,
    dept,
    setDept,
    sigData,
    setSigData,
    sigMode,
    setSigMode,
    typedSig,
    setTypedSig,
    sigRef,
    assessAnswers,
    setAssessAnswers,
    assessSubmitted,
    setAssessSubmitted,
    assessScore,
    assessPct,
    assessPassed,
    canAdvance,
    go,
    finish,
    progress,
    roadmapStates,
  } = useTrainingProgress({ user, onComplete });

  const slides: ReactNode[] = [
    <SlideWelcome key="s0" onStart={() => go(1)} />,
    <SlideWhy key="s1" />,

  <SlideEffectsModule key="s2" viewed={topicsCompleted} setViewed={setTopicsCompleted} />,

    <SlideWhat key="s3" completed={topicsCompleted} setCompleted={setTopicsCompleted} />,
    <SlideResponsibilities key="s4" />,
    <SlideKnowledgeCheck
      key="s5"
      title="Knowledge Check 1"
      kicker="Reinforce · Chapters 1–3"
      questions={KC1}
      answers={kc1Answers}
      setAnswers={setKc1Answers}
      onContinue={() => go(5)}
    />,
    <SlideDosDonts key="s6" />,
    <SlideScenarios key="s7" />,
    <SlideSecurity key="s8" />,
    <SlideKnowledgeCheck
      key="s9"
      title="Knowledge Check 2"
      kicker="Reinforce · Chapters 4–6"
      questions={KC2}
      answers={kc2Answers}
      setAnswers={setKc2Answers}
      onContinue={() => go(9)}
    />,
    <SlideConsequencesModule
      key="s10"
      viewed={consequencesViewed}
      setViewed={setConsequencesViewed}
    />,
    <SlideTakeaways key="s11" badges={badges} />,
    <SlideKnowledgeCheck
      key="s12"
      title="Knowledge Check 3"
      kicker="Final reinforcement"
      questions={KC3}
      answers={kc3Answers}
      setAnswers={setKc3Answers}
      onContinue={() => go(12)}
    />,
    <SlideAssessment
      key="s13"
      answers={assessAnswers}
      setAnswers={setAssessAnswers}
      submitted={assessSubmitted}
      setSubmitted={setAssessSubmitted}
      score={assessScore}
      pct={assessPct}
      passed={assessPassed}
      onContinue={() => go(13)}
      onReviewTraining={() => go(0)}
      onRetake={() => {
        setAssessAnswers({});
        setAssessSubmitted(false);
      }}
      overallProgress={progress}
    />,
    <SlideAck
      key="s14"
      ack={ack}
      setAck={setAck}
      fullName={fullName}
      setFullName={setFullName}
      empId={empId}
      setEmpId={setEmpId}
      dept={dept}
      setDept={setDept}
      sigMode={sigMode}
      setSigMode={setSigMode}
      typedSig={typedSig}
      setTypedSig={setTypedSig}
      sigRef={sigRef}
      setSigData={setSigData}
      sigData={sigData}
    />,
    <SlideCompletionPrompt key="s15" ready={true} onSubmit={finish} />,
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <TrainingHeader
        badges={badges}
        onOpenRoadmap={() => setDrawerOpen(true)}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
        onExit={onExit}
      />

      {/* Body: sidebar + stage */}
      <div className="mx-auto flex w-full max-w-350 flex-1 gap-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* Desktop roadmap sidebar */}
        <aside
          className={`sticky top-19 hidden h-[calc(100vh-140px)] shrink-0 overflow-y-auto rounded-2xl border border-border bg-white/70 backdrop-blur transition-all lg:block ${
            sidebarOpen ? "w-72" : "w-16"
          }`}
        >
          <RoadmapList stops={roadmapStates} collapsed={!sidebarOpen} onJump={(id) => go(id)} />
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm lg:hidden"
                onClick={() => setDrawerOpen(false)}
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto border-r border-border bg-white lg:hidden"
              >
                <div className="flex items-center justify-between border-b border-border p-4">
                  <div className="font-display text-sm font-extrabold text-charcoal">
                    Training Roadmap
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="grid size-8 place-items-center rounded-lg hover:bg-muted"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <RoadmapList stops={roadmapStates} collapsed={false} onJump={(id) => go(id)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Slide stage */}
        <main className="min-w-0 flex-1">
          <div className="relative">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {slides[i]}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <TrainingNavigation
        currentIndex={i}
        total={total}
        progress={progress}
        canAdvance={canAdvance}
        onPrevious={() => go(i - 1)}
        onNext={() => go(i + 1)}
        onFinish={finish}
      />
    </div>
  );
}
