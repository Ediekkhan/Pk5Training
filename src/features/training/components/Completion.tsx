import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Download,
  LogOut,
  RotateCw,
} from "lucide-react";
import { Button, Card } from "./primitives";
import { BADGES } from "../data";
import type { BadgeKey } from "../types";

export function Completion({
  data,
  onContinue,
  onRestart,
  onExit,
}: {
  data: { signature: string; fullName: string; employeeId: string; department: string };
  onContinue: () => void;
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
      })),
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confetti.map((c, i) => (
          <motion.div
            key={i}
            initial={{ x: `${c.x}vw`, y: `${c.y}vh`, rotate: c.r, opacity: 1 }}
            animate={{ y: "110vh", rotate: c.r + 360 }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: "easeIn",
            }}
            className="absolute size-2 rounded-sm"
            style={{ backgroundColor: c.c }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-6 grid size-24 place-items-center rounded-full gold-gradient shadow-gold"
        >
          <CheckCircle2 className="size-12 text-white" strokeWidth={2.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl font-extrabold tracking-tight text-charcoal sm:text-5xl"
        >
          Training completed <span className="text-gold-gradient">successfully</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Thank you, <span className="font-semibold text-charcoal">{data.fullName}</span>, for
          completing the PK5 Mining Confidentiality Training. Your acknowledgement and digital
          signature have been recorded.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-dark">
              <Award className="size-3" /> Completion badge earned
            </div>
            <div className="flex items-center justify-center gap-6">
              {(["learner", "practitioner", "champion"] as BadgeKey[]).map((k, i) => {
                const B = BADGES[k];
                return (
                  <motion.div
                    key={k}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8 + i * 0.15,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={downloadCert}>
            <Download className="size-4" /> Download certificate
          </Button>
          <Button size="lg" variant="outline" onClick={onContinue}>
            Continue <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="ghost" onClick={onRestart}>
            <RotateCw className="size-4" /> Restart
          </Button>
          <Button size="lg" variant="ghost" onClick={onExit}>
            <LogOut className="size-4" /> Exit
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
