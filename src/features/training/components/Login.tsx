import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Lock, ShieldCheck, Sparkles, UserCircle } from "lucide-react";
import { authService } from "@/services/sso/authService";
import { Button, Checkbox, Field, Logo } from "./primitives";

export function Login({ onLogin }: { onLogin: (id: string) => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!id.trim() || pw.length < 4) {
      setErr("Please enter your ID and a password of at least 4 characters.");
      return;
    }
    setErr("");
    setLoading(true);
    setTimeout(() => onLogin(id.trim()), 700);
  }

  const handleSSOSignin = async () => {
    await authService.login();
  };

  useEffect(() => {
    const initAuth = async () => {
      await authService.initialize();

      if (window.location.search || window.location.hash) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }

      const ssoAccount = authService.getAccount();
      if (ssoAccount) {
        onLogin(ssoAccount?.authorityType ?? "train");
      }
    };
    initAuth();
  }, []);

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-charcoal lg:block">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.9 0.15 82) 0, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.8 0.15 82) 0, transparent 45%)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
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
              <Sparkles className="size-3.5 text-gold" /> Enterprise Onboarding
            </div>
            <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight">
              Protect what <span className="text-gold-gradient">powers</span> our mission.
            </h1>
            <p className="text-lg leading-relaxed text-white/70">
              A concise, interactive training on confidentiality — designed for the people who keep
              PK5 Mining moving.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                { n: "15", l: "Stops" },
                { n: "7–10", l: "Minutes" },
                { n: "3", l: "Badges" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
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

      <div className="flex items-center justify-center px-6 py-16 sm:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <div className="mb-8">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal">
              Welcome back
            </h2>
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
              {loading ? (
                "Signing in…"
              ) : (
                <>
                  Sign in & start training <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            <div className="flex w-full items-center gap-4">
              <div className="h-px flex-1 bg-[#C89B3C]" />
              <p className="whitespace-nowrap px-3 font-['Inter',sans-serif] text-[14px] text-black sm:text-[16px]">
                OR
              </p>
              <div className="h-px flex-1 bg-[#C89B3C]" />
            </div>

            <Button type="button" onClick={handleSSOSignin} size="lg" className="w-full">
              Sign in with SSO <ArrowRight className="size-4" />
            </Button>

            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-success" /> Secure login · Your session is
              encrypted end-to-end
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
