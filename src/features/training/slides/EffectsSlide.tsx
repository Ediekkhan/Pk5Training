
import { Check, Eye, ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { SlideHead, Card } from "../components/primitives";
import { SectionLabel, BulletList } from "../components/slide-content";
import {
    EFFECT_TOPICS
} from "../data";
export function SlideEffectsModule({
    viewed, setViewed,
}: {
    viewed: Set<number>;
    setViewed: React.Dispatch<React.SetStateAction<Set<number>>>;
}) {
    const [view, setView] = useState<"overview" | number>("overview");

    const markViewed = (idx: number) => {
        setViewed((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
        });
    };

    if (view === "overview") {
        return (
            <div>
                <SlideHead
                    kicker="Chapter 3 · Interactive Module"
                    title="Effects of poor information confidentiality"
                    sub="All 12 cards are unlocked — open each one at least once to continue. Explore in any order."
                />

                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-white p-4 shadow-soft">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-gold-dark">Progress</div>
                        <div className="font-display text-lg font-extrabold text-charcoal">
                            {viewed.size} of {EFFECT_TOPICS.length} effects viewed
                        </div>
                    </div>
                    <div className="min-w-45 flex-1 sm:max-w-xs">
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <motion.div
                                className="h-full gold-gradient"
                                initial={false}
                                animate={{ width: `${(viewed.size / EFFECT_TOPICS.length) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {EFFECT_TOPICS.map((e, idx) => {
                        const done = viewed.has(idx);
                        return (
                            <motion.button
                                key={e.title}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 + idx * 0.03 }}
                                onClick={() => { markViewed(idx); setView(idx); }}
                                className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated ${done ? "border-gold/60 bg-primary-soft ring-1 ring-gold/40" : "border-border bg-white hover:border-gold/50"
                                    }`}
                            >
                                {done && (
                                    <div className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-success text-white shadow-sm">
                                        <Check className="size-3.5" strokeWidth={3} />
                                    </div>
                                )}
                                <div className="absolute inset-x-0 top-0 h-0.5 gold-gradient" />
                                <div className={`mb-3 grid size-10 place-items-center rounded-xl ${done ? "gold-gradient text-white shadow-gold" : "bg-primary-soft text-gold-dark group-hover:gold-gradient group-hover:text-white transition-all"
                                    }`}>
                                    <e.icon className="size-5" />
                                </div>
                                <div className="font-display text-sm font-bold text-charcoal">{e.title}</div>
                                <div className="mt-0.5 text-xs text-muted-foreground">{e.short}</div>
                                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                                    {e.readTime}
                                </div>
                                {done && (
                                    <div className="mt-2 ml-1 inline-flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                                        <Eye className="size-2.5" /> Viewed
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {viewed.size < EFFECT_TOPICS.length && (
                    <div className="mt-5 rounded-2xl border border-dashed border-gold/50 bg-primary-soft/40 p-4 text-sm text-charcoal">
                        <span className="font-semibold text-gold-dark">{EFFECT_TOPICS.length - viewed.size}</span> {EFFECT_TOPICS.length - viewed.size === 1 ? "effect" : "effects"} still to explore before you can continue.
                    </div>
                )}
            </div>
        );
    }

    const idx = view;
    const e = EFFECT_TOPICS[idx];
    const pct = (viewed.size / EFFECT_TOPICS.length) * 100;

    const goEffect = (n: number) => {
        if (n < 0 || n > EFFECT_TOPICS.length - 1) return;
        markViewed(n);
        setView(n);
    };

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <button
                    onClick={() => setView("overview")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-charcoal hover:bg-muted"
                >
                    <ArrowLeft className="size-3.5" /> Back to overview
                </button>
                <div className="text-xs font-semibold text-muted-foreground">
                    Effect <span className="text-charcoal">{idx + 1}</span> of {EFFECT_TOPICS.length}
                </div>
            </div>

            <div className="mb-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div className="h-full gold-gradient" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} />
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{viewed.size} of {EFFECT_TOPICS.length} viewed</div>
            </div>

            <Card className="overflow-hidden">
                <div className="flex flex-col gap-4 border-b border-border bg-primary-soft/50 p-6 sm:flex-row sm:items-center">
                    <div className="grid size-14 shrink-0 place-items-center rounded-2xl gold-gradient text-white shadow-gold">
                        <e.icon className="size-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">Effect · {e.readTime}</div>
                        <h2 className="font-display text-2xl font-extrabold tracking-tight text-charcoal sm:text-3xl">{e.title}</h2>
                        <div className="mt-1 text-xs text-muted-foreground">{e.short}</div>
                    </div>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <SectionLabel>Detailed explanation</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{e.explanation}</p>
                    </div>
                    <div>
                        <SectionLabel>Mining-specific example</SectionLabel>
                        <p className="text-sm leading-relaxed italic text-charcoal">{e.miningExample}</p>
                    </div>
                    <div>
                        <SectionLabel>Potential impact on PK5 Mining</SectionLabel>
                        <p className="text-sm leading-relaxed text-charcoal">{e.pk5Impact}</p>
                    </div>
                    <div className="md:col-span-2">
                        <SectionLabel>Prevention strategies</SectionLabel>
                        <BulletList items={e.prevention} tone="good" />
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex items-start gap-3 rounded-2xl border border-gold/40 bg-primary-soft p-4">
                            <div className="grid size-9 shrink-0 place-items-center rounded-xl gold-gradient text-white shadow-gold">
                                <Sparkles className="size-4" />
                            </div>
                            <div className="min-w-0">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-gold-dark">Did you know?</div>
                                <p className="mt-0.5 text-sm leading-relaxed text-charcoal">{e.didYouKnow}</p>
                            </div>
                        </div>
                    </div>
                </div>

               <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-5">
                         <Button variant="outline" size="sm" onClick={() => goEffect(idx - 1)} disabled={idx === 0}>
                           <ArrowLeft className="size-4" /> Previous
                         </Button>
                         <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold-dark">
                           <Eye className="size-3.5" /> Viewed
                         </div>
                         <Button
                           size="sm"
                           onClick={() => goEffect(idx + 1)}
                           disabled={idx === EFFECT_TOPICS.length - 1}
                         >
                           Next <ArrowRight className="size-4" />
                         </Button>
                       </div>
            </Card>
        </div>
    );
}
