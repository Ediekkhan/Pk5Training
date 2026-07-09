import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import SignatureCanvas from "react-signature-canvas";
import {
  Shield, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Check, X, Award,
  FileText, DollarSign, Users, UserCircle, Handshake, Mail, Target,
  Tag, Truck, FlaskConical, Map, KeyRound, Monitor, Trash2, AlertTriangle,
  Fingerprint, Wifi, Archive, Sparkles, Download, RotateCw, LogOut,
  CheckCircle2, ShieldCheck, Scale, TrendingDown, Heart, Gavel, Building2,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative grid size-9 place-items-center rounded-xl gold-gradient shadow-gold">
        <span className="font-display text-sm font-extrabold text-white tracking-tight">P5</span>
      </div>
      <div className="leading-tight">
        <div className="font-display text-[15px] font-extrabold tracking-tight text-charcoal">PK5 Mining</div>
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Confidentiality</div>
      </div>
    </div>
  );
}

function Button({
  children, variant = "primary", size = "md", className = "", disabled, onClick, type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const sizes = {
    sm: "h-9 px-4 text-sm rounded-lg",
    md: "h-11 px-6 text-sm rounded-xl",
    lg: "h-13 px-8 text-base rounded-2xl",
  };
  const variants = {
    primary:
      "gold-gradient text-white shadow-gold hover:brightness-105 active:brightness-95 disabled:opacity-40 disabled:shadow-none",
    ghost:
      "bg-transparent text-foreground hover:bg-muted disabled:opacity-40",
    outline:
      "border border-border bg-white text-foreground hover:bg-muted disabled:opacity-40",
    dark:
      "bg-charcoal text-white hover:bg-charcoal/90 disabled:opacity-40",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card shadow-soft ${className}`}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const CONFIDENTIAL_ITEMS = [
  { icon: Map, title: "Geological Data", desc: "Exploration & survey findings" },
  { icon: FileText, title: "Mining Reports", desc: "Operational documentation" },
  { icon: DollarSign, title: "Financial Records", desc: "Revenue, costs, forecasts" },
  { icon: Users, title: "Employee Records", desc: "HR & personal data" },
  { icon: UserCircle, title: "Customer Info", desc: "Client details & history" },
  { icon: Handshake, title: "Contracts", desc: "Legal agreements" },
  { icon: Mail, title: "Communications", desc: "Internal correspondence" },
  { icon: Target, title: "Strategies", desc: "Business planning" },
  { icon: Tag, title: "Pricing", desc: "Rate structures" },
  { icon: Truck, title: "Suppliers", desc: "Vendor agreements" },
  { icon: FlaskConical, title: "R&D", desc: "Research initiatives" },
  { icon: Building2, title: "Assets", desc: "Company property" },
];

const RESPONSIBILITIES = [
  { icon: Lock, text: "Keep company information secure at all times", critical: true },
  { icon: KeyRound, text: "Use strong, unique passwords for every account" },
  { icon: Monitor, text: "Lock your computer when stepping away" },
  { icon: Shield, text: "Never share confidential files without approval", critical: true },
  { icon: Trash2, text: "Dispose of sensitive documents securely" },
  { icon: AlertTriangle, text: "Report suspected breaches immediately", critical: true },
];

const DOS = [
  "Follow company policies",
  "Encrypt sensitive files",
  "Verify email recipients",
  "Keep workspaces secure",
];
const DONTS = [
  "Share passwords",
  "Leave documents unattended",
  "Discuss info publicly",
  "Upload files to personal cloud",
];

const SECURITY = [
  { icon: KeyRound, title: "Password Protection", desc: "Strong, unique, rotated regularly" },
  { icon: Fingerprint, title: "Multi-Factor Auth", desc: "Verify with a second device" },
  { icon: Mail, title: "Secure Email", desc: "Verify recipients & encrypt" },
  { icon: Monitor, title: "Device Security", desc: "Lock, patch, and encrypt" },
  { icon: Wifi, title: "Safe Internet", desc: "Trusted networks & VPN only" },
  { icon: Archive, title: "Physical Docs", desc: "Locked storage & shredding" },
];

const CONSEQUENCES = [
  { icon: Gavel, title: "Legal Consequences", desc: "Fines, lawsuits, prosecution" },
  { icon: TrendingDown, title: "Financial Losses", desc: "Revenue & market impact" },
  { icon: AlertTriangle, title: "Reputation Damage", desc: "Long-term brand harm" },
  { icon: Heart, title: "Loss of Trust", desc: "Clients & partners depart" },
  { icon: Scale, title: "Disciplinary Action", desc: "Up to termination" },
];

const TAKEAWAYS = [
  "Keep information confidential",
  "Follow company policies",
  "Report suspicious activity",
  "Protect company assets",
  "Ask when unsure",
];

type Quiz = {
  q: string;
  options: string[];
  correct: number;
  explain?: string;
};

const QUIZ_1: Quiz = {
  q: "Why is confidentiality important?",
  options: [
    "Protect company reputation",
    "Protect sensitive business information",
    "Meet legal obligations",
    "All of the above",
  ],
  correct: 3,
  explain: "Confidentiality safeguards reputation, information, and legal standing — all at once.",
};

const QUIZ_2: Quiz = {
  q: "A colleague asks you to email a confidential geological report to their personal address 'just for the weekend'. What do you do?",
  options: [
    "Send it — they're on the team",
    "Decline and follow the approved sharing process",
    "Send it encrypted with a password",
    "Ask a friend for advice",
  ],
  correct: 1,
  explain: "Personal accounts fall outside company controls. Always use approved channels.",
};

const FINAL_QUIZ: Quiz[] = [
  {
    q: "Which is a confidential asset?",
    options: ["Public press release", "Geological survey data", "The company address", "Job posting"],
    correct: 1,
  },
  {
    q: "You spot a stranger reading documents at a colleague's desk. You should:",
    options: ["Ignore it", "Report immediately", "Take the documents home", "Post about it online"],
    correct: 1,
  },
  {
    q: "Best practice for account security is:",
    options: ["Reuse strong passwords", "Share your password with IT", "Enable multi-factor authentication", "Write passwords on a sticky note"],
    correct: 2,
  },
];

/* -------------------------------------------------------------------------- */
/*  Root App                                                                  */
/* -------------------------------------------------------------------------- */

type Stage = "login" | "training" | "complete";

function App() {
  const [stage, setStage] = useState<Stage>("login");
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [completion, setCompletion] = useState<{
    signature: string;
    fullName: string;
    employeeId: string;
    department: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[oklch(0.985_0.005_82)]">
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
            <Training
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
              onRestart={() => setStage("training")}
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

/* -------------------------------------------------------------------------- */
/*  Login                                                                     */
/* -------------------------------------------------------------------------- */

function Login({ onLogin }: { onLogin: (id: string) => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!id.trim() || pw.length < 4) {
      setErr("Please enter your ID and a password of at least 4 characters.");
      return;
    }
    setErr("");
    setLoading(true);
    setTimeout(() => onLogin(id.trim()), 700);
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Illustration side */}
      <div className="relative hidden overflow-hidden bg-charcoal lg:block">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.9 0.15 82) 0, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.8 0.15 82) 0, transparent 45%)",
        }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo className="[&_.text-charcoal]:text-white [&_.text-muted-foreground]:text-white/60" />

          <div className="max-w-md space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <Sparkles className="size-3.5 text-gold" />
              Enterprise Onboarding
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight">
              Protect what <span className="text-gold-gradient">powers</span> our mission.
            </h1>
            <p className="text-lg leading-relaxed text-white/70">
              A concise, interactive training on confidentiality — designed for the people
              who keep PK5 Mining moving.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { n: "10", l: "Slides" },
                { n: "5–7", l: "Minutes" },
                { n: "3", l: "Badges" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-extrabold text-gold">{s.n}</div>
                  <div className="text-xs text-white/60">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/50">
            <Lock className="size-3.5" />
            Secure connection · TLS encrypted · PK5 Mining © {new Date().getFullYear()}
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden"><Logo /></div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with your employee credentials to begin training.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <Field
              label="Employee ID or Email"
              icon={<UserCircle className="size-4" />}
              value={id}
              onChange={setId}
              placeholder="e.g. PK-4821 or you@pk5mining.com"
              autoComplete="username"
            />

            <Field
              label="Password"
              icon={<Lock className="size-4" />}
              value={pw}
              onChange={setPw}
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <Checkbox checked={remember} onChange={setRemember} />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="font-semibold text-charcoal hover:text-gold">
                Forgot password?
              </button>
            </div>

            {err && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                {err}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : (<>Sign in & start training <ArrowRight className="size-4" /></>)}
            </Button>

            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" />
              Secure login · Your session is encrypted end-to-end
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Field({
  label, icon, value, onChange, type = "text", placeholder, trailing, autoComplete,
}: {
  label: string; icon?: ReactNode; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; trailing?: ReactNode; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-charcoal">{label}</span>
      <div className="group flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-3.5 transition-all focus-within:border-gold focus-within:ring-4 focus-within:ring-gold/10">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-muted-foreground/70 outline-none"
        />
        {trailing}
      </div>
    </label>
  );
}

function Checkbox({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id?: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onChange(!checked)}
      className={`relative grid size-5 place-items-center rounded-md border transition-all outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
        checked ? "gold-gradient border-transparent" : "border-border bg-white hover:border-gold/50"
      }`}
    >
      <AnimatePresence>
        {checked && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <Check className="size-3.5 text-white" strokeWidth={3.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Training                                                                  */
/* -------------------------------------------------------------------------- */

type BadgeKey = "learner" | "practitioner" | "champion";
const BADGES: Record<BadgeKey, { label: string; icon: typeof Award }> = {
  learner: { label: "Learning Milestone", icon: Sparkles },
  practitioner: { label: "Practitioner", icon: ShieldCheck },
  champion: { label: "Confidentiality Champion", icon: Award },
};

function Training({
  user, onComplete, onExit,
}: {
  user: { id: string };
  onComplete: (d: { signature: string; fullName: string; employeeId: string; department: string }) => void;
  onExit: () => void;
}) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [badges, setBadges] = useState<Set<BadgeKey>>(new Set());
  const [ack, setAck] = useState(false);
  const [fullName, setFullName] = useState("");
  const [empId, setEmpId] = useState(user.id.includes("@") ? "" : user.id);
  const [dept, setDept] = useState("");
  const [sigData, setSigData] = useState<string>("");
  const [sigMode, setSigMode] = useState<"draw" | "type">("draw");
  const [typedSig, setTypedSig] = useState("");
  const sigRef = useRef<SignatureCanvas | null>(null);

  const total = 10;
  const progress = ((i + 1) / total) * 100;

  const awardBadge = (b: BadgeKey) => setBadges((s) => new Set(s).add(b));

  const canAdvance = useMemo(() => {
    if (i === 9) {
      const sig = sigMode === "draw" ? sigData : typedSig.trim();
      return ack && fullName.trim() && empId.trim() && dept.trim() && !!sig;
    }
    return true;
  }, [i, ack, fullName, empId, dept, sigData, typedSig, sigMode]);

  const go = (n: number) => {
    if (n < 0 || n > total - 1) return;
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  const finish = () => {
    const signature = sigMode === "draw" ? sigData : typedSig.trim();
    onComplete({ signature, fullName: fullName.trim(), employeeId: empId.trim(), department: dept.trim() });
  };

  // Keyboard navigation
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { if (i < total - 1) go(i + 1); else if (canAdvance) finish(); }
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, canAdvance]);

  const slides = [
    <SlideWelcome key="s1" onStart={() => go(1)} />,
    <SlideWhy key="s2" onQuizPass={() => awardBadge("learner")} badges={badges} />,
    <SlideWhat key="s3" />,
    <SlideResponsibilities key="s4" />,
    <SlideDosDonts key="s5" onQuizPass={() => awardBadge("practitioner")} badges={badges} />,
    <SlideScenarios key="s6" />,
    <SlideSecurity key="s7" />,
    <SlideConsequences key="s8" onQuizPass={() => awardBadge("champion")} badges={badges} />,
    <SlideTakeaways key="s9" badges={badges} />,
    <SlideAck
      key="s10"
      ack={ack} setAck={setAck}
      fullName={fullName} setFullName={setFullName}
      empId={empId} setEmpId={setEmpId}
      dept={dept} setDept={setDept}
      sigMode={sigMode} setSigMode={setSigMode}
      typedSig={typedSig} setTypedSig={setTypedSig}
      sigRef={sigRef} setSigData={setSigData} sigData={sigData}
    />,
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Logo />
          <div className="hidden items-center gap-3 md:flex">
            {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k) => {
              const B = BADGES[k];
              const earned = badges.has(k);
              return (
                <motion.div
                  key={k}
                  animate={{ scale: earned ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                  className={`grid size-9 place-items-center rounded-full border transition-all ${
                    earned
                      ? "gold-gradient border-transparent text-white shadow-gold"
                      : "border-dashed border-border bg-white text-muted-foreground/40"
                  }`}
                  title={B.label}
                >
                  <B.icon className="size-4" />
                </motion.div>
              );
            })}
          </div>
          <button
            onClick={onExit}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
          >
            <LogOut className="size-3.5" /> Exit
          </button>
        </div>
      </header>

      {/* Slide stage */}
      <div className="relative flex flex-1 items-stretch overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-10">
          <div className="relative min-h-[calc(100vh-220px)]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {slides[i]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="sticky bottom-0 z-30 border-t border-border/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3.5 sm:px-8">
          <Button variant="outline" size="sm" onClick={() => go(i - 1)} disabled={i === 0}>
            <ArrowLeft className="size-4" /> <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-charcoal">
                Slide {i + 1} <span className="text-muted-foreground">of {total}</span>
              </span>
              <span className="font-mono font-semibold text-gold">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full gold-gradient"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          {i < total - 1 ? (
            <Button size="sm" onClick={() => go(i + 1)}>
              <span className="hidden sm:inline">Next</span> <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={finish} disabled={!canAdvance}>
              <Check className="size-4" /> <span className="hidden sm:inline">Complete</span>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shared slide chrome                                                       */
/* -------------------------------------------------------------------------- */

function SlideHead({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-dark"
        >
          {kicker}
        </motion.div>
      )}
      <motion.h1
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-charcoal sm:text-4xl md:text-[44px]"
      >
        {title}
      </motion.h1>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

function stagger(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.15 + delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/* -------------------------------------------------------------------------- */
/*  Slides                                                                    */
/* -------------------------------------------------------------------------- */

function SlideWelcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <motion.div {...stagger(0)} className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" /> 5–7 minute training
        </motion.div>
        <motion.h1 {...stagger(0.05)} className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-charcoal sm:text-5xl md:text-6xl">
          Welcome to <span className="text-gold-gradient">PK5 Mining</span> Confidentiality Training
        </motion.h1>
        <motion.p {...stagger(0.15)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Protecting confidential information is everyone's responsibility. This short,
          interactive walkthrough covers what matters most.
        </motion.p>

        <motion.div {...stagger(0.25)} className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={onStart}>Start training <ArrowRight className="size-4" /></Button>
          <div className="text-xs text-muted-foreground">Use ← → keys to navigate</div>
        </motion.div>

        <motion.div {...stagger(0.35)} className="mt-10 grid max-w-md grid-cols-3 gap-3">
          {[
            { n: "10", l: "Slides" },
            { n: "3", l: "Quick checks" },
            { n: "3", l: "Badges" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-white p-4 shadow-soft">
              <div className="font-display text-2xl font-extrabold text-charcoal">{s.n}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-square w-full max-w-lg"
      >
        <div className="absolute inset-0 rounded-[36px] gold-gradient opacity-10 blur-3xl" />
        <div className="relative flex h-full items-center justify-center rounded-[32px] border border-border bg-white shadow-elevated">
          <ShieldIllustration />
        </div>
      </motion.div>
    </div>
  );
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-4/5 w-4/5">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.79 0.13 82)" />
          <stop offset="1" stopColor="oklch(0.62 0.14 72)" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="200" cy="200" r="150" fill="oklch(0.97 0.03 82)"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}
      />
      <motion.path
        d="M200 90 L290 130 V210 C290 265 250 300 200 315 C150 300 110 265 110 210 V130 Z"
        fill="url(#g1)"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
      />
      <motion.path
        d="M170 200 L192 222 L235 175" stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.6 }}
      />
    </svg>
  );
}

function SlideWhy({ onQuizPass, badges }: { onQuizPass: () => void; badges: Set<BadgeKey> }) {
  const points = [
    { icon: Building2, text: "Protect company assets" },
    { icon: Users, text: "Protect employees" },
    { icon: UserCircle, text: "Protect clients" },
    { icon: Heart, text: "Maintain trust" },
    { icon: Scale, text: "Meet legal obligations" },
  ];
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2">
      <div>
        <SlideHead kicker="Chapter 1" title="Why confidentiality matters" sub="Confidentiality safeguards every part of our business — and everyone in it." />
        <div className="space-y-3">
          {points.map((p, i) => (
            <motion.div key={p.text}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-gold-dark">
                <p.icon className="size-5" />
              </div>
              <span className="text-[15px] font-medium text-charcoal">{p.text}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
          className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/30 bg-primary-soft p-4"
        >
          <Sparkles className="mt-0.5 size-4 shrink-0 text-gold-dark" />
          <p className="text-sm font-medium text-charcoal">
            Every employee shares responsibility for protecting confidential information.
          </p>
        </motion.div>
      </div>

      <QuizCard quiz={QUIZ_1} onPass={onQuizPass} passed={badges.has("learner")} />
    </div>
  );
}

function SlideWhat() {
  return (
    <div>
      <SlideHead kicker="Chapter 2" title="What is confidential information?" sub="Anything that gives PK5 Mining its edge, or that must be kept private by law or agreement." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CONFIDENTIAL_ITEMS.map((it, idx) => (
          <motion.div key={it.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.04 }}
            className="group rounded-2xl border border-border bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-elevated"
          >
            <div className="mb-3 grid size-10 place-items-center rounded-xl bg-primary-soft text-gold-dark transition-all group-hover:gold-gradient group-hover:text-white">
              <it.icon className="size-5" />
            </div>
            <div className="font-display text-sm font-bold text-charcoal">{it.title}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{it.desc}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideResponsibilities() {
  return (
    <div>
      <SlideHead kicker="Chapter 3" title="Your responsibilities" sub="A short checklist of daily habits that protect our people and information." />
      <div className="grid gap-3 md:grid-cols-2">
        {RESPONSIBILITIES.map((r, i) => (
          <motion.div key={r.text}
            initial={{ opacity: 0, x: i % 2 ? 16 : -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className={`flex items-start gap-4 rounded-2xl border p-5 shadow-soft ${
              r.critical ? "border-gold/40 bg-primary-soft" : "border-border bg-white"
            }`}
          >
            <div className={`grid size-11 shrink-0 place-items-center rounded-xl ${
              r.critical ? "gold-gradient text-white shadow-gold" : "bg-muted text-charcoal"
            }`}>
              <r.icon className="size-5" />
            </div>
            <div>
              <div className="text-[15px] font-semibold leading-snug text-charcoal">{r.text}</div>
              {r.critical && (
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
                  <AlertTriangle className="size-3" /> Critical
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideDosDonts({ onQuizPass, badges }: { onQuizPass: () => void; badges: Set<BadgeKey> }) {
  return (
    <div>
      <SlideHead kicker="Chapter 4" title="Do's & Don'ts" sub="Small habits, big impact. Keep this list top of mind." />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-success/30 bg-[oklch(0.97_0.05_155)] p-5 shadow-soft">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[oklch(0.42_0.15_155)]">
            <div className="grid size-6 place-items-center rounded-full bg-success text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </div>
            Do
          </div>
          <ul className="space-y-2.5">
            {DOS.map((d, i) => (
              <motion.li key={d}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-start gap-2 text-sm text-charcoal"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} />
                {d}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-destructive/25 bg-[oklch(0.98_0.03_27)] p-5 shadow-soft">
          <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-destructive">
            <div className="grid size-6 place-items-center rounded-full bg-destructive text-white">
              <X className="size-3.5" strokeWidth={3} />
            </div>
            Don't
          </div>
          <ul className="space-y-2.5">
            {DONTS.map((d, i) => (
              <motion.li key={d}
                initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-start gap-2 text-sm text-charcoal"
              >
                <X className="mt-0.5 size-4 shrink-0 text-destructive" strokeWidth={3} />
                {d}
              </motion.li>
            ))}
          </ul>
        </div>

        <QuizCard quiz={QUIZ_2} onPass={onQuizPass} passed={badges.has("practitioner")} compact />
      </div>
    </div>
  );
}

function SlideScenarios() {
  const SCENARIOS = [
    {
      q: "A supplier requests geological reports before management approval.",
      options: [
        { text: "Share the report", correct: false },
        { text: "Decline & notify supervisor", correct: true },
      ],
      explain: "Route the request through your supervisor and the approved sharing process.",
    },
    {
      q: "You find a USB drive in the parking lot.",
      options: [
        { text: "Plug it in to identify the owner", correct: false },
        { text: "Hand it to IT unopened", correct: true },
      ],
      explain: "Unknown drives can carry malware. Let IT investigate safely.",
    },
    {
      q: "A journalist calls asking about a recent internal decision.",
      options: [
        { text: "Answer briefly to be helpful", correct: false },
        { text: "Refer them to Corporate Communications", correct: true },
      ],
      explain: "Only authorised spokespeople should respond to media queries.",
    },
  ];
  return (
    <div>
      <SlideHead kicker="Chapter 5" title="Real-life scenarios" sub="Tap each choice to see which action protects PK5 Mining." />
      <div className="grid gap-4 lg:grid-cols-3">
        {SCENARIOS.map((s, i) => <ScenarioCard key={i} {...s} delay={i * 0.1} />)}
      </div>
    </div>
  );
}

function ScenarioCard({
  q, options, explain, delay,
}: {
  q: string;
  options: { text: string; correct: boolean }[];
  explain: string;
  delay: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + delay }}
      className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-soft"
    >
      <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
        <FileText className="size-3" /> Scenario
      </div>
      <p className="mb-5 text-[15px] font-medium leading-snug text-charcoal">{q}</p>
      <div className="mt-auto space-y-2">
        {options.map((o, idx) => {
          const isPicked = picked === idx;
          const revealed = picked !== null;
          const good = revealed && o.correct;
          const bad = revealed && isPicked && !o.correct;
          return (
            <button
              key={o.text}
              onClick={() => picked === null && setPicked(idx)}
              disabled={picked !== null && !isPicked && !o.correct}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                good ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" :
                bad ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive" :
                "border-border bg-white text-charcoal hover:border-gold/50"
              }`}
            >
              {o.text}
              {good && <Check className="size-4 text-success" strokeWidth={3} />}
              {bad && <X className="size-4 text-destructive" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden text-xs leading-relaxed text-muted-foreground"
          >
            <div className="rounded-lg bg-muted p-3">{explain}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideSecurity() {
  return (
    <div>
      <SlideHead kicker="Chapter 6" title="Data security best practices" sub="Six habits that meaningfully reduce risk — every day." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECURITY.map((s, i) => (
          <motion.div key={s.title}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
            className="rounded-2xl border border-border bg-white p-5 shadow-soft"
          >
            <div className="mb-4 grid size-12 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
              <s.icon className="size-5" />
            </div>
            <div className="font-display text-base font-bold text-charcoal">{s.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideConsequences({ onQuizPass, badges }: { onQuizPass: () => void; badges: Set<BadgeKey> }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <SlideHead kicker="Chapter 7" title="Consequences of a breach" sub="A single lapse can ripple outward — legally, financially, and personally." />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CONSEQUENCES.map((c, i) => (
          <motion.div key={c.title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-white p-4 shadow-soft"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 gold-gradient" />
            <div className="mb-3 grid size-10 place-items-center rounded-xl bg-primary-soft text-gold-dark">
              <c.icon className="size-5" />
            </div>
            <div className="font-display text-sm font-bold text-charcoal">{c.title}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{c.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        {!open ? (
          <Button variant="outline" onClick={() => setOpen(true)}>
            <Award className="size-4" /> Take the final knowledge check
          </Button>
        ) : (
          <FinalQuiz onPass={onQuizPass} passed={badges.has("champion")} />
        )}
      </div>
    </div>
  );
}

function SlideTakeaways({ badges }: { badges: Set<BadgeKey> }) {
  return (
    <div className="grid h-full items-center gap-10 lg:grid-cols-2">
      <div>
        <SlideHead kicker="Wrap up" title="Key takeaways" sub="Five principles to carry with you — every shift, every screen, every conversation." />
        <ul className="space-y-3">
          {TAKEAWAYS.map((t, i) => (
            <motion.li key={t}
              initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-white p-4 shadow-soft"
            >
              <div className="grid size-7 shrink-0 place-items-center rounded-full gold-gradient text-white shadow-gold">
                <Check className="size-4" strokeWidth={3} />
              </div>
              <span className="text-[15px] font-medium text-charcoal">{t}</span>
            </motion.li>
          ))}
        </ul>
        <motion.p {...stagger(0.5)} className="mt-6 text-sm italic text-muted-foreground">
          "The trust we build today is the foundation we mine on tomorrow."
        </motion.p>
      </div>

      <div>
        <Card className="p-6">
          <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gold-dark">Your badges</div>
          <div className="mb-5 font-display text-xl font-extrabold text-charcoal">
            {badges.size} of 3 earned
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k, i) => {
              const B = BADGES[k];
              const earned = badges.has(k);
              return (
                <motion.div key={k}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className={`flex flex-col items-center rounded-2xl border p-4 text-center ${
                    earned ? "border-gold/40 bg-primary-soft" : "border-dashed border-border bg-white/50"
                  }`}
                >
                  <div className={`mb-2 grid size-14 place-items-center rounded-2xl ${
                    earned ? "gold-gradient text-white shadow-gold" : "bg-muted text-muted-foreground/50"
                  }`}>
                    <B.icon className="size-6" />
                  </div>
                  <div className={`text-xs font-bold ${earned ? "text-charcoal" : "text-muted-foreground/60"}`}>
                    {B.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function SlideAck(props: {
  ack: boolean; setAck: (b: boolean) => void;
  fullName: string; setFullName: (s: string) => void;
  empId: string; setEmpId: (s: string) => void;
  dept: string; setDept: (s: string) => void;
  sigMode: "draw" | "type"; setSigMode: (m: "draw" | "type") => void;
  typedSig: string; setTypedSig: (s: string) => void;
  sigRef: React.RefObject<SignatureCanvas | null>;
  setSigData: (s: string) => void;
  sigData: string;
}) {
  const {
    ack, setAck, fullName, setFullName, empId, setEmpId, dept, setDept,
    sigMode, setSigMode, typedSig, setTypedSig, sigRef, setSigData,
  } = props;
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const clearSig = () => { sigRef.current?.clear(); setSigData(""); };
  const captureSig = () => {
    const c = sigRef.current;
    if (!c || c.isEmpty()) { setSigData(""); return; }
    setSigData(c.toDataURL("image/png"));
  };

  return (
    <div className="mx-auto max-w-4xl">
      <SlideHead kicker="Final step" title="Acknowledgement & signature" sub="Confirm your understanding and sign to complete the training." />

      <Card className="overflow-hidden">
        <div className="border-b border-border bg-primary-soft/50 p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <div className="pt-0.5">
              <Checkbox checked={ack} onChange={setAck} />
            </div>
            <span className="text-sm font-medium leading-relaxed text-charcoal">
              I acknowledge that I have completed the PK5 Mining Confidentiality Training and understand my
              responsibility to protect confidential company information.
            </span>
          </label>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <Field label="Full Name" value={fullName} onChange={setFullName} placeholder="Jane Doe" />
          <Field label="Employee ID" value={empId} onChange={setEmpId} placeholder="PK-4821" />
          <Field label="Department" value={dept} onChange={setDept} placeholder="Operations" />
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-charcoal">Date</span>
            <div className="flex h-12 items-center gap-2 rounded-xl border border-border bg-muted px-3.5 text-sm text-charcoal">
              {today}
            </div>
          </div>
        </div>

        <div className="border-t border-border p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-charcoal">Signature</span>
            <div className="inline-flex rounded-lg bg-muted p-1">
              {(["draw", "type"] as const).map((m) => (
                <button key={m}
                  onClick={() => setSigMode(m)}
                  className={`rounded-md px-3 py-1 text-xs font-semibold capitalize transition-all ${
                    sigMode === m ? "bg-white text-charcoal shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {sigMode === "draw" ? (
            <div className="relative rounded-xl border border-dashed border-border bg-[oklch(0.99_0.005_82)]">
              <SignatureCanvas
                ref={sigRef}
                onEnd={captureSig}
                penColor="#1A1A1A"
                canvasProps={{ className: "h-40 w-full rounded-xl" }}
              />
              <button type="button" onClick={clearSig}
                className="absolute right-2 top-2 rounded-md bg-white px-2 py-1 text-xs font-medium text-muted-foreground shadow-sm hover:text-charcoal"
              >
                Clear
              </button>
              {!props.sigData && (
                <div className="pointer-events-none absolute inset-0 grid place-items-center text-xs text-muted-foreground/70">
                  Draw your signature here
                </div>
              )}
            </div>
          ) : (
            <input
              value={typedSig}
              onChange={(e) => setTypedSig(e.target.value)}
              placeholder="Type your full name"
              className="h-24 w-full rounded-xl border border-dashed border-border bg-[oklch(0.99_0.005_82)] px-4 text-center font-[cursive] text-3xl text-charcoal outline-none focus:border-gold"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            />
          )}
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        By signing, you agree that this record constitutes your legal acknowledgement.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quiz                                                                      */
/* -------------------------------------------------------------------------- */

function QuizCard({ quiz, onPass, passed, compact }: { quiz: Quiz; onPass: () => void; passed: boolean; compact?: boolean }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const submit = (idx: number) => {
    if (locked) return;
    setPicked(idx);
    setLocked(true);
    if (idx === quiz.correct && !passed) onPass();
  };

  const correct = picked === quiz.correct;

  return (
    <Card className={`flex flex-col p-6 ${compact ? "" : ""}`}>
      <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
        <Award className="size-3" /> Knowledge check
      </div>
      <div className="mb-4 font-display text-lg font-bold leading-snug text-charcoal">{quiz.q}</div>
      <div className="space-y-2">
        {quiz.options.map((o, i) => {
          const isPicked = picked === i;
          const good = locked && i === quiz.correct;
          const bad = locked && isPicked && i !== quiz.correct;
          return (
            <button key={o} onClick={() => submit(i)} disabled={locked}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                good ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" :
                bad ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive" :
                "border-border bg-white text-charcoal hover:border-gold/50 disabled:hover:border-border"
              }`}
            >
              <span className={`grid size-5 shrink-0 place-items-center rounded-full border text-[10px] font-bold ${
                good ? "border-success bg-success text-white" :
                bad ? "border-destructive bg-destructive text-white" :
                "border-border text-muted-foreground"
              }`}>{String.fromCharCode(65 + i)}</span>
              {o}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {locked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`mt-4 flex items-start gap-3 rounded-xl p-3 text-sm ${
              correct ? "bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" : "bg-muted text-charcoal"
            }`}
          >
            {correct ? <Sparkles className="mt-0.5 size-4 shrink-0" /> : <RotateCw className="mt-0.5 size-4 shrink-0" />}
            <div>
              <div className="font-semibold">{correct ? "Correct — badge earned!" : "Not quite."}</div>
              {quiz.explain && <div className="mt-0.5 text-xs opacity-80">{quiz.explain}</div>}
              {!correct && (
                <button
                  onClick={() => { setPicked(null); setLocked(false); }}
                  className="mt-1 text-xs font-semibold underline"
                >
                  Try again
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function FinalQuiz({ onPass, passed }: { onPass: () => void; passed: boolean }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = FINAL_QUIZ.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const pct = Math.round((score / FINAL_QUIZ.length) * 100);
  const complete = Object.keys(answers).length === FINAL_QUIZ.length;

  const submit = () => {
    setSubmitted(true);
    if (pct === 100 && !passed) onPass();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-6">
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-gold-dark">Final review</div>
        <div className="mb-5 font-display text-xl font-extrabold text-charcoal">3-question check</div>

        <div className="space-y-5">
          {FINAL_QUIZ.map((q, qi) => (
            <div key={qi}>
              <div className="mb-2 text-sm font-semibold text-charcoal">
                {qi + 1}. {q.q}
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((o, oi) => {
                  const picked = answers[qi] === oi;
                  const good = submitted && oi === q.correct;
                  const bad = submitted && picked && oi !== q.correct;
                  return (
                    <button
                      key={o}
                      onClick={() => !submitted && setAnswers({ ...answers, [qi]: oi })}
                      disabled={submitted}
                      className={`rounded-lg border px-3 py-2 text-left text-sm transition-all ${
                        good ? "border-success bg-[oklch(0.97_0.06_155)] text-[oklch(0.35_0.15_155)]" :
                        bad ? "border-destructive bg-[oklch(0.98_0.04_27)] text-destructive" :
                        picked ? "border-gold bg-primary-soft text-charcoal" :
                        "border-border bg-white text-charcoal hover:border-gold/50"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <div className="mt-6 flex items-center justify-end">
            <Button onClick={submit} disabled={!complete}>Submit answers</Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className={`mt-6 flex items-center justify-between gap-4 rounded-xl p-4 ${
              pct === 100 ? "bg-[oklch(0.97_0.06_155)]" : pct >= 70 ? "bg-primary-soft" : "bg-muted"
            }`}
          >
            <div>
              <div className="font-display text-2xl font-extrabold text-charcoal">
                {score} / {FINAL_QUIZ.length} · {pct}%
              </div>
              <div className="text-xs text-muted-foreground">
                {pct === 100 ? "Perfect — Confidentiality Champion badge unlocked!" :
                 pct >= 70 ? "Great work. You can continue." :
                 "Review the earlier chapters before continuing."}
              </div>
            </div>
            {pct < 100 && (
              <Button variant="outline" size="sm" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                <RotateCw className="size-4" /> Retry
              </Button>
            )}
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Completion                                                                */
/* -------------------------------------------------------------------------- */

function Completion({
  data, onRestart, onExit,
}: {
  data: { signature: string; fullName: string; employeeId: string; department: string };
  onRestart: () => void;
  onExit: () => void;
}) {
  const [confetti, setConfetti] = useState<{ x: number; y: number; c: string; r: number }[]>([]);
  useEffect(() => {
    const colors = ["#C89B3C", "#1A1A1A", "#E8C36B", "#F5E6C3"];
    setConfetti(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        c: colors[Math.floor(Math.random() * colors.length)],
        r: Math.random() * 360,
      }))
    );
  }, []);

  const downloadCert = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Certificate — ${data.fullName}</title>
      <style>
        body { font-family: 'Helvetica Neue', sans-serif; margin: 0; padding: 60px; color: #1A1A1A; }
        .cert { border: 12px double #C89B3C; padding: 60px; text-align: center; }
        h1 { font-size: 42px; margin: 0 0 8px; letter-spacing: -1px; }
        .k { color: #C89B3C; text-transform: uppercase; letter-spacing: 3px; font-size: 12px; }
        .name { font-size: 48px; margin: 30px 0 10px; }
        .meta { color: #666; font-size: 14px; }
        .sig { margin-top: 60px; }
        img { max-height: 80px; }
      </style></head><body><div class="cert">
        <div class="k">PK5 Mining</div>
        <h1>Certificate of Completion</h1>
        <p class="meta">This certifies that</p>
        <div class="name">${data.fullName}</div>
        <p class="meta">Employee ID ${data.employeeId} · ${data.department}</p>
        <p style="margin-top:30px; font-size:18px;">has successfully completed the<br><strong>Confidentiality Training Program</strong></p>
        <div class="sig">
          ${data.signature.startsWith("data:") ? `<img src="${data.signature}" />` : `<div style="font-family:'Brush Script MT',cursive;font-size:36px">${data.signature}</div>`}
          <div style="border-top:1px solid #1A1A1A; width:260px; margin:8px auto 0; padding-top:6px; font-size:12px;">Signature · ${new Date().toLocaleDateString()}</div>
        </div>
      </div></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PK5-Confidentiality-Certificate-${data.employeeId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <motion.div
            key={i}
            initial={{ x: `${c.x}vw`, y: `${c.y}vh`, rotate: c.r, opacity: 1 }}
            animate={{ y: "110vh", rotate: c.r + 360 }}
            transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeIn" }}
            className="absolute size-2 rounded-sm"
            style={{ backgroundColor: c.c }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-6 grid size-24 place-items-center rounded-full gold-gradient shadow-gold"
        >
          <CheckCircle2 className="size-12 text-white" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl"
        >
          Training completed <span className="text-gold-gradient">successfully</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Thank you, <span className="font-semibold text-charcoal">{data.fullName}</span>, for
          completing the PK5 Mining Confidentiality Training. Your acknowledgement and digital
          signature have been recorded.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-dark">Badges earned</div>
            <div className="flex items-center justify-center gap-6">
              {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k, i) => {
                const B = BADGES[k];
                return (
                  <motion.div key={k}
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.15, type: "spring", stiffness: 300, damping: 18 }}
                    className="flex flex-col items-center"
                  >
                    <div className="grid size-16 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
                      <B.icon className="size-7" />
                    </div>
                    <div className="mt-2 text-[11px] font-semibold text-charcoal">{B.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={downloadCert}>
            <Download className="size-4" /> Download certificate
          </Button>
          <Button size="lg" variant="outline" onClick={onRestart}>
            <RotateCw className="size-4" /> Restart training
          </Button>
          <Button size="lg" variant="ghost" onClick={onExit}>
            <LogOut className="size-4" /> Exit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
