import { motion } from "motion/react";
import { LogOut, Menu } from "lucide-react";
import logo from "@/assets/pk5logo.png";
import { BADGES } from "../data";
import type { BadgeKey } from "../types";
import { authService } from "@/services/sso/authService";

export function TrainingHeader({
  badges,
  onOpenRoadmap,
  onToggleSidebar,
  onExit,
}: {
  badges: Set<BadgeKey>;
  onOpenRoadmap: () => void;
  onToggleSidebar: () => void;
  onExit: () => void;
}) {
  const handleSSOLogout = async () => {
    await authService.logout();
  };

  const ssoAccount = authService.getAccount();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-black backdrop-blur-xl">
      <div className="mx-auto flex max-w-350 items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRoadmap}
            className="grid size-9 place-items-center rounded-lg border border-border bg-white text-charcoal lg:hidden"
            aria-label="Open roadmap"
          >
            <Menu className="size-4" />
          </button>
          <button
            onClick={onToggleSidebar}
            className="hidden size-9 place-items-center rounded-lg border border-border bg-white text-charcoal lg:grid"
            aria-label="Toggle roadmap"
          >
            <Menu className="size-4" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="relative grid size-14 place-items-center">
              <img src={logo} alt="PK5 Mining Logo" />
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {(["learner", "practitioner", "champion"] as BadgeKey[]).map((key) => {
            const badge = BADGES[key];
            const earned = badges.has(key);
            return (
              <motion.div
                key={key}
                animate={{ scale: earned ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.5 }}
                className={`grid size-9 place-items-center rounded-full border transition-all ${earned
                  ? "gold-gradient border-transparent text-white shadow-gold"
                  : "border-dashed border-border bg-white text-muted-foreground/40"
                  }`}
                title={badge.label}
              >
                <badge.icon className="size-4" />
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-white text-sm">Hi, {ssoAccount?.name || "Guest"}</div>
          <button
            // onClick={onLogout}
            onClick={handleSSOLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
          >
            <LogOut className="size-3.5" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
