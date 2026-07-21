import { useEffect, useMemo, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { trainingService } from "@/api/training";
import { authService } from "@/services/sso/authService";
import {
  ASSESSMENT,
  CONFIDENTIAL_TOPICS,
  CONSEQUENCE_TOPICS,
  KC1,
  KC2,
  KC3,
  ROADMAP,
} from "../data";
import type { BadgeKey, CompletionData, TrainingUser } from "../types";

const TRAINING_NUMBER = "PK5-CONFIDENTIALITY-001";

export function useTrainingProgress({
  user,
  onComplete,
}: {
  user: TrainingUser;
  onComplete: (data: CompletionData) => void;
}) {
  const ssoAccount = authService.getAccount();
  const total = ROADMAP.length; // 15
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [maxIndex, setMaxIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Progress state
  const [topicsCompleted, setTopicsCompleted] = useState<Set<number>>(new Set());
  const [consequencesViewed, setConsequencesViewed] = useState<Set<number>>(new Set());
  const [kc1Answers, setKc1Answers] = useState<Record<number, number>>({});
  const [kc2Answers, setKc2Answers] = useState<Record<number, number>>({});
  const [kc3Answers, setKc3Answers] = useState<Record<number, number>>({});
  const [badges, setBadges] = useState<Set<BadgeKey>>(new Set());

  // Ack
  const [ack, setAck] = useState(false);
  const [fullName, setFullName] = useState(ssoAccount?.name ?? "");
  const [empId, setEmpId] = useState(user.id.includes("@") ? "" : user.id);
  const [dept, setDept] = useState("");
  const [sigData, setSigData] = useState<string>("");
  const [sigMode, setSigMode] = useState<"draw" | "type">("draw");
  const [typedSig, setTypedSig] = useState("");
  const sigRef = useRef<SignatureCanvas | null>(null);

  // Final assessment
  const [assessAnswers, setAssessAnswers] = useState<Record<number, number>>({});
  const [assessSubmitted, setAssessSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const assessScore = useMemo(
    () => ASSESSMENT.reduce((a, q, idx) => a + (assessAnswers[idx] === q.correct ? 1 : 0), 0),
    [assessAnswers],
  );
  const assessPct = Math.round((assessScore / ASSESSMENT.length) * 100);
  const assessPassed = assessSubmitted && assessPct >= 80;

  const awardBadge = (b: BadgeKey) => setBadges((s) => new Set(s).add(b));

  // Badge awards from KC completion
  useEffect(() => {
    if (Object.keys(kc1Answers).length === KC1.length) awardBadge("learner");
  }, [kc1Answers]);
  useEffect(() => {
    if (Object.keys(kc2Answers).length === KC2.length) awardBadge("practitioner");
  }, [kc2Answers]);
  useEffect(() => {
    if (Object.keys(kc3Answers).length === KC3.length) awardBadge("champion");
  }, [kc3Answers]);

  // Section completion for roadmap
  const isSectionComplete = (idx: number): boolean => {
    switch (idx) {
      case 0:
        return maxIndex > 0;
      case 1:
        return maxIndex > 1;
      case 2:
        return topicsCompleted.size >= CONFIDENTIAL_TOPICS.length;
      case 3:
        return maxIndex > 3;
      case 4:
        return Object.keys(kc1Answers).length === KC1.length;
      case 5:
        return maxIndex > 5;
      case 6:
        return maxIndex > 6;
      case 7:
        return maxIndex > 7;
      case 8:
        return Object.keys(kc2Answers).length === KC2.length;
      case 9:
        return consequencesViewed.size >= CONSEQUENCE_TOPICS.length;
      case 10:
        return maxIndex > 10;
      case 11:
        return Object.keys(kc3Answers).length === KC3.length;
      case 12:
        return assessPassed;
      case 13:
        return false; // complete via submit
      case 14:
        return false;
      default:
        return false;
    }
  };

  const canAdvance = useMemo(() => {
    if (i === 2) return topicsCompleted.size >= CONFIDENTIAL_TOPICS.length;
    if (i === 4) return Object.keys(kc1Answers).length === KC1.length;
    if (i === 8) return Object.keys(kc2Answers).length === KC2.length;
    if (i === 9) return consequencesViewed.size >= CONSEQUENCE_TOPICS.length;
    if (i === 11) return Object.keys(kc3Answers).length === KC3.length;
    if (i === 12) return assessPassed;
    if (i === 13) {
      const sig = sigMode === "draw" ? sigData : typedSig.trim();
      return Boolean(ack && fullName.trim() && empId.trim() && dept.trim() && sig);
    }
    return true;
  }, [
    i,
    topicsCompleted,
    kc1Answers,
    kc2Answers,
    kc3Answers,
    consequencesViewed,
    assessPassed,
    ack,
    fullName,
    empId,
    dept,
    sigData,
    typedSig,
    sigMode,
  ]);

  const go = (n: number) => {
    if (n < 0 || n > total - 1) return;
    // Prevent jumping ahead past furthest-reached
    if (n > maxIndex + 1) return;
    // Gating on forward moves
    if (n > i && !canAdvance) return;
    setDir(n > i ? 1 : -1);
    setI(n);
    setMaxIndex((m) => Math.max(m, n));
    setDrawerOpen(false);
  };

  const finish = async () => {
    if (isSubmitting) return;

    const signature = sigMode === "draw" ? sigData : typedSig.trim();
    const participantEmail = authService.getAccount()?.username || user.id;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await trainingService.sendTrainingForm({
        trainingNumber: TRAINING_NUMBER,
        participantEmail,
      });

      onComplete({
        signature,
        fullName: fullName.trim(),
        employeeId: empId.trim(),
        department: dept.trim(),
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit your training record. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName))
        return;
      if (e.key === "ArrowRight") {
        if (i < total - 1) {
          if (canAdvance) go(i + 1);
        } else if (canAdvance) finish();
      }
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, canAdvance]);

  const progress = ((i + 1) / total) * 100;

  const roadmapStates = ROADMAP.map((r) => ({
    ...r,
    completed: isSectionComplete(r.id),
    current: r.id === i,
    locked: r.id > maxIndex,
  }));
  return {
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
    isSubmitting,
    submitError,
    canAdvance,
    go,
    finish,
    progress,
    roadmapStates,
  };
}
